import api from "../../../api/api.service.js";
import { $ConvertEnumBid } from "../../../data/bids.enum.js";
import { getCategories } from "../../../services/loadCategories.js";
import toast from "../../../services/toasts.js";
import { getBidByProductId } from "../functions/getBidsByProductId.js";
import getProductbyId from "../functions/getProducts.js";
const containerProducts = document.getElementById("product-body");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const titlePage = document.getElementById("title-page");
const product = await getProductbyId(id);
const bids = await getBidByProductId(id);

titlePage.textContent = `${product.name} | Trocso`;

const buildPageProduct = async (product, bids) => {
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
    </section>

    <section class="product__content">
      <div class="product__card">
      <h1 class="border-bottom pb-3">Informações do Anúncio</h1>
        <h2>Descrição</h2>
        <p>${product.description}</p>

        <h2>Localização</h2>
        <p>${product.address}</p>

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
      <div class="product__card">
        <h1 class="border-bottom pb-3">Ofertas enviadas</h1>
         ${
           bids && bids.length <= 0
             ? "<p class='text-muted'>Nenhuma oferta enviada</p>"
             : bids
                 .map(
                   (bid) => `
<div class="bid__card">
  <div class="bid__info">
    <h3>${bid.user.name}</h3>

    ${
      bid.user.username
        ? `<span class="bid__username">@${bid.user.username}</span>`
        : ""
    }

    ${bid.message ? `<p class="bid__message">${bid.message}</p>` : ""}
  </div>

  <div class="bid__meta">
    <span class="bid__type">${$ConvertEnumBid[bid.type]}:</span>

    ${
      bid.amount
        ? `<span class="bid__value">R$ ${bid.amount.toFixed(2)}</span>`
        : ""
    }
  </div>

  <small class="bid__date">
    ${new Date(bid.createdAt).toLocaleDateString("pt-BR")}
  </small>
    ${
      bid.accepted
        ? bid.accepted
          ? "<p class='bg-success-subtle p-2 text-success fs-6 rounded-5'>Oferta Aceita</p>"
          : "<p class='bg-danger-subtle p-2 text-danger fs-6 rounded-5'>Oferta Recusada</p>"
        : ` <div class="bid__actions">
    <button
      class="btn btn-success accept-bid"
      data-bid-id="${bid.id}"
      data-owner="${bid.userId}"
      data-product-id="${product.id}"
    >
      Aceitar oferta
    </button>
  </div>`
    }
</div>
`,
                 )
                 .join("")
         }
      </div>
    </section>
  `;
};
containerProducts.innerHTML = await buildPageProduct(product, bids);

document.querySelectorAll(".accept-bid").forEach((button) => {
  button.addEventListener("click", async () => {
    const bidId = button.dataset.bidId;
    const ownerBidId = button.dataset.owner;
    const productId = button.dataset.productId;
    const confirmAccept = confirm("Deseja realmente aceitar esta oferta?");

    if (!confirmAccept) return;

    try {
      const res = await api.patch(
        `/bid/accept`,
        { productId, bidId, ownerBidId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      toast.success(res.data?.message);
    } catch (error) {
      console.error(error);
      console.log(error.response?.data?.message);
      toast.error("Erro ao aceitar oferta.");
    }
  });
});
