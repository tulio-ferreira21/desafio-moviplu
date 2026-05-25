export function errorsOnAuthentication(field, message) {
  const fields = {
    name: "field_name",
    email: "field_email",
    password: "field_password",
  };
  const container = document.getElementById(fields[field]);

  if(!container) return

  const oldError = document.querySelector(".error-message")

  if(oldError) oldError.remove()

  const spanError = document.createElement("span");
  spanError.classList.add("error-message")
  spanError.textContent = message;
  spanError.style.color = "red";
  spanError.style.fontSize = "12px";

  container.appendChild(spanError);

  setTimeout(() => {
    container.removeChild(spanError);
  }, 2000);
}
