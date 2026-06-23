export function formatTimeAgo(dateString) {
  const createdAt = new Date(dateString);
  const now = new Date();

  const diffMs = now - createdAt;

  const minutes = Math.floor(diffMs / (1000 * 60));

  if (minutes < 1) {
    return "Agora mesmo";
  }

  if (minutes < 60) {
    return `${minutes}min atrás`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h atrás`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d atrás`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} mês${months > 1 ? "es" : ""} atrás`;
  }

  const years = Math.floor(months / 12);

  return `${years} ano${years > 1 ? "s" : ""} atrás`;
}
