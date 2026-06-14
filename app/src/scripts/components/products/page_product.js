import { getCategories } from "../../services/loadCategories.js";
import getProductbyId from "./functions/findProductById.js";

const containerProducts = document.getElementById("product-body");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const product = await getProductbyId(id);

const buildPageProduct = async (product) => {
  const status = {
    ACTIVE: "Ativo",
    INATIVE: "Inativo",
    CANCELLED: "Cancelado",
    EXPIRED: "Expirado",
  };

  const categories = await getCategories();

  const categoriesById = Object.fromEntries(
    Object.values(categories).map((category) => [category.id, category])
  );

  const carouselItems = (product.imagesUrl || [])
    .map(
      (image, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img
            src="${image}"
            class="d-block w-100"
            alt="${product.name}"
          />
        </div>
      `
    )
    .join("");

  return `
    <section class="product__details">
      <div class="product__gallery">
        <div
          id="productCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            ${carouselItems}
          </div>

          ${
            product.imagesUrl?.length > 1
              ? `
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon"></span>
              </button>

              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            `
              : ""
          }
        </div>
      </div>

      <div class="product__info">
        <span class="product__category">
          ${categoriesById[product.categoryId].name}
        </span>

        <h1>${product.name}</h1>

        <p class="product__description__short">
          Produto ativo disponível para troca.
        </p>

        <div class="product__meta">
          <small>
            <i class="bi bi-geo-alt"></i>
            ${product.state}
          </small>

          <small>
            <i class="bi bi-calendar"></i>
            Publicado em
            ${new Date(product.createdAt).toLocaleDateString("pt-BR")}
          </small>
        </div>

        <div class="product__actions">
          <button class="button__trade">
            <i class="bi bi-arrow-left-right"></i>
            Propor troca
          </button>

          <button class="button__favorite">
            <i class="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="product__content">
      <div class="product__card">
        <h2>Descrição</h2>
        <p>${product.description}</p>
      </div>

      <div class="product__card">
        <h2>Localização</h2>
        <p>${product.address}</p>
      </div>

      <div class="product__card">
        <h2>Informações do anúncio</h2>

        <div class="info__grid">
          <div>
            <span>Status</span>
            <strong>${status[product.status]}</strong>
          </div>

          <div>
            <span>Duração</span>
            <strong>${product.duration}</strong>
          </div>

          <div>
            <span>Expira em</span>
            <strong>
              ${new Date(product.dateExpiration).toLocaleDateString("pt-BR")}
            </strong>
          </div>
        </div>
      </div>
    </section>
  `;
};

containerProducts.innerHTML = await buildPageProduct(product);