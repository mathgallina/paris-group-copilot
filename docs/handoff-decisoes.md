# Handoff — Feature Decisões Técnicas

## 1. Contexto

Esta feature adiciona uma página no frontend Next.js para listar as decisões técnicas do projeto Paris Group Copilot.

O objetivo do ciclo foi criar o scaffold da rota `/decisoes` reaproveitando as decisões já documentadas no `docs/handoff.md`, sem tocar em backend, API ou banco.

## 2. O que foi feito

- Criada a rota Next.js em `src/app/decisoes/page.tsx`.
- A rota abre em http://localhost:3000/decisoes.
- A página exibe um resumo no topo: "4 decisões técnicas registradas".
- As decisões são renderizadas em cards (lista simples), cada um com:
  - `titulo`
  - `status`
  - `descricao`
- As 4 decisões técnicas reais foram carregadas de um array local no próprio `page.tsx`:
  - Biblioteca de acesso ao PostgreSQL
  - Migrações com Alembic
  - Endpoints GET /projetos e GET /hipoteses
  - Supabase vs PostgreSQL puro
- Status possíveis tipados: `pendente`, `decidida`, `revisada`. Todas as 4 decisões estão como `pendente`, coerente com a seção "Decisões Pendentes" do handoff principal.
- Ajuste de contraste: a descrição usa `color: var(--foreground)`, que herda a cor do tema. Isso corrige a legibilidade no modo escuro (antes usava um cinza fixo que ficava invisível sobre o fundo escuro).

## 3. Validação

- `npm run build` passou, com a rota `/decisoes` gerada como página estática.
- Validação visual no navegador (light e dark mode): os 4 cards aparecem, o resumo é exibido e o texto está legível nos dois temas.
- Nenhum arquivo de backend, API (`api/`) ou banco foi alterado neste ciclo.

## 4. Decisões deste ciclo

- Manter os dados em um array local no `page.tsx`, sem backend, apenas para o scaffold da tela.
- Reaproveitar as decisões reais do `docs/handoff.md` em vez de inventar conteúdo novo.
- Usar `var(--foreground)` em vez de cor fixa para garantir contraste em light e dark mode.

## 5. Próxima Ação

Responsável: Matheus.

Próximo passo:

Ligar a página `/decisoes` a uma fonte de dados real quando os endpoints de listagem existirem, em vez do array local.

Critérios de aceitação para a evolução:

- A página consome as decisões de um endpoint real (ex.: `GET /decisoes`) quando ele existir.
- Os campos `titulo`, `status` e `descricao` continuam presentes.
- O contraste continua adequado em light e dark mode.
- Nenhum segredo real entra no Git.

## 6. Fora de Escopo deste Ciclo

- Não foi criado backend novo.
- Não foi alterada a API existente.
- Não foi criado banco.

## 7. Status de Commit

Após a revisão visual (light/dark) e o build passar, a feature foi commitada e enviada:

- Commit: `7b3b1d3` — "feat: adiciona página de decisões técnicas"
- Branch: `main` (push feito para origin)
- O scaffold **não** foi commitado antes da revisão humana (conforme o prompt), só depois de validado no navegador.

## 8. Scaffold com Claude Code — Prompt e o que foi Aceito/Rejeitado

Prompt usado com o agente (Claude Code) para gerar a página, com critérios de aceitação explícitos:

> Objetivo: criar uma página /decisoes no frontend Next.js para listar decisões técnicas do Paris Group Copilot.
> Escopo: (1) registrar tarefas no Tasknotes; (2) criar o scaffold da rota /decisoes; (3) não commitar ainda — revisar antes.
> Critérios: rota em src/app/decisoes/page.tsx abrindo em localhost:3000/decisoes; listar decisões em cards; cada uma com titulo, status, descricao; usar as 4 decisões reais do handoff; status possíveis pendente/decidida/revisada; array local no page.tsx por enquanto; sem backend, sem alterar API, sem banco; rodar npm run build no fim e mostrar o resultado.

O que aceitei do scaffold gerado:
- A rota /decisoes no frontend, com array local no page.tsx.
- A listagem das 4 decisões técnicas reais do handoff principal.
- A tipagem `DecisaoStatus` (pendente/decidida/revisada).
- O ajuste de contraste com `var(--foreground)`.
- Manter a feature sem backend, API ou banco neste ciclo.

O que rejeitei ou limitei:
- Rejeitei o texto de descrição com cor cinza fixa — ficava ilegível no dark mode (troquei por `var(--foreground)`).
- Rejeitei criar backend novo para decisões neste ciclo.
- Rejeitei criar persistência no banco agora.
- Rejeitei commitar antes da validação visual.
- Limitei o escopo a uma página simples e verificável.
