// SDK mínimo para la API pública de SHAART Agency. Sin dependencias (Node 18+ trae fetch).
const BASE = "https://www.anthonyhunts.com";

export class ShaartApiError extends Error {
  constructor(problem) {
    super(problem.detail || problem.title || "Request failed");
    this.name = "ShaartApiError";
    this.code = problem.code;
    this.status = problem.status;
    this.problem = problem;
  }
}

async function get(path, base = BASE) {
  const res = await fetch(base + path, { headers: { accept: "application/json" } });
  const body = await res.json();
  if (!res.ok) throw new ShaartApiError(body);
  return body;
}

export function createClient({ baseUrl = BASE } = {}) {
  const q = (params) => {
    const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")).toString();
    return s ? `?${s}` : "";
  };
  return {
    /** Planes y add-ons con precios en USD. `plan` filtra a uno. */
    pricing: ({ plan } = {}) => get(`/api/v1/pricing${q({ plan })}`, baseUrl),
    /** Servicios. `tag` filtra. */
    capabilities: ({ tag } = {}) => get(`/api/v1/capabilities${q({ tag })}`, baseUrl),
    /** Email, teléfono, WhatsApp y agenda. */
    contact: ({ channel } = {}) => get(`/api/v1/contact${q({ channel })}`, baseUrl),
    /** Una página de posts. Pasar `next_cursor` como `cursor`. */
    posts: ({ limit, cursor, lang } = {}) => get(`/api/v1/posts${q({ limit, cursor, lang })}`, baseUrl),
    /** Todos los posts, siguiendo el cursor. */
    async allPosts({ lang = "es" } = {}) {
      const out = [];
      let cursor;
      do {
        const page = await get(`/api/v1/posts${q({ limit: 100, cursor, lang })}`, baseUrl);
        out.push(...page.data);
        cursor = page.next_cursor;
      } while (cursor);
      return out;
    },
    /** Búsqueda en lenguaje natural (NLWeb /ask). */
    async ask(query, { limit } = {}) {
      const res = await fetch(`${baseUrl}/ask`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ query, limit }),
      });
      const body = await res.json();
      if (!res.ok) throw new ShaartApiError(body.error || body);
      return body;
    },
  };
}

export default createClient();
