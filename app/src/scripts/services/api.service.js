const api = axios.create({
  // Desenvolvimento
  baseURL: "http://localhost:3000/api/v1",
  // Produção
  // baseUrl: "https://url-back.com"
});


export default api