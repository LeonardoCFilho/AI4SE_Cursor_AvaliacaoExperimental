/**
 * Helper para requisições HTTP com tratamento de erro padronizado (DRY).
 *
 * Decisão: Centraliza fetch + checagem res.ok + extração de mensagem de erro da API.
 * A API retorna { erro: string }; usamos body?.erro ou fallbackMessage.
 */
export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
  fallbackMessage = 'Erro na requisição'
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.erro ?? fallbackMessage;
    throw new Error(message);
  }
  return res.json();
}
