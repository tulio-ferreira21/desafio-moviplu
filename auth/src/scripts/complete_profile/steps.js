import { steps } from "../data/steps.data.js";
import api from "../services/api.service.js";
import toast from "../services/toasts.js";

const appUrl = "https://trocso-platform.vercel.app"
const formContainer = document.getElementById("form__content");
let stepPosition = Number(localStorage.getItem("position_step")) || 0;
const token = localStorage.getItem("access_token");

if (!token) window.location.href = "../../../index.html";
formContainer.innerHTML = steps[stepPosition];
const btnUsername = document.getElementById("btn_username");

btnUsername.addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;

  if (!username) {
    toast.error("Informe seu nome de usuário");
    return;
  }
  localStorage.setItem("username", username);
  stepPosition++;
  formContainer.innerHTML = steps[stepPosition];

  const btnAddress = document.getElementById("finish_profile");

  btnAddress.addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    if (!city || !state) {
      toast.error("Informe todos os campos");
      return;
    }

    try {
      const response = await api.patch(
        "/user/me",
        { username, city, state },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      //   window.location.href = "../../../../app/index.html";
      window.location.href = `${appUrl}/src/auth/auth.html?tk=${encodeURIComponent(data?.access_token)}`;
    } catch (error) {
      if (error.response?.data?.message) {
        if (error.response?.data?.message === "Token inválido") {
          window.location.href = "../../../index.html";
        }
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Erro no servidor");
      }
    }
  });
});
