type DecisaoStatus = "pendente" | "decidida" | "revisada";

type Decisao = {
  titulo: string;
  status: DecisaoStatus;
  descricao: string;
};

const decisoes: Decisao[] = [
  {
    titulo: "Biblioteca de acesso ao PostgreSQL",
    status: "pendente",
    descricao:
      "Definir qual biblioteca a API FastAPI vai usar para conversar com o PostgreSQL (SQLAlchemy, SQLModel ou psycopg direto). A escolha define conexão, modelos, queries e testes. Sugestão inicial: SQLModel ou SQLAlchemy.",
  },
  {
    titulo: "Migrações com Alembic",
    status: "pendente",
    descricao:
      "Decidir se o projeto adota Alembic para migrações desde já ou cria as tabelas de forma mais simples no primeiro MVP. Sem controle de migração, cada mudança de schema vira retrabalho difícil de rastrear.",
  },
  {
    titulo: "Endpoints GET /projetos e GET /hipoteses",
    status: "pendente",
    descricao:
      "Decidir se os endpoints de listagem entram neste ciclo ou no próximo. Eles bloqueiam o frontend: sem listagem, o painel não consegue exibir os dados persistidos no banco.",
  },
  {
    titulo: "Supabase vs PostgreSQL puro",
    status: "pendente",
    descricao:
      "Escolher entre Supabase (PostgreSQL gerenciado, com auth e API prontas) e um PostgreSQL gerenciado simples (ex.: Railway) para o MVP. Muda a DATABASE_URL, o modelo de auth e o custo.",
  },
];

const statusColors: Record<DecisaoStatus, string> = {
  pendente: "#b45309",
  decidida: "#15803d",
  revisada: "#1d4ed8",
};

export default function DecisoesPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "800px" }}>
      <h1>Decisões Técnicas</h1>
      <p>Registro das decisões técnicas do projeto Paris Group Copilot.</p>
      <p style={{ fontWeight: 600 }}>{decisoes.length} decisões técnicas registradas</p>

      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
        {decisoes.map((decisao) => (
          <li
            key={decisao.titulo}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
              <h2 style={{ margin: 0, fontSize: "18px" }}>{decisao.titulo}</h2>
              <span
                style={{
                  backgroundColor: statusColors[decisao.status],
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                {decisao.status}
              </span>
            </div>
            <p style={{ marginBottom: 0, color: "var(--foreground)" }}>{decisao.descricao}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
