import { buildBodyProduct } from "./functions/bodyProducts.js";
import getMyAds from "./functions/getMyAds.js";

async function buildGridProducts() {
  const products = await getMyAds();
  if (Object.values(products.products).length === 0) return;
  const bodyProducts = await buildBodyProduct(products.products);
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = bodyProducts;
}

buildGridProducts()