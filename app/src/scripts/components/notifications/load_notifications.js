import { buildNotifications } from "./functions/buildNotifications.js";
import { getNotifications } from "./functions/getNotifications.js";

const containerNotifications = document.getElementById(
  "container-notifications",
);

const notifications = await getNotifications();

const content = buildNotifications(notifications);

containerNotifications.innerHTML = content;
