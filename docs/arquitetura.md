# Arquitetura — Paris Group Copilot

## Objetivo da Stack

A stack do Paris Group Copilot foi pensada para um venture studio que precisa criar vários MVPs com IA sem reinventar a base técnica a cada novo produto.

A decisão principal é separar o que muda em cada produto, que é o problema de negócio, daquilo que deve ser reaproveitado, que é a infraestrutura, o padrão de API, o banco de dados, o deploy e a documentação.

## Next.js

O Next.js fica responsável pelo frontend do produto.

Ele foi escolhido porque permite criar telas, rotas e fluxos de usuário rapidamente. Para um studio, isso importa porque vários MVPs vão precisar das mesmas peças: landing page, login, dashboard, formulários, páginas internas e componentes reutilizáveis.

A escolha pelo Next.js, e não Remix, vem principalmente do tamanho do ecossistema e da facilidade de encontrar pessoas, exemplos, bibliotecas e padrões prontos. Isso reduz o tempo de onboarding e facilita reaproveitar componentes entre produtos diferentes.

### Velocidade de MVP

O Next.js permite criar rotas e páginas rapidamente usando o App Router. Isso reduz o tempo entre ideia e primeira tela funcionando.

### Reutilização entre Produtos

Componentes de interface, layouts, formulários e padrões de navegação podem ser reaproveitados em outros MVPs do studio.

### Manutenção Simples

Por ser uma tecnologia muito usada, fica mais fácil contratar, treinar e transferir conhecimento entre projetos.

## FastAPI

O FastAPI fica responsável pelo backend e pelo contrato de API.

Ele foi escolhido porque usa Python, que é a linguagem mais comum no ecossistema de IA. Muitas bibliotecas de modelos, automação, processamento de texto, análise de dados e integração com LLMs já nascem primeiro em Python.

A escolha pelo FastAPI, e não Express, tem relação direta com IA e contrato. Além de estar no ecossistema Python, o FastAPI gera automaticamente a documentação OpenAPI. Isso vira o contrato entre backend e frontend.

Para um studio, esse contrato é essencial. O frontend sabe o que consumir, o backend sabe o que entregar e o time reduz retrabalho.

### Velocidade de MVP

Com Pydantic e FastAPI, é rápido criar endpoints com validação de entrada, resposta tipada e documentação automática.

### Reutilização entre Produtos

Schemas, padrões de endpoints, autenticação, integrações com IA e estrutura de API podem ser replicados em outros MVPs.

### Manutenção Simples

A documentação automática em /docs facilita entendimento, teste e manutenção por outras pessoas do time.

## PostgreSQL

O PostgreSQL fica responsável pela persistência dos dados.

Ele foi escolhido porque um MVP de venture studio não pode ficar preso a uma solução que só funciona no protótipo. O SQLite é simples, mas quando o produto começa a crescer, precisa de concorrência, segurança, backup, usuários simultâneos e deploy de produção.

O PostgreSQL também lida bem com dados relacionais e dados semiestruturados, como JSON. Isso é importante em produtos com IA, onde muitas vezes a resposta do modelo, o contexto usado, a versão do prompt e os metadados precisam ser armazenados.

### Velocidade de MVP

Com Docker Compose, o banco sobe junto com a API sem configuração manual pesada.

### Reutilização entre Produtos

O mesmo padrão de banco pode ser usado em vários MVPs, com migrations, modelos e boas práticas parecidas.

### Manutenção Simples

PostgreSQL é maduro, conhecido e pronto para produção. Isso evita retrabalho quando o MVP deixa de ser apenas teste.

## Docker Compose

O Docker Compose organiza a execução local da stack.

Ele permite subir backend e banco com um único comando. Para um studio, isso é importante porque reduz diferença entre máquinas, evita configuração manual e facilita que qualquer pessoa do time rode o projeto.

### Velocidade de MVP

Um comando sobe a infraestrutura básica.

### Reutilização entre Produtos

O mesmo modelo de compose pode ser copiado para novos MVPs.

### Manutenção Simples

Ambiente padronizado reduz erro de instalação e facilita depuração.

## Variáveis de Ambiente

Segredos não entram no Git.

O repositório mantém apenas o .env.example como modelo. Senhas reais, tokens, chaves de API e URLs sensíveis ficam fora do versionamento.

Isso evita vazamento de credenciais e mantém o padrão seguro para todos os MVPs do studio.

## Contrato OpenAPI

O contrato OpenAPI em /docs é uma peça central da arquitetura.

Ele evita que frontend e backend trabalhem no escuro. Cada endpoint tem entrada, saída e tipos definidos. Isso reduz desalinhamento, retrabalho e bugs de integração.

No Paris Group Copilot, os primeiros contratos são:

- POST /projetos
- POST /hipoteses

Esses endpoints representam o coração do produto: transformar uma ideia em projeto e uma hipótese mensurável.
