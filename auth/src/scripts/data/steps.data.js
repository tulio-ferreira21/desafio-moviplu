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
              />
            </div>
          </div>
        </div>

        <button type="button" class="form__button" id="btn_username">Continuar</button>
    `,
  `
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
              />
            </div>
          </div>

          <div class="field">
            <label>Estado</label>

            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-geo-alt"></i>
              </span>

              <select class="form-control form__input" id="state">
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
    <button type="button" class="form__button" id="finish_profile">Finalizar perfil</button>

    `,
//   `
//           <div class="form__header">
//           <h2>O que você gosta?</h2>

//           <p>Escolha algumas categorias para personalizar sua experiência.</p>
//         </div>

//         <div class="form__fields">
//           <div class="categories__selector">
//             <button type="button" class="category__chip">Eletrônicos</button>

//             <button type="button" class="category__chip">Casa</button>

//             <button type="button" class="category__chip">Decoração</button>

//             <button type="button" class="category__chip">Livros</button>

//             <button type="button" class="category__chip">Games</button>

//             <button type="button" class="category__chip">Moda</button>

//             <button type="button" class="category__chip">Esportes</button>

//             <button type="button" class="category__chip">Música</button>

//             <button type="button" class="category__chip">Tecnologia</button>
//           </div>
//         </div>

//         <button type="button" class="form__button" id="finish_profile">Finalizar perfil</button>
//     `,
];
