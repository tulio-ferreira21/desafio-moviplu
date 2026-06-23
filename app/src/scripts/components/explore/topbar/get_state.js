import getLocation from "../../../services/getLocation.js";

const spanState = document.getElementById("state");

const response = await fetch("./src/scripts/data/states.json");
const states = await response.json();

const locationPromise = getLocation();

locationPromise.then((location) => {
  const state = location?.state;

  if (state) {
    spanState.textContent = states[state];
  }
});
export const currentStateUser = locationPromise
  .then((location) => location?.state)
  .catch(() => null);
