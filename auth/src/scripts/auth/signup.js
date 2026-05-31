import api from "../services/api.service.js";
import { errorsOnAuthentication } from "../services/errors.auth.js";
import toast from "../services/toasts.js";
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

const authSubmit = document.getElementById("submit_auth");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleSubmit(formData) {
  const emailIsValid = regexEmail.test(formData.email);
  if (!formData.name) {
    return errorsOnAuthentication("name", "Informe seu nome para continuar");
  }
  if (!formData.email) {
    return errorsOnAuthentication("email", "Informe seu email para continuar");
  } else if (!emailIsValid) {
    return errorsOnAuthentication(
      "email",
      "Informe um endereço de emaill válido",
    );
  } else if (!formData.password) {
    return errorsOnAuthentication(
      "password",
      "Informe sua senha para continuar",
    );
  } else if (formData.password.length < 8)
    return errorsOnAuthentication(
      "password",
      "A senha deve ter pelo menos 8 caracteres",
    );

  try {
    const { data } = await api.post("auth/signup", formData);
    localStorage.setItem("access_token", data?.access_token)
    window.location.href = `./src/pages/complete_profile/page.html`;

  } catch (error) {
    if (error.response?.data?.message) {
      return toast.error(error.response?.data?.message);
    }
    toast.error(error.response?.data?.message);
  }
}

authSubmit.addEventListener("click", (e) => {
  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  e.preventDefault();
  await handleSubmit(formData);
});
