import api from "../../../../../api/api.service.js";
import toast from "../../../../../services/toasts.js";

export async function verifyIfAlreadyBid(idProduct) {
  const token = localStorage.getItem("access_token");
  if(!token) return
  try {
    const res = await api.get(`/bid/user/${idProduct}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    const status = error.response?.status;

    if (status === 401) {
      window.location.href = "https://auth-trocso.vercel.app/";
      return;
    } 
    if (status === 404) {
      return false;
    }

    console.error("Status:", status);
    return false;
  }
}
