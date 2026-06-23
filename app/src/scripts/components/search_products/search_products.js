import { buildContainerProducts } from "./functions/buildContainerProducts.js";
import { findProductsByQuery } from "./functions/findProductsByQuery.js";

const params = new URLSearchParams(window.location.search);
const searchInput = document.getElementById("search_products");

searchInput.value = params.get("search_query");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (searchInput.value) {
      params.set("search_query", searchInput.value);
      window.location.href = `${window.location.pathname}?${params.toString()}`;
    }
  }
});

const results = await findProductsByQuery(params.get("search_query"));
const containerResults = document.getElementById("results__search");
const countResults = document.getElementById('count_results')
countResults.textContent = results.length


const content = await buildContainerProducts(results)
containerResults.innerHTML = content