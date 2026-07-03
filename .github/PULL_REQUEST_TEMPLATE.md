## O que muda
<!-- Descreva objetivamente o que foi alterado e por quê -->

## Como testar
<!-- Passos para o revisor reproduzir e verificar a mudança -->
1. `docker compose up --build`
2. Acesse `http://localhost:8000/docs` e verifique os endpoints
3. `curl http://localhost:8000/health` deve retornar `{"status":"ok"}`

## Issue relacionada
Fecha #

## Checklist
- [ ] Testes passando
- [ ] Sem segredos no código (`.env` fora do Git, variáveis em `.env.example`)
- [ ] README atualizado se necessário
- [ ] Critério de aceitação da Issue atendido
- [ ] Casos de falha considerados (timeout, resposta inesperada, erro de validação)
- [ ] Contrato de API/OpenAPI atualizado, se endpoint mudou
