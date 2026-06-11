import { steps } from "../data/steps.data.js";
import api from "../services/api.service.js";
import toast from "../services/toasts.js";
import { getDataAddress } from "./getDataAddress.js";

const appUrl = "https://trocso-platform.vercel.app";
const formContainer = document.getElementById("form__content");
let stepPosition = Number(localStorage.getItem("position_step")) || 0;
const token = localStorage.getItem("access_token");

// if (!token) window.location.href = "../../../index.html";

formContainer.innerHTML = steps[stepPosition];
const btnUsername = document.getElementById("btn_username");

btnUsername.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;

  if (!username) {
    toast.error("Informe seu nome de usuário");
    return;
  }
  stepPosition++;
  localStorage.setItem("username", username)
  formContainer.innerHTML = steps[stepPosition];

  const btnAddress = document.getElementById("finish_profile");
  const statesContainer = document.getElementById("states");
  const citysDatalist = document.getElementById("cities_datalist");
  const cityInput = document.getElementById("city");
  cityInput.disabled = true;
  const data = await getDataAddress();

  statesContainer.innerHTML = data.states.states
    .map(
      (state) =>
        `<option value="${state.name}">${state.name}, ${state.abbr}</option>`,
    )
    .join("");

  statesContainer.addEventListener("change", () => {
    cityInput.disabled = false
    citysDatalist.innerHTML = data.citys[statesContainer.value]
      .map((city) => `<option value="${city}"></option>`)
      .join("");
  });
  btnAddress.addEventListener("click", async () => {
    const city = cityInput.value
    const state = document.getElementById("states").value;

    if (!city || !state) {
      toast.error("Informe todos os campos");
      return;
    }

    const citys = data.citys[state];

    const isValidCity = citys.some((c) => c === city);

    if (!isValidCity) return toast.error("Informe uma cidade válida");

    btnAddress.disabled = true;
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
      btnAddress.disabled = false;
    }
  });
});
