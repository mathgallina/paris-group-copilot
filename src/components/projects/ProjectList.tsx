import type { Projeto } from "@/lib/api/types";
import { ProjectCard } from "./ProjectCard";

export interface ProjectListProps {
  projetos: Projeto[];
}

export function ProjectList({ projetos }: ProjectListProps) {
  if (projetos.length === 0) {
    return <p>Nenhum projeto cadastrado ainda.</p>;
  }

  return (
    <ul
      style={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {projetos.map((projeto) => (
        <ProjectCard key={projeto.id} projeto={projeto} />
      ))}
    </ul>
  );
}
