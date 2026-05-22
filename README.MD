# Desafio - MoviPlu Talent

1 - Stacks Obrigatórias:

- HTML
- CSS
- JS

2

- Um aplicativo tipo um OLX da vida
- Nele um usuário poderá cadastrar-se e cadastrar itens que ele não precisa mais e deseja se livrar
- Outros usuários verão as ofertas e demonstrarão seu interesse de 3 formas:

1. Tenho interesse e PAGO x reais para retirar no local
2. Tenho interesse em retirar no local, mas não pago nada
3. Tenho interesse e COBRO x reais para retirar do local

Features Obrigatórias:

- O usuário cadastrar quantos itens desejar no sistema.
- O usuário poder cancelar a oferta de um item.
- O usuário pesquisar por itens e categorias de seu interesse.
- O usuário poder dar lances em itens cadastrados.
- O cadastro de um item ter duração máxima de 30 dias, sendo que o usuário que está cadastrando poderá escolher a duração com valores entre 24 horas, 1 semana, 15 dias , 1 mês. (Ex: Luiz tem 200 telhas pra vender e coloca a oferta por 15 dias, após esse tempo, será apagado ou finalizado com algum comprador)

- Terminar o prazo, deverá ser notificado ao primeiro colocado e ao dono do item qual foi a oferta vencedora e se ambos estão de acordo com os termos. Estando tudo certo o item deverá ser marcado como negociado e deverá ser bloqueado para novas negociações.

- Não havendo acordo o item será marcado como cancelado e como sem acordo.

# Features

- Cadastro de itens -> Nome, Descrição, Fotos, Categoria, Status de venda, Endereço de retirada (Colocar o leaflet para ver a exata localização) e Tempo de expiração da oferta
- Usuário poder criar lances, editar lances e retirar lances
- Criar notificações para que quando um item de uma Categoria favoritada pelo usuário for adicionado

- Diferenciais:
  -> Chat de bate papo
  -> Badges de "Negociado", "Novo"
  -> Mapear pela localização, primeiramente
  -> Retirar lance e editar lance
  -> Denúncias -> Golpe, produto malicioso e etc

# MVP:

-> Tela de cadastro e/ou login -> Dialogs de Explicação de como a plataforma funciona e Escolha de categorias favoritas, porém, para a navegação não será necessáriio a autenticação

Bibliotecas em que eu posso usar essa demonstração de uso da Plataforma:

- DriverJS -> Para guias
- Leaflet -> Para mapas
-

Entidades:

Usuário

- id
- nome
- nomeDePerfil
- email
- senha
- fotoPerfil
- categoriasFavoritas[] -> CategoriaFavoritas[]
- endereço
- criadoEm

CategoriaFavorita
- id
- usuarioId
- categoria

Produto

- id
- titulo
- descricao
- fotos[]
- categoria
- enderecoRetirada
- latitude
- longitude
- duracaoOferta
- dataExpiracao
- anuncianteId
- criadoEm
- status:
  - ativo
  - negociado
  - cancelado
  - sem_acordo
  - expirado

Lance

- id
- produtoId
- usuarioId
- valor
- mensagem
- criadoEm
  -tipo:
    - pagar_para_retirar
    - retirar_gratis
    - cobrar_para_retirar

Chat
- id
- produtoId
- participante1Id
- participante2Id
- criadoEm
- mensagens[] -> Mensagem[]


Mensagem
- id
- chatId
- remetenteId
- conteudo
- criadoEm

Denuncia
- id
- produtoId
- usuarioId
- motivo
- descricao
- criadoEm