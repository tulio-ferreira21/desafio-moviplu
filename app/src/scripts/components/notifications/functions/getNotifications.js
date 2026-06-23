import api from "../../../api/api.service.js";
import toast from "../../../services/toasts.js";

export async function getNotifications() {
  const token = localStorage.getItem("access_token");
  if (!token) return (window.location.href = "https://auth-trocso.vercel.app");

  try {
    const res = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response?.data?.message) {
      return toast.error("Erro ao carregar notificações");
    }
    console.log(error);
    return toast.error("Erro interno no servidor");
  }
}
