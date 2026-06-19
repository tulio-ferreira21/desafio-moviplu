import api from "../../../api/api.service.js";
import toast from "../../../services/toasts.js";

export async function getBidByProductId(id) {
    const token = localStorage.getItem("access_token")
  try {
    const res = await api.get(`/bid/product/${id}`, {headers: {
        Authorization: `Bearer ${token}`
    }});
    return res.data;
  } catch (error) {
    if (error.response?.data?.message) {
      return toast.error("Erro ao carregar ofertas");
    }
    console.log(error)
    return toast.error("Erro interno no servidor");
  }
}
