import type { Projeto } from "./types";

// Base URL vem do ambiente (NEXT_PUBLIC_* é exposta ao browser).
// Fallback só para desenvolvimento local.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    // dados podem mudar entre requisições — não cachear no server component
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Falha ao consumir ${path}: HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

// Cliente tipado: o retorno é Projeto[]/Projeto, não `any`.
export const apiClient = {
  listProjetos(): Promise<Projeto[]> {
    return getJson<Projeto[]>("/projetos");
  },
  getProjeto(id: number): Promise<Projeto> {
    return getJson<Projeto>(`/projetos/${id}`);
  },
};
