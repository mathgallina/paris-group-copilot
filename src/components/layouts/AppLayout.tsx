import Link from "next/link";
import type { ReactNode } from "react";

export interface AppLayoutProps {
  children: ReactNode;
}

const navItems: { href: string; label: string }[] = [
  { href: "/projects", label: "Projetos" },
  { href: "/hipotese", label: "Hipótese" },
  { href: "/decisoes", label: "Decisões" },
];

// Layout compartilhado por composição: as páginas passam seu conteúdo como children.
// Header e navegação ficam num único lugar, sem duplicação entre páginas.
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          padding: "16px 40px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <strong>Paris Group Copilot</strong>
        <nav style={{ display: "flex", gap: "20px" }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{ color: "var(--foreground)" }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <div style={{ padding: "40px", maxWidth: "800px" }}>{children}</div>
    </div>
  );
}
