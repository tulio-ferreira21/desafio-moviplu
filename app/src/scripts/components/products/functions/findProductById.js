import { BASE_PATH } from "../../../config/basePath.js";
import api from "../../../api/api.service.js";
export default async function getProductbyId(id) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data.products;
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Produto não encontrado") {
        window.location.href = `${BASE_PATH}/index.html`;
        return;
      }
    }
  }
}