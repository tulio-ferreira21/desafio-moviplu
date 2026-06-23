import { BASE_PATH } from "../../../config/basePath.js";
import { $ConvertStatusProduct } from "../../../data/bids.enum.js";
import { formatTimeAgo } from "../../../services/formatTimeAgo.js";
import { getCategories } from "../../../services/loadCategories.js";

export async function buildProducts(products) {
  const productsContainer = document.querySelector("#products-container");

  if (!products || products.length === 0) {
    productsContainer.innerHTML =
      "<p class='text-muted'>Nenhum produto encontrado</p>";
    return;
  }
  const categories = await getCategories();

  const categoriesById = Object.fromEntries(
    Object.values(categories).map((category) => [category.id, category]),
  );
  productsContainer.innerHTML =
    !products || products.length === 0
      ? "<p class='text-muted'></p>"
      : products
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
          <div class="product__status ${product.status.toLowerCase()}">
              ${$ConvertStatusProduct[product.status]}
            </div>
          
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
