import { verifyIsAuth } from "../scripts/services/auth";

const params = new URLSearchParams(window.location.search);
const code = params.get("tk");
localStorage.setItem("access_token", code);

const user = verifyIsAuth(code)
window.location.href = "../../index.html";

