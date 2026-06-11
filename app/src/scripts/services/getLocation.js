import toast from "./toasts.js";

// export default navigator.geolocation.getCurrentPosition(async (pos) => {
//   const { latitude, longitude } = pos.coords;
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
//     );
//     if (!response.ok) {
//       return toast.error("Erro ao identificar estado");
//     }
//     const data = await response.json();

//     return { state: data.address.state };
//   } catch (error) {
//     toast.error("Erro na requisição");
//   }
// });

export default function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );

          if (!response.ok) return toast.error("Localização inválida");

          const data = await response.json();
          resolve({
            state: data.address.state,
          });
        } catch (error) {
          toast.error("Erro na requisição");
          reject(error);
        }
      },
      (error) => {
        toast.error("Permissão de localização negada");
        reject(error);
        return;
      },
    );
  });
}

export async function getCoordinates(street, city, state) {
  const api = "https://nominatim.openstreetmap.org/search?format=json&q=";
  const address = `${street}, ${city}, ${state}`;
  try {
    const res = await fetch(`${api}${address}`);
    if (!res.ok) {
      return toast.error("Endereço não encontrado");
    }

    const data = await res.json();
    if (data.length === 0) return toast.error("Endereço não encontrado");

    return { longitude: data[0].lon, latitude: data[0].lat };
  } catch (error) {
    toast.error("Erro ao buscar endereço");
  }
}
