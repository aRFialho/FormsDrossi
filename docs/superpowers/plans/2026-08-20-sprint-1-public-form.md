# Sprint 1 Public Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar a experiência pública completa do Canal de Escuta, com campos e comportamentos condicionais aprovados, sem persistência no banco.

**Architecture:** A página raiz continua server-rendered e compõe um header público e um formulário Client Component. Opções de domínio e regras condicionais ficam em módulos puros, testáveis sem browser; o componente React consome essas regras e mantém apenas estado de interface local.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript, Tailwind CSS 4, Vitest.

**Spec:** `docs/superpowers/specs/2026-08-20-forms-drossi-design.md`

## Global Constraints

- Não persistir dados nesta sprint.
- Não conectar Supabase nesta sprint.
- Não coletar IP, fingerprint ou identificador técnico do colaborador.
- A interface deve deixar explícitas as modalidades anônima, confidencial e identificada.
- A área restrita deve aparecer discretamente no canto superior direito.
- O formulário deve ser responsivo e acessível por teclado.
- Vercel deve executar teste, lint e build antes de aceitar o deployment.

---

### Task 1: Domínio do formulário via TDD

**Files:**
- Create: `lib/report-options.test.ts`
- Create: `lib/report-options.ts`
- Modify: `vitest.config.ts`

**Interfaces:**
- Produces: `REPORT_TYPES`, `REPORT_AREAS`, `IDENTITY_MODES`, `CONTACT_METHODS`, `URGENCY_OPTIONS`.
- Produces: tipos TypeScript derivados dos valores acima.

- [ ] Escrever teste falhando que exige 4 tipos de mensagem e todas as áreas aprovadas.
- [ ] Executar o gate e confirmar RED.
- [ ] Implementar constantes tipadas com `as const`.
- [ ] Ampliar `vitest.config.ts` para `**/*.test.{ts,tsx}`.

### Task 2: Regras condicionais via TDD

**Files:**
- Create: `lib/report-form-visibility.test.ts`
- Create: `lib/report-form-visibility.ts`

**Interfaces:**
- Consumes: `IdentityMode` de `report-options.ts`.
- Produces: `getReportFormVisibility(identityMode, wantsReturn)` retornando `{ showName: boolean; showContact: boolean }`.

- [ ] Escrever testes para anônimo sem retorno, confidencial e identificado, e retorno solicitado.
- [ ] Confirmar RED.
- [ ] Implementar regra mínima: nome só aparece fora de anônimo; contato aparece somente quando retorno é solicitado.
- [ ] Confirmar GREEN.

### Task 3: Header e formulário público

**Files:**
- Create: `components/public/site-header.tsx`
- Create: `components/public/report-form.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `SiteHeader` expõe link `/admin` com rótulo `Área restrita`.
- `ReportForm` apresenta os campos aprovados e usa `getReportFormVisibility` para condicionais.

- [ ] Criar header simples, institucional e responsivo.
- [ ] Criar formulário com tipo, área, relato, detalhes, urgência, identidade e retorno.
- [ ] Mostrar nome opcional para confidencial/identificado.
- [ ] Mostrar método de contato + contato quando retorno for `Sim`.
- [ ] Mostrar aviso específico quando modo anônimo estiver selecionado.
- [ ] No submit desta sprint, impedir persistência e mostrar aviso claro de ambiente em implementação.
- [ ] Atualizar página raiz para compor hero curto + formulário.

### Task 4: Verificação

- [ ] Verificar Vercel status do commit final.
- [ ] Exigir estado `success` em pelo menos o projeto oficial `forms-drossi` ou deployment equivalente ligado ao repositório.
- [ ] Comparar branch contra `feat/sprint-0-foundation` e confirmar que não há schema, credenciais ou integração Supabase.
