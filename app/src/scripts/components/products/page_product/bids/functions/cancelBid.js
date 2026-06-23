import api from "../../../../../api/api.service.js";
import toast from "../../../../../services/toasts.js";

export async function cancelBid(bidId) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = "https://auth-trocso.vercel.app";
    return;
  }
  try {
    const res = await api.delete(`/bid?id=${bidId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success(res.data.message || "Oferta cancelada com sucesso");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    if (status === 401) {
      if (message.toLowerCase() === "Token inválido".toLowerCase()) {
        window.location.href = "https://auth-trocso.vercel.app/";
        return;
      }
      toast.error(message)
    }
    if (status === 404) {
      return false;
    }
    console.error("Status:", status);
    return false;
  }
}
