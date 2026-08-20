# Sprint 0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o repositório vazio FormsDrossi em uma aplicação Next.js testada e pronta para deploy na Vercel, sem integração com Supabase nesta sprint.

**Architecture:** Aplicação Next.js App Router mínima, com TypeScript estrito, Tailwind, ESLint e Vitest/Testing Library. A página raiz será um Server Component simples que apresenta a identidade provisória do Canal de Escuta; nenhuma persistência, autenticação ou variável de ambiente será implementada ainda.

**Tech Stack:** Next.js 16.3.0, React 19.2.8, TypeScript, Tailwind CSS, ESLint, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-20-forms-drossi-design.md`

## Global Constraints

- Usar Next.js App Router + TypeScript.
- Não tocar no Supabase durante a Sprint 0.
- Não criar secrets ou variáveis de autenticação nesta sprint.
- TypeScript deve usar modo estrito.
- `npm test`, `npm run lint` e `npm run build` devem passar antes de publicar a implementação.
- O código deve permanecer na branch `feat/sprint-0-foundation` até a verificação final.
- A página temporária deve identificar `Forms D'Rossi` e `Canal de Escuta`.

---

### Task 1: Toolchain e configuração do projeto

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: scripts `dev`, `build`, `start`, `lint`, `test`, `test:run` no `package.json`.
- Produces: alias TypeScript `@/*` apontando para a raiz do projeto.

- [ ] **Step 1: Criar `package.json` com versões estáveis e scripts**

```json
{
  "name": "forms-drossi",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "next": "16.3.0",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  }
}
```

- [ ] **Step 2: Instalar dependências de produção e desenvolvimento, gerando `package-lock.json`**

Run:

```bash
npm install
npm install -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next tailwindcss @tailwindcss/postcss vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```

Expected: instalação concluída sem conflito fatal e lockfile gerado.

- [ ] **Step 3: Criar configuração TypeScript estrita**

`tsconfig.json` deve conter `strict: true`, `noEmit: true`, `moduleResolution: bundler`, plugin `next` e alias `@/*`.

- [ ] **Step 4: Criar configurações de Next, PostCSS, ESLint e Vitest**

Vitest deve executar em `jsdom`, carregar `vitest.setup.ts` e aceitar JSX/React em testes.

- [ ] **Step 5: Verificar toolchain**

Run:

```bash
npm run lint
npm run test:run
```

Expected: lint sem erros; Vitest pode retornar `No test files found` neste ponto, pois o teste comportamental será criado na Task 2.

### Task 2: Página raiz provisória via TDD

**Files:**
- Create: `app/page.test.tsx`
- Create: `app/page.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

**Interfaces:**
- Produces: rota pública `/`.
- Produces: heading acessível `Forms D'Rossi`.
- Produces: texto identificador `Canal de Escuta`.

- [ ] **Step 1: Escrever o teste falhando antes da página**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  it("identifica o Forms D'Rossi como Canal de Escuta", () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { name: "Forms D'Rossi" }),
    ).toBeInTheDocument()
    expect(screen.getByText('Canal de Escuta')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar RED**

Run:

```bash
npm run test:run -- app/page.test.tsx
```

Expected: FAIL porque `app/page.tsx` ainda não existe.

- [ ] **Step 3: Criar implementação mínima**

`app/page.tsx` deve renderizar somente a estrutura necessária para satisfazer o teste, sem formulário real nesta sprint.

- [ ] **Step 4: Criar layout e CSS global mínimos**

`app/layout.tsx` deve definir metadata básica e importar `globals.css`. O CSS deve preparar Tailwind e uma base neutra, sem design final da Sprint 1.

- [ ] **Step 5: Rodar o teste e confirmar GREEN**

Run:

```bash
npm run test:run -- app/page.test.tsx
```

Expected: PASS, 1 test, 0 failures.

### Task 3: Verificação de produção

**Files:**
- Modify if necessary: arquivos criados nas Tasks 1 e 2 somente para corrigir falhas verificadas.

**Interfaces:**
- Produces: build Next.js consumível pela Vercel.

- [ ] **Step 1: Rodar suíte completa**

```bash
npm run test:run
```

Expected: todos os testes PASS.

- [ ] **Step 2: Rodar lint**

```bash
npm run lint
```

Expected: 0 errors.

- [ ] **Step 3: Rodar build**

```bash
npm run build
```

Expected: `next build` concluído com sucesso e rota `/` gerada.

- [ ] **Step 4: Revisar diff para garantir escopo**

Confirmar que não existem credenciais, integração Supabase, autenticação ou arquivos fora da Sprint 0.

- [ ] **Step 5: Publicar somente os arquivos verificados na branch**

Commit esperado:

```text
feat: initialize Next.js application
```

Depois da publicação, verificar o deployment de preview/branch na Vercel. A promoção ou merge para `main` é uma etapa separada.
