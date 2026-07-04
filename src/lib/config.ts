// Validação de configuração síncrona, executada na importação (antes do primeiro render).
// Em produção: variável obrigatória ausente => erro descritivo (falha rápido).
// Em desenvolvimento: usa fallback e apenas avisa no console.

interface AppConfig {
  apiUrl: string;
  databaseUrl: string;
  redisUrl: string;
}

const isProduction = process.env.NODE_ENV === "production";

// Fallbacks só valem em desenvolvimento.
const devFallbacks: Record<keyof AppConfig, string> = {
  apiUrl: "http://localhost:8000",
  databaseUrl: "postgresql://copilot:copilot@localhost:5432/copilot",
  redisUrl: "redis://localhost:6379",
};

function readVar(name: string, key: keyof AppConfig): string {
  const value = process.env[name];

  if (value && value.length > 0) {
    return value;
  }

  if (isProduction) {
    // Falha rápido e explícito — nunca sobe em produção sem config obrigatória.
    throw new Error(
      `[config] Variável de ambiente obrigatória ausente em produção: ${name}. ` +
        `Defina ${name} antes de iniciar a aplicação.`,
    );
  }

  console.warn(
    `[config] ${name} não definida — usando fallback de desenvolvimento. ` +
      `Não use este fallback em produção.`,
  );
  return devFallbacks[key];
}

export const config: AppConfig = {
  apiUrl: readVar("NEXT_PUBLIC_API_URL", "apiUrl"),
  databaseUrl: readVar("DATABASE_URL", "databaseUrl"),
  redisUrl: readVar("REDIS_URL", "redisUrl"),
};
