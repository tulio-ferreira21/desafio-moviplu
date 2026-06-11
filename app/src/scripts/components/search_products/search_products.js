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
