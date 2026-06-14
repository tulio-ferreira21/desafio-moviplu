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
      }
    }
  }
}

export async function userIsAuthenticated() {
  const token = localStorage.getItem("access_token");

  try {
    const res = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res) return;
    else {
      window.location.href = "/app/index.html";
    }
  } catch (error) {
    if (error.response?.data?.message) {
      if (error.response?.data?.message === "Token inválido") {
        localStorage.clear();
        window.location.href = "/app/index.html";
        toast.error(error.response?.data?.message);
        return;
      }
      toast.error(error.response?.data?.message);
    }

    toast.error("Erro interno no servidor");
  }
}
