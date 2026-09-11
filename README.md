# 🍔 WaiterApp

Sistema completo de gerenciamento de pedidos para restaurantes, pensado para o fluxo real de um salão: o garçom registra o pedido pelo tablet/celular e a cozinha acompanha o status em tempo real em um painel na tela.

O projeto é dividido em três aplicações que conversam entre si via API REST e WebSocket:

| App | Papel | Público |
|---|---|---|
| **`app/`** | Aplicativo mobile onde o garçom monta o pedido (categorias, produtos, carrinho, mesa) | Garçom |
| **`fe/`** | Painel web (Kanban) que a cozinha usa para acompanhar e avançar o status dos pedidos em tempo real | Cozinha/Balcão |
| **`api/`** | API REST + WebSocket que centraliza pedidos, produtos e categorias | Backend compartilhado |

## 🖼️ Como funciona o fluxo

1. O garçom abre o app mobile, escolhe a mesa, navega pelas categorias/produtos e monta o pedido.
2. O pedido é enviado para a API, que salva no MongoDB.
3. A API emite um evento via **Socket.io** para o painel da cozinha, que atualiza a tela **sem precisar dar refresh**.
4. A cozinha movimenta o pedido entre as colunas do quadro (`Fila de espera` → `Em preparação` → `Pronto!`), e cada troca de status também é propagada em tempo real.
5. Ao finalizar ou cancelar, o pedido some do quadro para todos que estiverem com a tela aberta.

## 🚀 Tecnologias e conceitos aplicados

### Backend (`api/`)
- **Node.js + TypeScript** com módulos ES (`type: module`)
- **Express 5** para as rotas REST
- **MongoDB + Mongoose** para persistência (models de `Category`, `Product` e `Order`)
- **Socket.io** para emitir eventos em tempo real quando um pedido é criado ou muda de status
- **Multer** para upload de imagens dos produtos, servidas como arquivos estáticos (`/uploads`)
- Arquitetura em **use cases** (`app/useCases/*`), separando cada regra de negócio (criar pedido, listar produtos, cancelar pedido, etc.) em um arquivo próprio, sem "gordura" no controller/router
- **ESLint + typescript-eslint** para padronização de código

### Frontend Web (`fe/`)
- **React 19 + TypeScript** com **Vite**
- **Styled Components** para estilização
- **Socket.io Client** consumindo os eventos da API para atualizar o quadro de pedidos em tempo real
- **Axios** para as chamadas HTTP
- **React Toastify** para notificações de novos pedidos
- Componentização por feature (`Orders`, `OrdersBoard`, `OrderModal`, `Header`)

### Mobile (`app/`)
- **React Native + Expo** (Expo Router/SDK 57) com **TypeScript**
- **Styled Components** adaptado para React Native
- **React Native SVG** para os ícones customizados
- **Axios** consumindo a mesma API REST usada pelo painel web
- Fontes customizadas (`General Sans`) e componentes próprios de UI (`Button`, `Cart`, `Categories`, `Menu`, `ProductModal`, `TableModal`, etc.)

## 📁 Estrutura do projeto

```
WaiterApp/
├── api/    # Backend Node.js/Express + MongoDB + Socket.io
├── fe/     # Painel web (React) para a cozinha
└── app/    # App mobile (Expo/React Native) para o garçom
```

## ▶️ Rodando o projeto localmente

Pré-requisitos: Node.js, Yarn/NPM e um MongoDB rodando em `mongodb://localhost:27017`.

**API**
```bash
cd api
npm install
npm run dev
```
Sobe em `http://localhost:3001`.

**Frontend web**
```bash
cd fe
yarn install
yarn dev
```
Sobe em `http://localhost:5173`.

**Mobile**
```bash
cd app
yarn install
yarn start
```
Abre o Expo Dev Tools (use o Expo Go ou um emulador para visualizar).

## 🔌 Principais rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/categories` | Lista categorias |
| POST | `/categories` | Cria categoria |
| GET | `/products` | Lista produtos |
| POST | `/products` | Cria produto (com upload de imagem) |
| GET | `/categories/:categoryId/products` | Lista produtos de uma categoria |
| GET | `/orders` | Lista pedidos |
| POST | `/orders` | Cria pedido |
| PATCH | `/orders/:orderId` | Atualiza status do pedido |
| DELETE | `/orders/:orderId` | Cancela pedido |

## 💡 Sobre o projeto

Este projeto foi construído como estudo prático de uma aplicação **full-stack + mobile** com comunicação em tempo real, cobrindo desde a modelagem dos dados no backend até a experiência de uso em dois clientes diferentes (web e mobile) consumindo a mesma API.
