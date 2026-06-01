const api = axios.create({
  // Desenvolvimento
  // baseURL: "http://localhost:3000/api/v1",
  // Produção
  baseURL: "https://backend-trocso.onrender.com/api/v1"
});


export default api