# Deep Space Store Checkout

Este é um projeto de frontend desenvolvido em Vue.js para simular o processo de checkout de uma loja virtual fictícia chamada **Deep Space Store**. O projeto inclui um fluxo de compra completo, desde o preenchimento dos dados pessoais, entrega e pagamento, até a exibição de uma página de confirmação do pedido.

## Funcionalidades

- **Página de Checkout**: O usuário preenche os dados pessoais, de entrega e de pagamento.
- **Validação de Formulários**: Cada formulário é validado antes de permitir a conclusão do pedido.
- **Mock de API**: Utilização de `axios-mock-adapter` para simular requisições e respostas de uma API.
- **Página de Confirmação**: Exibe os detalhes do pedido após a finalização.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework principal para a construção do frontend.
- **Vuex**: Gerenciamento de estado global.
- **Vue Router**: Gerenciamento de rotas entre as páginas.
- **Vuetify**: Biblioteca de componentes de UI.
- **Axios**: Cliente HTTP para comunicação com APIs.
- **axios-mock-adapter**: Para simulação de respostas da API.
- **Cypress**: Para testes end-to-end.
- **Jest**: Para testes unitários.

## Requisitos

- **Node.js**: v14 ou superior
- **npm**: v6 ou superior

## Instalação

### 1. Clonar o repositório

```bash
git https://github.com/seu-usuário/Projeto-Youshop
cd deep-space-store-checkout

## Project setups
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## Estrutura do Projeto

├── src
│   ├── assets          # Imagens e arquivos estáticos
│   ├── components      # Componentes Vue reutilizáveis
│   ├── mocks           # Mock de API usando axios-mock-adapter
│   ├── plugins         # Configurações do Vuetify e outros plugins
│   ├── router          # Definição das rotas do Vue Router
│   ├── store           # Vuex para gerenciamento de estado
│   ├── views           # Páginas principais da aplicação
│   ├── App.vue         # Componente raiz da aplicação
│   └── main.js         # Ponto de entrada da aplicação
├── tests               # Testes unitários e de integração
├── public              # Arquivos estáticos públicos
├── package.json        # Dependências e scripts do npm
└── README.md           # Documentação do projeto

