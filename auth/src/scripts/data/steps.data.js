const username = localStorage.getItem("username");
export const steps = [
  `
      <div class="form__header">
          <h2>Como devemos te chamar?</h2>

          <p>Escolha um nome de usuário único para seu perfil.</p>
        </div>

        <div class="form__fields">
          <div class="field">
            <label>Nome de usuário</label>

            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-person"></i>
              </span>

              <input
                type="text"
                class="form-control form__input"
                placeholder="tulioandrade"
                id="username"
                value="${username ? username : ""}"
              />
            </div>
          </div>
        </div>

        <button type="button" class="form__button" id="btn_username">Continuar</button>
    `,
  `
   <button class="back_step" id="back_step">
      <i class="bi bi-arrow-left"></i>
      Voltar
    </button>
      <div class="form__header">
          <h2>Onde você está?</h2>

          <p>Isso ajuda a encontrar trocas perto de você.</p>
        </div>

        <div class="form__fields">
          <div class="field">
            <label>Cidade</label>

            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-buildings"></i>
              </span>

              <input
                type="text"
                class="form-control form__input"
                placeholder="Ex: Garanhuns"
                id="city"
                list="cities_datalist"
              />

              <datalist id="cities_datalist">
                <option value="">Informe</option>
              </datalist>
            </div>
          </div>

          <div class="field">
            <label>Estado</label>

            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-geo-alt"></i>
              </span>

              <select class="form-control form__input" id="states">
                <option value="">Selecione</option>
                <option value="PE">Pernambuco</option>
                <option value="AL">Alagoas</option>
                <option value="PB">Paraíba</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="CE">Ceará</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="form__button" id="btn_address">Continuar</button>


    `,
  `
            <div class="form__header">
            <h2>O que você gosta?</h2>

            <p>Escolha algumas categorias para personalizar sua experiência.</p>
          </div>

     <div class="categories__selector" id="container-categories">
        <label class="category__chip">
          <input type="checkbox" value="eletronicos">
          <span>Eletrônicos</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="casa">
          <span>Casa</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="decoracao">
          <span>Decoração</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="livros">
          <span>Livros</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="games">
          <span>Games</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="moda">
          <span>Moda</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="esportes">
          <span>Esportes</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="musica">
          <span>Música</span>
        </label>

        <label class="category__chip">
          <input type="checkbox" value="tecnologia">
          <span>Tecnologia</span>
        </label>
</div>

          <button type="button" class="form__button" id="finish_profile">Finalizar perfil</button>
      `,
];
