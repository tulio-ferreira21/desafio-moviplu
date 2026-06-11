import api from "../../../api/api.service.js";
import toast from "../../../services/toasts.js";
import { getCategories } from "../../../services/loadCategories.js";

export async function buildBodyProduct(products) {
  const categories = await getCategories();
  const categoriesById = Object.fromEntries(
    Object.values(categories).map((c) => [c.id, c]),
  );
  // Lembrar => Object.values transforma em array
  //Lembrar => Object.FromEntries faz o contrário
  console.log("Produtos: ", products);
  return products
    .map(
      (product) => `
        <div class="product__card">
          <div class="product__image">
            <img
              src="${product.imagesUrl?.[0] || "/assets/no-image.png"}"
              alt="${product.name}"
            />

            <button>
              <i class="bi bi-three-dots"></i>
            </button>
          </div>

          <div class="product__content">
            <div class="product__status ${product.status.toLowerCase()}">
              ${product.status}
            </div>

            <h3>${product.name}</h3>

            <span>${categoriesById[product.categoryId].name ?? "Sem categoria"}</span>

            <p>${product.description}</p>

            <div class="product__footer">
              <small>
                <i class="bi bi-geo-alt"></i>
                ${product.address}, ${product.state}
              </small>

              <small>
                Expira em
                ${new Date(product.dateExpiration).toLocaleDateString("pt-BR")}
              </small>
            </div>

            <div class="product__actions">
              <button class="btn__edit" data-id="${product.id}">
                <i class="bi bi-pencil"></i>
                Editar
              </button>

              <button class="btn__pause" data-id="${product.id}">
                <i class="bi bi-pause"></i>
                ${product.status === "ACTIVE" ? "Pausar" : "Ativar"}
              </button>
            </div>
          </div>
        </div>
      `,
    )
    .join("");
}
