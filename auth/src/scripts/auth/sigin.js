import api from "../services/api.service.js";
import { errorsOnAuthentication } from "../services/errors.auth.js";
import toast from "../services/toasts.js";
const email = document.getElementById("email");
const password = document.getElementById("password");

const authSubmit = document.getElementById("submit_auth");

async function handleSubmit(formData) {
  if (!formData.email) {
    errorsOnAuthentication("email", "Informe seu email para continuar");
    return;
  } else if (!formData.password) {
    errorsOnAuthentication("password", "Informe sua senha para continuar");
  }
  try {
    const { data } = await api.post("/auth/signin", formData);
    localStorage.setItem("access_token", data?.access_token);

    toast.success(data.message)

  } catch (error) {
    if (error.response?.data?.message) {
      return alert(error.response.data.message);
    }
    alert("Erro interno no servidor");
  }
}

authSubmit.addEventListener("click", (e) => {
  const formData = {
    email: email.value,
    password: password.value,
  };
  e.preventDefault();
  handleSubmit(formData);
});
