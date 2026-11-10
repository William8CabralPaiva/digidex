# Digidex

Enciclopédia de Digimon (estilo Pokédex) feita com React + TypeScript + Vite, criada para demonstrar arquitetura organizada e boas práticas. Os dados vêm da API pública [digi-api.com](https://digi-api.com).

## Funcionalidades

- **Explorar**: busca com debounce, filtros por nível e atributo, ordenação e paginação (estado salvo na URL).
- **Detalhe**: informações, habilidades e linha de evolução do Digimon.
- **Evolução**: árvore de evolução navegável.
- **Favoritos**: salvos no `localStorage` e gerenciados com `useReducer`.

## Stack

React 19, React Router, styled-components, TypeScript, Vite e ESLint.

## Scripts

Gerenciador de pacotes: Yarn (`yarn.lock`).

```bash
yarn install
yarn dev       # servidor de desenvolvimento
yarn build     # tsc -b && vite build
yarn lint      # eslint .
yarn preview   # preview do build
```

## Arquitetura

```
src/
├── routes/          # createBrowserRouter (layout routes)
├── layouts/         # SidebarLayout (com barra lateral) e FocusLayout (sem)
├── screens/         # Explorer, Favorites, DigimonDetail, Evolution, Settings
├── components/      # UI reutilizável (cards, badges, paginação, etc.)
├── hooks/           # useAsync, useDebounce, useDigimonList, useDigimonDetail
├── store/favorites/ # reducer + context + provider + hook dos favoritos
├── services/        # cliente da API (com cache de detalhes)
├── theme/           # tema do styled-components
├── types/           # tipos de domínio
└── utils/           # storage e helpers de Digimon
```

A barra lateral só aparece nas telas filhas de `SidebarLayout`; telas de foco (como o detalhe) usam `FocusLayout`.
