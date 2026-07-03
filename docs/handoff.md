# Handoff — Paris Group Copilot

## 1. Contexto

O repositório Paris Group Copilot já tem a base do produto criada.

Está feito:

- Frontend Next.js rodando em http://localhost:3000
- Rotas /projeto e /hipotese criadas
- Backend FastAPI criado em api/
- PostgreSQL configurado no docker-compose.yml
- API rodando em http://localhost:8000
- OpenAPI disponível em http://localhost:8000/docs
- Endpoints criados:
  - GET /health
  - POST /projetos
  - POST /hipoteses
- Schemas Pydantic criados para request e response
- .env real fora do Git
- .env.example versionado
- docs/enquadramento.md criado
- docs/arquitetura.md criado
- README.md com link para o enquadramento

O que está em andamento:

- Evoluir a API para persistir projetos e hipóteses no PostgreSQL.
- Criar frontend consumindo os endpoints reais.
- Criar testes para caminho feliz e falhas.

Risco atual:

Hoje os dados ainda ficam em memória na API. Isso é suficiente para validar contrato OpenAPI, mas não serve para continuidade real do produto. Se a API reiniciar, os dados somem.

## 2. Decisões

Decidimos manter a stack padrão do studio:

- Next.js no frontend
- FastAPI no backend
- PostgreSQL como banco principal
- Docker Compose para ambiente local
- OpenAPI como contrato entre frontend e backend

Também decidimos que, no MVP inicial, os endpoints poderiam salvar em memória apenas para validar o contrato. A próxima evolução é persistir no PostgreSQL.

Decisão importante de segurança:

- Não versionar .env real.
- Versionar apenas .env.example.
- Toda variável nova precisa ser documentada no .env.example.

Decisão de produto:

- O foco do Copilot continua sendo transformar uma ideia solta em enquadramento claro, hipótese de valor e plano mínimo de MVP.
- Não criar features fora do enquadramento sem revisão humana.

## 3. Decisões Pendentes

### Decisão técnica — biblioteca de acesso ao PostgreSQL

Ainda falta decidir qual biblioteca será usada para a API FastAPI conversar com o PostgreSQL.

Opções possíveis:

- SQLAlchemy
- SQLModel
- psycopg direto

Essa decisão bloqueia o próximo ciclo porque a forma de criar conexão, modelos, queries e testes depende da biblioteca escolhida. Para manter o MVP simples, a escolha inicial sugerida é SQLModel ou SQLAlchemy, por serem padrões conhecidos no ecossistema FastAPI.

### Decisão técnica — migrações de banco

Ainda falta decidir se o projeto já vai usar Alembic para migrações desde agora ou se as tabelas serão criadas de forma mais simples no primeiro MVP.

Essa decisão importa porque, se o banco começar a evoluir sem controle de migração, cada mudança de tabela pode virar retrabalho depois. Para um studio, o ideal é definir cedo um padrão reutilizável.

### Decisão de produto — endpoints de listagem

Ainda falta decidir se os endpoints GET /projetos e GET /hipoteses entram neste ciclo ou no próximo.

Isso bloqueia o frontend porque, para a tela /projeto listar dados reais salvos no banco, o frontend precisa consumir endpoints de listagem. Se este ciclo focar apenas em POST, o painel ainda não conseguirá exibir os dados persistidos.

### Decisão de infraestrutura — banco de dados do MVP

Ainda falta decidir entre **Supabase** (PostgreSQL gerenciado, com auth e API prontas) e um **PostgreSQL gerenciado simples** (ex.: Railway) para o banco do MVP.

Essa decisão bloqueia o deploy porque muda a `DATABASE_URL`, o modelo de auth e o custo. Supabase acelera se precisarmos de auth logo; PostgreSQL puro é mais simples e neutro se quisermos controlar tudo pela própria API.

## 4. Próxima Ação

Responsável: Matheus.

Próximo passo:

Implementar persistência real no PostgreSQL para os endpoints POST /projetos e POST /hipoteses.

Critérios de aceitação:

- POST /projetos salva no PostgreSQL.
- POST /hipoteses salva no PostgreSQL.
- A API continua expondo contrato OpenAPI em /docs.
- GET /health continua retornando {"status":"ok"}.
- docker compose up --build sobe API e banco sem erro.
- .env.example continua documentado.
- Nenhum segredo real entra no Git.

Próximos passos (responsável: ação até quando):

- Matheus: implementar persistência no PostgreSQL para POST /projetos e POST /hipoteses até o próximo ciclo.
- Rafael: implementar o endpoint /hypothesis (contrato OpenAPI + schema) seguindo o padrão da stack reutilizável.
- Marina: revisar o PR template e adicionar critérios de aceite à Definição de Pronto.

Depois disso, o próximo ciclo será criar o frontend para consumir esses endpoints.
