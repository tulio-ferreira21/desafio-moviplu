import toast from "../../../services/toasts.js";
import api from "../../../api/api.service.js";
export default async function getMyAds() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    toast.error("Sessão expirada");
    window.location.href = "/app/index.html";
  }

  try {
    const res = await api.get("/products/my-ads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Token inválido") {
        window.location.href = "/app/index.html";
        return;
      } else {
        toast.error(error.response?.data?.message);
      }
      return;
    } else {
      toast.error("Erro interno no servidor");
    }
  }
}
