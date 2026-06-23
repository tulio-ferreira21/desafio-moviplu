import { currentStateUser } from "../explore/topbar/get_state.js";
import api from "../../api/api.service.js";
import { buildProducts } from "./functions/buildProducts.js";
async function getProducts(state, categoryId) {
  try {
    const res = await api.get(
      `/products?state=${state}&category=${categoryId}`,
    );
    // console.log("Products: ", await res.json());
    return await res.data.products;
  } catch (error) {
    console.log(error);
  }
}
const products = await getProducts(null);
buildProducts(products);
currentStateUser.then(async (location) => {
  if (!location) return;
  const localProducts = await getProducts(location);
  buildProducts(localProducts);
});

const categories = document.querySelectorAll(".category");

categories.forEach((element) => {
  element.addEventListener("click", async () => {
    categories.forEach((item) => {
      item.classList.remove("active");
    });

    element.classList.add("active");

    const categoryId = element.dataset.id;
    const location = await currentStateUser;
    console.log(categoryId);

    if (!categoryId) {
      if (location) {
        const localProducts = await getProducts(location);
        buildProducts(localProducts);
      } else {
        buildProducts(products);
      }

      return;
    }
    const filteredProducts = await getProducts(location, categoryId);
    console.log(filteredProducts)
    buildProducts(filteredProducts);
  });
});
