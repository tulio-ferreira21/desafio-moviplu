import api from "../../../../../api/api.service.js";
import { $EnumBid } from "../../../../../data/bids.enum.js";
import toast from "../../../../../services/toasts.js";

export async function createBid(params, productId, container) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    toast.error("Entre na plataforma para continuar");
    return;
  }
  console.log(token);
  console.log(params);
  if (!params.type) {
    toast.error("Informe todos os campos");
    return;
  }
  if (
    params.type === "Pago para retirar o item" ||
    params.type === "Cobro para retirar o item"
  ) {
    if (!params.amount) {
      toast.error("Informe o valor da oferta");
      return;
    }
  }

  const bid = {
    type: params.type,
    amount: params.amount || null,
    message: params.message || null,
    productId,
  };
  try {
    const res = await api.post(
      "/bid",
      {
        type: $EnumBid[params.type],
        amount: params.amount || null,
        message: params.message || null,
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success("Oferta enviada com sucesso");
    container.remove();
    document.body.style.overflow = "auto";
    return res.data;
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Token inválido") {
        // return (window.location.href = "https://auth-trocso.vercel.app");
      }
      return toast.error(error.response?.data?.message);
    }
    toast.error("Erro interno no servidor");
  }
}
