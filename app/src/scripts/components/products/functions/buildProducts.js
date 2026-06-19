import { BASE_PATH } from "../../../config/basePath.js";
import { getCategories } from "../../../services/loadCategories.js";

export async function buildProducts(products) {
  // MELHORAR O FORMULÀRIO DE ADICIONAR PRODUTO E FAZER COM QUE OS PRODUTOS CARREGUEM MESMO SEM OS USUÁRIOS ESTAREM LOGADOS
  const categories = await getCategories();

  const categoriesById = Object.fromEntries(
    Object.values(categories).map((category) => [category.id, category]),
  );

  const productsContainer = document.querySelector("#products-container");

  if (products.length === 0) {
    document.getElementById('not-found').innerHTML = 'Nenhum produto encontrado'
    return
  }
  productsContainer.innerHTML = products
    .map((product) => {
      const category = categoriesById[product.categoryId];
      return `
        <a href="${BASE_PATH}/src/pages/product/page.html?id=${product.id}" class="product__card">
          <div class="product__image">
            <img
              src="${product.imagesUrl?.[0] || "../../medias/imgs/default-product.png"}"
              alt="${product.name}"
            />

            <button>
              <i class="bi bi-heart-fill"></i>
            </button>
          </div>

          <div class="product__content">
            <h3>${product.name}</h3>

            <span>${category?.name || "Sem categoria"}</span>

            <p>${product.description}</p>

            <div class="product__footer">
              <small>
                <i class="bi bi-geo-alt"></i>
                ${product.address.split(", ")[1]}, ${product.state}
              </small>

              <small>
                ${formatTimeAgo(product.createdAt)}
              </small>
            </div>
          </div>
        </a>
      `;
    })
    .join("");
}

function formatTimeAgo(dateString) {
  const createdAt = new Date(dateString);
  const now = new Date();

  const diffMs = now - createdAt;

  const minutes = Math.floor(diffMs / (1000 * 60));

  if (minutes < 1) {
    return "Agora mesmo";
  }

  if (minutes < 60) {
    return `${minutes}min atrás`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h atrás`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d atrás`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} mês${months > 1 ? "es" : ""} atrás`;
  }

  const years = Math.floor(months / 12);

  return `${years} ano${years > 1 ? "s" : ""} atrás`;
}
