import getLocation from "../../../services/getLocation.js";

const spanState = document.getElementById("state");

// O caminho precisa ser em relação com o index.html, não esqueça
// Como não é um aplicação em VITE, CRA e etc, é preciso fazer um fetch para o JSON ao invé de apenas fazer um import
const response = await fetch("./src/scripts/data/states.json");

const states = await response.json();

const location = await getLocation();

const state = location?.state;
if (state) {
  spanState.textContent = states[state];
}
