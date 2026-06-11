export const formAddProductContent = `
<form class="form__product needs-validation" novalidate>
    <h2>Adicionar um novo Produto</h2>
    <p>Informe as informações do seu anúncio e publique já!</p>

    <div class="field__form">
        <label for="name-product" class="form-label">
            Nome do Produto
        </label>

        <input
            type="text"
            class="form-control"
            id="name-product"
            placeholder="Nome do produto..."
            required
        />

        <div class="invalid-feedback">
            Informe o nome do produto.
        </div>
    </div>

    <div class="field__form">
        <label for="description-product" class="form-label">
            Descrição
        </label>

        <textarea
            class="form-control"
            id="description-product"
            rows="4"
            placeholder="Descrição..."
            required
        ></textarea>

        <div class="invalid-feedback">
            Informe uma descrição.
        </div>
    </div>

    <div class="field__form">
        <label for="categories-product" class="form-label">
            Categoria
        </label>

        <select
            class="form-select"
            id="categories-product"
            required
        >
            <option value="" selected disabled>
                Selecione uma categoria
            </option>
        </select>

        <div class="invalid-feedback">
            Selecione uma categoria.
        </div>
    </div>

    <section class="form__address">
        <h2>Endereço</h2>

        <div class="input-group gap-2 w-100">

            <div class="field__form">
                <label for="street-product" class="form-label">
                    Rua
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="street-product"
                    placeholder="Rua..."
                    required
                />

                <div class="invalid-feedback">
                    Informe a rua.
                </div>
            </div>

            <div class="field__form">
                <label for="city-product" class="form-label">
                    Cidade
                </label>

                <select
                    class="form-select"
                    id="city-product"
                    required
                >
                    <option value="" selected disabled>
                        Selecione uma Cidade
                    </option>
                </select>

                <div class="invalid-feedback">
                    Selecione uma cidade.
                </div>
            </div>

            <div class="field__form">
                <label for="state-product" class="form-label">
                    Estado
                </label>

                <select
                    class="form-select"
                    id="state-product"
                    required
                >
                    <option value="" selected disabled>
                        Selecione um Estado
                    </option>
                </select>

                <div class="invalid-feedback">
                    Selecione um estado.
                </div>
            </div>

            <div class="field__form">
                <label
                    for="complement_address-product"
                    class="form-label"
                >
                    Complemento
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="complement_address-product"
                    placeholder="Complemento..."
                />
            </div>

        </div>
    </section>

    <div class="field__form">
        <label for="duration-product" class="form-label">
            Duração do anúncio
        </label>

        <select
            class="form-select"
            id="duration-product"
            required
        >
            <option value="1">24 Horas</option>
            <option value="7">7 Dias</option>
            <option value="15">15 Dias</option>
            <option value="30">30 Dias</option>
        </select>
    </div>

    <div class="field__form">
        <label for="images" class="form-label">
            Imagens do Produto
        </label>

        <input
            type="file"
            class="form-control"
            id="images"
            multiple
            accept="image/*"
            required
        />

        <div class="invalid-feedback">
            Selecione pelo menos uma imagem.
        </div>

        <div class="form-text">
            Selecione uma ou mais imagens.
        </div>

        <div id="preview"></div>
    </div>

    <button
        type="button"
        id="submit"
        class="btn btn-primary"
    >
        Publicar Produto
    </button>

    <button
        type="button"
        class="btn btn-danger"
        id="cancel"
    >
        Cancelar
    </button>

</form>
`;