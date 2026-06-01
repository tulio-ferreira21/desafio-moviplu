import api from "../services/api.service.js";
import { errorsOnAuthentication } from "../services/errors.auth.js";
import toast from "../services/toasts.js";
const email = document.getElementById("email");
const password = document.getElementById("password");

const authSubmit = document.getElementById("submit_auth");
const appUrl = "https://trocso-platform.vercel.app"
async function handleSubmit(formData) {
  if (!formData.email) {
    errorsOnAuthentication("email", "Informe seu email para continuar");
    return;
  } else if (!formData.password) {
    errorsOnAuthentication("password", "Informe sua senha para continuar");
  }
  try {
    const { data } = await api.post("/auth/signin", formData);
    toast.success(data.message);
    // window.location.href = `../app/src/auth/auth.html?tk=${encodeURIComponent(data?.access_token)}`;
    window.location.href = `${appUrl}/src/auth/auth.html?tk=${encodeURIComponent(data?.access_token)}`
  } catch (error) {
    if (error.response?.data?.message) {
      return toast.error(error.response.data.message);
    }
    toast.error("Erro interno no servidor");
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
