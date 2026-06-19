import api from "../../../api/api.service.js";
import toast from "../../../services/toasts.js";
export async function addProduct(data, files) {
  const verifyIfSomeNull = Object.values(data).some(
    (field) => field === null || field === undefined,
  );
  if (verifyIfSomeNull) toast.error("Informe todos os campos");
  if (files.length === 0) return toast.error("Selecione pelo menos uma imagem");
  try {
    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("longitude", data.longitude);
    formData.append("latitude", data.latitude);
    formData.append("duration", data.duration);
    formData.append("categoryId", data.categoryId);
    console.log(files.length)
    for (const image of files) {
      formData.append("images", image);
      console.log(image)
    }

    console.log(formData)
    const res = await api.post("/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    return res.data.message
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Token inválido") {
        alert("Sessão expirada");
        window.location.href = "../.././index.html";
      }
      toast.error(error.response?.data?.message);
      return;
    }
    toast.error("Erro no servidor");
  }
}
