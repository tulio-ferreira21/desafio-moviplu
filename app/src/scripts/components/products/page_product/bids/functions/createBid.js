import api from "../../../../../api/api.service.js";
import toast from "../../../../../services/toasts.js";

export async function createBid(params, productId) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    toast.error("Entre na plataforma para continuar");
    return;
  }
  const isValidData = Object.values(params).some((field) => !field);
  if (isValidData) return toast.error("Informe todos os campos");

  const bid = {
    type: params.type,
    amount: params.amount || null,
    message: params.message || null,
    productId,
  };
  try {
    const res = await api.post("/bid", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Token inválido") {
        return (window.location.href = "https://auth-trocso.vercel.app");
      }
      return toast.error(error.response?.data?.message);
    }
    toast.error("Erro interno no servidor");
  }
}
