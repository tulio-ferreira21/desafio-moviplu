export async function getDataAddress() {
  try {
    const states = await fetch("../../scripts/data/states.data.json");
    const citys = await fetch("../../scripts/data/citys.data.json");
    return {
      citys: await citys.json(),
      states: await states.json(),
    };
  } catch (error) {
    toast.error("Erro ao carregar dados");
    console.error(error);
  }
}
