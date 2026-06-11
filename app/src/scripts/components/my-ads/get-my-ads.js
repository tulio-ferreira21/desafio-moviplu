import { buildBodyProduct } from "./functions/bodyProducts.js";
import getMyAds from "./functions/getMyAds.js";

console.log("Testando")
const products = await getMyAds()
const bodyProducts = await buildBodyProduct(products.products)

const productsGrid = document.getElementById("products-grid")

productsGrid.innerHTML = bodyProducts
console.log(products)