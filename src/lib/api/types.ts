// Tipos alinhados ao contrato OpenAPI do FastAPI (api/app/main.py → ProjetoResponse).
// Fonte da verdade: http://localhost:8000/openapi.json — regenerar se o schema mudar.

export type ProjetoStatus = "rascunho" | "em_validacao" | "validado";

export interface Projeto {
  id: number;
  nome: string;
  contexto: string;
  publico_alvo: string;
  dor_usuario: string;
  status: ProjetoStatus;
}
