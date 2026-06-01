import toast from "./toasts.js";
import api from "../api/api.service.js";
export async function verifyIsAuth() {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { data } = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.user;
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Token inválido") {
        localStorage.clear();
        // window.location.href = ""
        toast.error(error.response?.data?.message);
      }
      toast.error(error.response?.data?.message);
    }
  }
}
