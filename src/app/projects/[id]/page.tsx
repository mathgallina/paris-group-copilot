import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { AppLayout } from "@/components/layouts/AppLayout";
import type { Projeto } from "@/lib/api/types";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  let projeto: Projeto | null = null;
  let erro: string | null = null;

  try {
    projeto = await apiClient.getProjeto(Number(id));
  } catch {
    erro = "Projeto não encontrado ou API indisponível.";
  }

  return (
    <AppLayout>
      <Link href="/projects" style={{ color: "var(--foreground)" }}>
        ← Voltar para projetos
      </Link>
      {erro || !projeto ? (
        <p style={{ color: "#b45309" }}>{erro ?? "Projeto não encontrado."}</p>
      ) : (
        <>
          <h1>{projeto.nome}</h1>
          <p><strong>Status:</strong> {projeto.status}</p>
          <p><strong>Contexto:</strong> {projeto.contexto}</p>
          <p><strong>Público-alvo:</strong> {projeto.publico_alvo}</p>
          <p><strong>Dor do usuário:</strong> {projeto.dor_usuario}</p>
        </>
      )}
    </AppLayout>
  );
}
