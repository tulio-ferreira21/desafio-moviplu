import { currentStateUser } from "../explore/topbar/get_state.js";
import api from "../../api/api.service.js";
import { buildProducts } from "./functions/buildProducts.js";
async function getProducts(state) {
  try {
    const res = await api.get(`/products?state=${state}`);
    // console.log("Products: ", await res.json());
    console.log(res.data)
    return await res.data.products;
  } catch (error) {
    console.log(error);
  }
}

const products = await getProducts(currentStateUser);

buildProducts(products)