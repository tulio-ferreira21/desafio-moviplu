import { getCategories } from "../../../services/loadCategories.js";
import getProductbyId from "../functions/findProductById.js";
import { createBid } from "./bids/functions/createBid.js";
import { formBid } from "./bids/functions/formBid.js";
const containerProducts = document.getElementById("product-body");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const titlePage = document.getElementById("title-page");
const product = await getProductbyId(id);

titlePage.textContent = `${product.name} | Trocso`;

const buildPageProduct = async (product) => {
  const status = {
    ACTIVE: "Ativo",
    INATIVE: "Inativo",
    CANCELLED: "Cancelado",
    EXPIRED: "Expirado",
  };

  const categories = await getCategories();

  const categoriesById = Object.fromEntries(
    Object.values(categories).map((category) => [category.id, category]),
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
      `,
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
          <button class="button__trade" id="open-modal-bid">
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

const btnOpenModal = document.getElementById("open-modal-bid");
btnOpenModal.addEventListener("click", async () => {
  formBid();

  const type = document.getElementById("bid-type");
  const message = document.getElementById("message-bid");
  const amountContainer = document.getElementById("amount-container");
  const amount = document.getElementById("amount-bid");

  const overlay = document.querySelector(".overlay__bid");
  const bidForm = document.querySelector(".form__bid");
  const cancelBid = document.querySelector("#cancel");

  cancelBid.addEventListener("click", () => {
    overlay.remove();
    document.body.style.overflow = "auto";
  });
  overlay.addEventListener("click", () => {
    overlay.remove();
    document.body.style.overflow = "auto";
  });
  bidForm.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  amountContainer.style.display = "none";

  type.addEventListener("change", () => {
    if (
      type.value === "Pago para retirar o item" ||
      type.value === "Cobro para retirar o item"
    ) {
      amountContainer.style.display = "flex";
    } else {
      amountContainer.style.display = "none";
    }
  });

  const btnSubmit = document.getElementById("submit-id");
  btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = {
      type: type.value,
      message: message.value || null,
      amount: amount.value || null,
    };
    const res = await createBid(data, product.id);
  });
});
