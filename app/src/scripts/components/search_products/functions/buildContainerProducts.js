import { BASE_PATH } from "../../../config/basePath.js";
import { formatTimeAgo } from "../../../services/formatTimeAgo.js";
import { getCategories } from "../../../services/loadCategories.js";

export async function buildContainerProducts(products) {
  const categories = await getCategories();
  console.log(categories);
  const categoriesById = Object.fromEntries(
    Object.values(categories).map((category) => [category.id, category]),
  );
  console.log(categoriesById);
  if (products.length === 0) return;
  return products
    .map((product) => {
      return `
            <article onclick="${window.location.href = `${BASE_PATH}/src/pages/product/page.html?id=${product.id}`}" class="result__card">
                <div class="result__image">
                    <img
                        src="${product.imagesUrl?.[0]}"
                        alt="${product.name}"
                    />

                    <button class="result__favorite">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>

                <div class="result__content">
                    <span class="result__category">${categoriesById[product.categoryId].name}</span>

                    <h3>${product.name}</h3>

                    <p>
                    ${product.description}
                    </p>

                    <div class="result__location">
                    <i class="bi bi-geo-alt"></i>
                    ${product.address} - ${product.state}
                    </div>

                    <div class="result__footer">
                    <small>${formatTimeAgo(product.createdAt)}</small>
                    <a href="#" class="result__button">
                        Ver anúncio
                    </a>
                    </div>
                </div>
            </article>
        `;
    })
    .join("");
}
