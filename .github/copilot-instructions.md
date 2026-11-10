# Copilot Instructions

## Comandos

Gerenciador: Yarn (`yarn.lock`).

- Dev: `yarn dev`
- Build (typecheck + bundle): `yarn build` (equivale a `tsc -b && vite build`)
- Lint: `yarn lint` (arquivo único: `npx eslint src/caminho/arquivo.tsx`)
- Typecheck isolado: `npx tsc -b`
- Não há framework de testes configurado.

## Arquitetura

Digidex: app React 19 + Vite + TypeScript que consome a API pública `https://digi-api.com/api/v1`. Layout de referência em `docs/img_1.png` e `docs/img_2.png`; requisitos originais em `docs/to_do.md`. UI em português.

- **Roteamento** (`src/routes/index.tsx`): `createBrowserRouter` com duas layout routes. `SidebarLayout` envolve Explorar, Favoritos, `evolution/:id?` e Configurações; `FocusLayout` envolve `digimon/:id` e `*` (sem barra lateral). Para exibir a barra em uma tela, torne-a filha de `SidebarLayout`; não renderize `Sidebar` dentro de telas.
- **Dados** (`src/services/`): `api.ts` exporta a instância do axios (baseURL `https://digi-api.com/api/v1`, interceptor que converte erros em mensagens em português). `digimonApi.ts` converte a resposta crua da API em `DigimonSummary`/`DigimonDetail`. A API só filtra nome por prefixo, então `fetchDigimonPage` baixa o índice completo (id + nome, `pageSize=5000`, cacheado por nível/atributo), filtra por trecho do nome, ordena e pagina localmente, e só então busca os detalhes (cacheados por id em um `Map` de promises) dos itens da página. Essas promises são compartilhadas, por isso não recebem `AbortSignal`.
- **Hooks de dados**: `useAsync(fetcher)` reexecuta quando a identidade do `fetcher` muda, por isso quem chama deve memoizar com `useCallback`; respostas de execuções substituídas são descartadas. `isLoading` é derivado (`state.source !== fetcher`) em vez de `setState` síncrono no effect, por causa da regra `react-hooks` do lint; `data` mantém o resultado anterior durante o carregamento.
- **Favoritos** (`src/store/favorites/`): `useReducer` (`ADD`/`REMOVE`/`CLEAR`) em `FavoritesProvider`, persistido em `localStorage` (`digidex:favorites`) via `useEffect`. Guardam `DigimonSummary` completo para a tela de Favoritos não precisar da API. Context, provider e hook ficam em arquivos separados por causa de `react-refresh/only-export-components`. Use `useFavorites()`.
- **Estado do Explorer**: busca (`q`), `level`, `attribute`, `sort` e `page` ficam em `useSearchParams`; a busca é debounced e escrita na URL com `replace`. A ordenação A→Z/Z→A vale para todos os resultados.
- **Último visto**: `useDigimonDetail` grava o id em `localStorage` (`utils/storage.ts`); o item "Evolução" da `Sidebar` aponta para ele.

## Convenções

- Estilos com styled-components; o tema (`src/theme/theme.ts`) é tipado via `src/theme/styled.d.ts` e acessado por `theme`/`useTheme`. Use props transitórias (`$active`, `$variant`) em styled components.
- Cada componente/tela fica em sua pasta com a lógica separada dos estilos: `components/X/index.tsx` + `components/X/styles.ts`, `screens/X/X.tsx` + `screens/X/styles.ts` (layouts em `layouts/styles.ts`). Não declare `styled.*` dentro de arquivos `.tsx`. Estilos compartilhados ficam em `components/ui.ts`; tipos de domínio em `src/types`.
- TS estrito do template: `verbatimModuleSyntax` (use `import type`), `erasableSyntaxOnly` (sem `enum`), `noUnusedLocals/Parameters`.
- Imagens/ícones: ícones SVG inline em `components/Icons`; não há biblioteca de ícones.
