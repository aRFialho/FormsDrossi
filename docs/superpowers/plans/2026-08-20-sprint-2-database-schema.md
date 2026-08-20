# Sprint 2 Database Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a fundação persistente do Canal de Escuta no Supabase, isolada da Data API pública e pronta para receber manifestações na Sprint 3.

**Architecture:** As tabelas sensíveis viverão no schema PostgreSQL `forms`, não no `public`. A aplicação Next.js acessará o banco apenas pelo backend usando uma connection string server-side; para Vercel/serverless a conexão de runtime usará o pooler transacional do Supabase. RLS será habilitado em todas as tabelas como defesa adicional, sem políticas públicas nesta fase.

**Tech Stack:** Supabase PostgreSQL 17, SQL, Next.js/Vercel backend na sprint seguinte.

**Spec:** `docs/superpowers/specs/2026-08-20-forms-drossi-design.md`

## Global Constraints

- Não expor tabelas sensíveis ao Data API.
- Não conceder privilégios de leitura/escrita a `anon` ou `authenticated`.
- Não persistir IP, user-agent, fingerprint, device ID ou geolocalização.
- Identidade deve permanecer separada do relato principal.
- Campos de identidade armazenáveis devem ser ciphertext, nunca plaintext.
- RLS deve ser habilitado em todas as tabelas da aplicação.
- Nenhuma política permissiva será criada nesta sprint.
- Após DDL, executar Supabase Security e Performance Advisors.

---

### Task 1: Schema e enums

**Produces:** schema `forms` e tipos enumerados para tipo, identidade, urgência, status, prioridade, contato e ator de evento.

- [ ] Criar schema `forms` e revogar acesso de `PUBLIC`, `anon` e `authenticated`.
- [ ] Criar enums de domínio sem extensões versionadas.

### Task 2: Tabelas iniciais

**Produces:** `forms.areas`, `forms.reports`, `forms.report_identity`, `forms.report_events`.

- [ ] Criar `areas` com slug/nome únicos, status e ordenação.
- [ ] Seed das 14 áreas aprovadas.
- [ ] Criar `reports` sem qualquer coluna de rastreamento técnico do remetente.
- [ ] Criar `report_identity` com apenas campos criptografados para nome/contato.
- [ ] Criar `report_events` para timeline sem conteúdo sensível bruto.
- [ ] Criar índices de consulta por status, prioridade, área e data.

### Task 3: Defesa em profundidade

- [ ] Habilitar RLS em todas as tabelas.
- [ ] Não criar policies nesta sprint, produzindo deny-by-default para roles sem bypass.
- [ ] Revogar privilégios de tabelas/sequences de `anon` e `authenticated`.
- [ ] Configurar default privileges do schema para evitar exposição futura acidental.

### Task 4: Verificação e versionamento

- [ ] Consultar `information_schema` e catálogos PostgreSQL para validar tabelas, colunas, constraints e RLS.
- [ ] Executar queries negativas para confirmar ausência de colunas como `ip`, `user_agent`, `fingerprint`, `device_id` e `location`.
- [ ] Executar Supabase Security Advisor.
- [ ] Executar Supabase Performance Advisor.
- [ ] Ler versão da migration registrada pelo Supabase e versionar o SQL correspondente no repositório com o mesmo identificador.
