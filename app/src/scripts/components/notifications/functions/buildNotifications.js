import { BASE_PATH } from "../../../config/basePath.js";
import { formatTimeAgo } from "../../../services/formatTimeAgo.js";

export function buildNotifications(notifications) {
  if (notifications.length <= 0 || !notifications)
    return `<p class="text-muted">Nenhuma notificação por enquanto</p>`;
  return notifications.map((notification) => {
    return `
        <article class="notification__card ${notification.read === false ? "unread" : ""}">
          <div class="notification__icon trade">
            <i class="bi bi-stars"></i>
          </div>

          <div class="notification__body">
            <div class="notification__top">
              <h3>${notification.title}</h3>

              <span>${formatTimeAgo(notification.createdAt)}</span>
            </div>

            <p>
              ${notification.message}
            </p>

            <a href="${BASE_PATH}/src/pages/product/page.html?id=${notification.productId}">Ver anúncio</a>
          </div>
        </article>
    `;
  });
}
