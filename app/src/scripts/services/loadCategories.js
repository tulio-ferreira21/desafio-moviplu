import api from "../api/api.service.js"
import toast from "./toasts.js"

export async function getCategories() {
    try {
        const res = await api.get("/categories")
        const data = await res.data
        return data
    } catch (error) {
        console.log(error)
        toast.error("Erro ao carregar categorias ")
    }
}