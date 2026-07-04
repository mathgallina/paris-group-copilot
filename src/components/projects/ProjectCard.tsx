import type { Projeto } from "@/lib/api/types";

export interface ProjectCardProps {
  projeto: Projeto;
}

const statusLabel: Record<Projeto["status"], string> = {
  rascunho: "Rascunho",
  em_validacao: "Em validação",
  validado: "Validado",
};

export function ProjectCard({ projeto }: ProjectCardProps) {
  return (
    <li
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px",
        listStyle: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "18px" }}>{projeto.nome}</h2>
        <span
          style={{
            backgroundColor: "#1d4ed8",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {statusLabel[projeto.status]}
        </span>
      </div>
      <p style={{ marginBottom: 0, color: "var(--foreground)" }}>
        {projeto.contexto}
      </p>
    </li>
  );
}
