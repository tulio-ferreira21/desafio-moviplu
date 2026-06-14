import { BASE_PATH } from "../../../config/basePath.js";

const inputSearchProducts = document.getElementById("search_products");

inputSearchProducts.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (inputSearchProducts.value) {
      window.location.href = `${BASE_PATH}/src/pages/search_products/page.html?search_query=${encodeURIComponent(inputSearchProducts.value)}`;
    } else {
      return;
    }
  }
});
