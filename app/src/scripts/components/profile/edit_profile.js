import api from "../../api/api.service.js";
import toast from "../../services/toasts.js";
export async function handleEditProfile(data) {
  const token = localStorage.getItem("access_token");

  if (!token) return toast.error("Erro ao autenticar");
  try {
    const { data } = await api.patch(
      "/user/profile",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { user: data.user };
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
    toast.error("Erro no servidor");
  }
}

export const contentEditProfile = `
  <div class="profile__card">
        <div class="profile__banner">
        <button class="button__edit" id="button-edit">
            <i class="bi bi-pencil"></i>
        </button>

    <picture class="profile__avatar">
      <img src="https://i.pravatar.cc/300" alt="Foto do usuário" />
    </picture>
  </div>

  <div class="profile__body">
    <div class="profile__info">
      <div class="field__edit">
        <label for="name">Nome</label>
        <input value="Jhon Doe" type="text" id="name" class="form-control"/>
      </div> 
    </div>

    <div class="profile__info">
      <div class="field__edit">
        <label for="username">Nome de usuário</label>
        <input value="jhon_doe" type="text" id="username" class="form-control" />
      </div>
    </div>

    <div class="profile__infos">
      <div class="profile__info">
      <div class="field__edit">
          <label for="email">E-mail</label>
          <input
            value="jhondoe@email.com"
            type="email"
            id="email"
            class="form-control"
          />
        </div>
      </div>

      <div class="profile__info">
        <div class="field__edit">
          <label for="location">Localização</label>
          <input
            value="Cidade, País"
            type="text"
            id="location"
            placeholder="Cidade, País"
            class="form-control"
          />
        </div>
      </div>
    </div>
  </div>
  <div class='d-flex gap-2 p-5 align-items-end'>
    <button class="btn btn-success d-flex gap-2" id='save-edit'>
      <i class="bi bi-floppy-fill"></i>
      Salvar
    </button>
    <button class='btn btn-outline-danger' id='cancel-edit'>Cancelar</button>
  </div>
</div>
`;
