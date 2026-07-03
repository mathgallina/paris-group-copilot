from typing import List
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="Paris Group Copilot API",
    description="API do Copilot para enquadramento de problemas, projetos e hipóteses de valor.",
    version="0.1.0",
)

class ProjetoCreate(BaseModel):
    nome: str = Field(..., examples=["Detector de Churn Palmasnet"])
    contexto: str = Field(..., examples=["Gestores de provedor precisam identificar clientes com risco de cancelamento."])
    publico_alvo: str = Field(..., examples=["Gestores e times de retenção de ISPs"])
    dor_usuario: str = Field(..., examples=["O time perde tempo reagindo ao cancelamento depois que o cliente já decidiu sair."])

class ProjetoResponse(ProjetoCreate):
    id: int
    status: str = "rascunho"

class HipoteseCreate(BaseModel):
    projeto_id: int = Field(..., examples=[1])
    statement: str = Field(..., examples=["Se a IA listar clientes com maior risco de churn, então o time de retenção conseguirá agir antes do cancelamento."])
    success_metric: str = Field(..., examples=["Reduzir churn em 20% no grupo tratado em comparação com o grupo de controle."])
    acceptance_criteria: str = Field(..., examples=["70% dos clientes marcados como risco recebem ação de retenção em até 48 horas."])

class HipoteseResponse(HipoteseCreate):
    id: int
    status: str = "em_validacao"

projetos: List[ProjetoResponse] = []
hipoteses: List[HipoteseResponse] = []

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/projetos", response_model=ProjetoResponse)
def criar_projeto(payload: ProjetoCreate):
    projeto = ProjetoResponse(id=len(projetos) + 1, **payload.model_dump())
    projetos.append(projeto)
    return projeto

@app.post("/hipoteses", response_model=HipoteseResponse)
def criar_hipotese(payload: HipoteseCreate):
    hipotese = HipoteseResponse(id=len(hipoteses) + 1, **payload.model_dump())
    hipoteses.append(hipotese)
    return hipotese
