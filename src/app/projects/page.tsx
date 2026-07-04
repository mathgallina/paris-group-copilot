import { apiClient } from "@/lib/api/client";
import { ProjectList } from "@/components/projects/ProjectList";
import type { Projeto } from "@/lib/api/types";

export default async function ProjectsPage() {
  let projetos: Projeto[] = [];
  let erro: string | null = null;

  try {
    projetos = await apiClient.listProjetos();
  } catch {
    erro = "Não foi possível carregar os projetos. A API está no ar?";
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "800px" }}>
      <h1>Projetos</h1>
      <p>Projetos do Paris Group Copilot, carregados do endpoint GET /projetos da API.</p>
      {erro ? <p style={{ color: "#b45309" }}>{erro}</p> : <ProjectList projetos={projetos} />}
    </main>
  );
}
