# Forms D'Rossi — Design V1

## Objetivo

Construir um canal empresarial interno para colaboradores enviarem sugestões, elogios, reclamações e denúncias, com opção anônima, confidencial ou identificada, protocolo de acompanhamento, comunicação assíncrona e área administrativa com permissões, auditoria e tratamento de urgência.

## Stack

- Next.js App Router + TypeScript
- Vercel para frontend e backend server-side
- Supabase PostgreSQL para persistência
- Supabase Storage para anexos em sprint posterior
- Drizzle ORM
- Zod para validação
- Tailwind CSS
- Argon2id para hashes de senha
- Cookies HttpOnly, Secure e SameSite=Lax para sessão administrativa

## Arquitetura

A aplicação pública e a área administrativa serão um único projeto Next.js hospedado na Vercel. Toda gravação sensível será feita server-side. O browser não terá acesso privilegiado ao banco. O Supabase será usado como PostgreSQL gerenciado e, posteriormente, Storage.

Fluxo principal:

```text
Colaborador -> Next.js/Vercel -> validação server-side -> Supabase
Administrador -> login server-side -> sessão -> área restrita -> Supabase
```

## Autenticação administrativa — Caminho B

A autenticação será própria, sem depender de Supabase Auth.

### Master

O usuário master será definido por variáveis de ambiente server-side:

- `MASTER_USERNAME`
- `MASTER_PASSWORD_HASH`
- `SESSION_SECRET`

A senha master nunca será armazenada em texto puro e nenhuma variável de autenticação poderá usar prefixo `NEXT_PUBLIC_`.

O Master não precisa existir em `admin_users`; ele será tratado como identidade de bootstrap/root. O Master não poderá ser removido ou desativado pela interface.

### Usuários criados pelo Master

O Master poderá criar usuários administrativos no banco. Cada usuário terá nome, username único, hash de senha, papel, status, data de criação, criador e controle de troca obrigatória de senha.

Papéis iniciais:

- `ADMIN`
- `MANAGER`
- `READER`

Permissões granulares previstas:

- `can_read_reports`
- `can_answer_reports`
- `can_close_reports`
- `can_assign_reports`
- `can_view_confidential_identity`
- `can_manage_users`
- `can_view_audit`
- `can_manage_settings`

A autorização sempre será validada server-side.

## Rotas públicas

### `/`

Formulário principal.

Campos:

1. Tipo obrigatório: Sugestão, Elogio, Reclamação ou Denúncia.
2. Área/assunto obrigatório.
3. Relato obrigatório em campo longo.
4. Informações adicionais opcionais: data aproximada, local, setor/pessoas envolvidas, testemunhas, recorrência e detalhes complementares.
5. Urgência: não, sim, não tenho certeza.
6. Modo de identidade: anônimo, confidencial ou identificado.
7. Retorno/acompanhamento: sim ou não.

Áreas iniciais:

- Administrativo
- Comercial
- Marketing
- Cadastro
- Compras
- Logística
- Financeiro
- RH
- Liderança/Gestão
- Ambiente de trabalho
- Assédio ou discriminação
- Segurança
- Fraude ou irregularidade
- Outro

### `/acompanhar`

Consulta por protocolo e chave secreta. Permitirá acompanhar status e, em sprint posterior, trocar mensagens sem login.

## Anonimato

Quando o modo escolhido for anônimo, a aplicação não deverá persistir no registro da manifestação:

- nome
- e-mail
- telefone
- matrícula
- login corporativo
- IP
- fingerprint
- device ID
- geolocalização

A aplicação também não deverá registrar conteúdo integral da denúncia, contato ou headers sensíveis em logs de runtime.

A chave de acompanhamento será mostrada ao manifestante somente no momento adequado e será armazenada apenas em forma de hash.

## Identidade confidencial

Dados voluntariamente fornecidos deverão ficar separados da tabela principal da manifestação. O acesso à identidade confidencial exigirá permissão específica e justificativa, gerando evento de auditoria.

## Status e prioridade

Status iniciais:

- `RECEIVED`
- `IN_REVIEW`
- `INVESTIGATING`
- `WAITING_REPORTER`
- `FORWARDED`
- `RESOLVED`
- `ARCHIVED`

Prioridades:

- `NORMAL`
- `HIGH`
- `CRITICAL`

Urgência e status são conceitos separados.

## Modelo de dados previsto

Tabelas da V1 completa:

- `reports`
- `report_identity`
- `report_messages`
- `report_internal_notes`
- `report_events`
- `report_attachments`
- `admin_users`
- `admin_sessions`
- `admin_permissions`
- `admin_areas`
- `areas`
- `audit_logs`

A implementação será incremental por sprint. Nenhuma tabela será criada antes da sprint que a utiliza.

## Área administrativa

Rotas previstas:

- `/admin`
- `/admin/dashboard`
- `/admin/ocorrencias`
- `/admin/ocorrencias/[id]`
- `/admin/usuarios`
- `/admin/auditoria`
- `/admin/configuracoes`

Funcionalidades progressivas:

- listar e filtrar ocorrências
- abrir e assumir ocorrência
- alterar status e prioridade
- encaminhar e atribuir responsável
- responder ao manifestante
- notas internas
- registrar contato
- finalizar ocorrência
- usuários e permissões
- auditoria

## Segurança

Requisitos globais:

- Nenhum secret no client bundle.
- Nenhuma `service_role` key do Supabase no browser.
- Validação de entrada com Zod.
- Autorização server-side em toda rota administrativa.
- Hash Argon2id para senhas.
- Token de sessão aleatório; apenas hash do token persistido.
- Cookies HttpOnly, Secure e SameSite=Lax em produção.
- Rate limiting para autenticação e endpoints públicos sensíveis.
- Não confiar em IDs recebidos do cliente para autorização.
- RLS em tabelas expostas pelo Supabase como defesa adicional.
- Auditoria para acesso à identidade e ações administrativas sensíveis.
- Logs sem conteúdo da manifestação, credenciais ou identidade confidencial.

## Sprints

0. Fundação Next.js e deploy verde.
1. Design system e formulário público sem persistência.
2. Supabase e schema inicial.
3. Envio real, protocolo e chave.
4. Master ENV e autenticação.
5. Usuários administrativos e permissões.
6. Central de ocorrências.
7. Tratamento completo da ocorrência.
8. Portal de acompanhamento anônimo.
9. Cofre de identidade confidencial.
10. Anexos.
11. Auditoria e hardening.
12. Dashboard gerencial.
13. QA end-to-end.
14. Produção final e documentação operacional.

## Sprint 0 — Critérios de aceite

A Sprint 0 deve entregar somente a fundação técnica, sem tocar no banco:

- projeto Next.js funcional
- TypeScript estrito
- lint configurado
- testes básicos configurados
- página inicial provisória identificando Forms D'Rossi / Canal de Escuta
- build local aprovado
- código versionado em branch própria
- deploy Vercel verificável após integração da branch/main

## Fora da V1 inicial

- WhatsApp API
- e-mail automático
- classificação por IA
- aplicativo mobile
- SSO corporativo
- integração com ERP
- push notifications

Esses itens só entram após o núcleo de anonimato, autenticação, auditoria e tratamento de ocorrências estar validado.
