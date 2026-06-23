import api from "../api/api.service.js";
import toast from "./toasts.js";

export async function getCategories() {
  const categories = JSON.parse(localStorage.getItem("categories"));
  if (!categories || categories.length <= 0) {
    try {
      const res = await api.get("/categories");
      const data = await res.data;
      localStorage.setItem("categories", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar categorias ");
    }
  } else {
    return categories;
  }
}
