import api from "../../../api/api.service.js";

export async function findProductsByQuery(query) {
  try {
    const res = await api.get(`/products/search?q=${query}`);
    return res.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    if (status === 401) {
      if (message.toLowerCase() === "Token inválido".toLowerCase()) {
        window.location.href = "https://auth-trocso.vercel.app/";
        return;
      }
    }
    if (status === 404) {
      return false;
    }
    console.error("Status:", status);
    return false;
  }
}
