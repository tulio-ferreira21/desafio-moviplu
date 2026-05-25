function error(message) {
  return Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(90deg, #be123c, #e11d48)",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,.15)",
    },
  }).showToast();
}
function success(message) {
  return Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(90deg, #7c3aed, #a855f7)",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,.15)",
    },
  }).showToast();
}

const toast = { success, error };

export default toast
