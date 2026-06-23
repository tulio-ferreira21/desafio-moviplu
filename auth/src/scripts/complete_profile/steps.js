import { steps } from "../data/steps.data.js";
import api from "../services/api.service.js";
import toast from "../services/toasts.js";
import { getCategories } from "./getCategories.js";
import { getDataAddress } from "./getDataAddress.js";

const appUrl = "https://trocso-platform.vercel.app";
const formContainer = document.getElementById("form__content");
// const usernameLocale = localStorage.getItem("username")
// const cityLocale = localStorage.getItem ("city")
// const stateLocale = localStorage.getItem("state")
const position_step = Number(localStorage.getItem("position_step"));
let stepPosition = position_step > 3 || position_step < 0 ? 0 : position_step;

const token = localStorage.getItem("access_token");

// if (!token) window.location.href = "../../../index.html";

renderStep(stepPosition);

function renderStep(step) {
  formContainer.innerHTML = steps[step];

  switch (step) {
    case 0:
      loadUsernameStep();
      break;

    case 1:
      loadAddressStep();
      break;

    case 2:
      loadCategoriesStep();
      break;
  }
}

function nextStep() {
  stepPosition++;

  localStorage.setItem("position_step", stepPosition);

  renderStep(stepPosition);
}

function loadUsernameStep() {
  const btnUsername = document.getElementById("btn_username");

  btnUsername.addEventListener("click", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;

    if (!username) {
      toast.error("Informe seu nome de usuário");
      return;
    }

    localStorage.setItem("username", username);

    nextStep();
  });
}

async function loadAddressStep() {
  const btnAddress = document.getElementById("btn_address");

  const statesContainer = document.getElementById("states");
  const citysDatalist = document.getElementById("cities_datalist");
  const cityInput = document.getElementById("city");

  cityInput.disabled = true;

  const data = await getDataAddress();

  statesContainer.innerHTML = data.states.states
    .map(
      (state) =>
        `<option value="${state.name}">
          ${state.name}, ${state.abbr}
        </option>`,
    )
    .join("");

  statesContainer.addEventListener("change", () => {
    cityInput.disabled = false;

    citysDatalist.innerHTML = data.citys[statesContainer.value]
      .map((city) => `<option value="${city}"></option>`)
      .join("");
  });

  btnAddress.addEventListener("click", () => {
    const city = cityInput.value;
    const state = statesContainer.value;

    if (!city || !state) {
      toast.error("Informe todos os campos");
      return;
    }

    const citys = data.citys[state] || [];

    const isValidCity = citys.some((c) => c === city);

    if (!isValidCity) {
      toast.error("Informe uma cidade válida");
      return;
    }

    localStorage.setItem("city", city);
    localStorage.setItem("state", state);

    nextStep();
  });
}

async function loadCategoriesStep() {
  const finishProfile = document.getElementById("finish_profile");

  const containerCategories = document.getElementById("container-categories");

  const categories = await getCategories();

  containerCategories.innerHTML = categories
    .map(
      (category) => `
        <label class="category__chip">
          <input type="checkbox" value="${category.id}">
          <span>${category.name}</span>
        </label>
      `,
    )
    .join("");

  finishProfile.addEventListener("click", async () => {
    try {
      const username = localStorage.getItem("username");
      const city = localStorage.getItem("city");
      const state = localStorage.getItem("state");

      const selectedCategories = [
        ...containerCategories.querySelectorAll(
          'input[type="checkbox"]:checked',
        ),
      ].map((input) => input.value);

      await api.patch(
        "/user/complete-profile",
        {
          username: username.toLowerCase(),
          city,
          state,
          favoriteCategories: selectedCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("position_step");
      window.location.href = `${appUrl}/src/auth/auth.html?tk=${encodeURIComponent(token)}`;
    } catch (error) {
      if (error.response?.data?.message) {
        if (error.response.data.message === "Token inválido") {
          window.location.href = "../../../index.html";
        }

        toast.error(error.response.data.message);
      } else {
        toast.error("Erro no servidor");
      }
    }
  });
}
