import { getCategories } from "../../services/loadCategories.js";

const containerCategories = document.getElementById("categories");

const categories = await getCategories();

console.log(categories)
if (categories) {
  containerCategories.innerHTML += categories.map(
    (category) =>
      `<div class="category"  data-id="${category.id}">
            <div class="category__icon">
              <i class="bi ${category.iconBootstrap}"></i>
            </div>
            <span>${category.name}</span>
        </div>`,
  ).join("");
}
