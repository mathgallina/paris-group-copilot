import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { ProjectList } from "@/components/projects/ProjectList";
import { AppLayout } from "@/components/layouts/AppLayout";
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
    <AppLayout>
      <h1>Projetos</h1>
      <p>Projetos do Paris Group Copilot, carregados do endpoint GET /projetos da API.</p>
      {erro ? (
        <p style={{ color: "#b45309" }}>{erro}</p>
      ) : (
        <ul style={{ padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          {projetos.map((projeto) => (
            <Link
              key={projeto.id}
              href={`/projects/${projeto.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ProjectList projetos={[projeto]} />
            </Link>
          ))}
          {projetos.length === 0 && <ProjectList projetos={[]} />}
        </ul>
      )}
    </AppLayout>
  );
}
