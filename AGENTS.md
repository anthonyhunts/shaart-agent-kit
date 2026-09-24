# AGENTS.md — working with the SHAART Agency public API

Rules for AI coding agents (Claude Code, Cursor, Codex, Windsurf, Copilot) that integrate with Anthony Hunt · SHAART Agency.

## What exists

| Surface | URL | Notes |
|---|---|---|
| JSON API v1 | `https://www.anthonyhunts.com/api/v1` | Read-only. `pricing`, `capabilities`, `contact`, `posts`, `POST batch` |
| OpenAPI 3.1 | `https://www.anthonyhunts.com/openapi.json` | Source of truth for request and response shapes |
| MCP (product) | `https://www.anthonyhunts.com/api/mcp` | Streamable HTTP. `get_pricing`, `list_services`, `get_contact_options`, `list_posts` |
| MCP (docs) | `https://www.anthonyhunts.com/api/mcp/docs` | Streamable HTTP. `search_docs`, `get_page` |
| NLWeb | `https://www.anthonyhunts.com/ask` | `POST {"query": "..."}`; `"streaming": true` for SSE |
| Markdown | any page + `Accept: text/markdown` or `.md` | Same URL as the HTML page |
| Human docs | `https://www.anthonyhunts.com/developers` | |

## Rules

1. **No authentication.** Do not add API keys, OAuth or headers other than `Accept`.
2. **Read-only.** Write methods return `405 method_not_allowed`. Never try to book, pay or submit forms through the API; hand the user `https://www.anthonyhunts.com/agenda`.
3. **Prices come from the API.** Never hardcode or estimate prices. Read `/api/v1/pricing` at runtime.
4. **Errors are RFC 9457.** Branch on `code` (`not_found`, `plan_not_found`, `invalid_limit`, `invalid_cursor`, `invalid_lang`, `invalid_batch`, `method_not_allowed`), not on the message text.
5. **Paginate with the cursor.** Pass `next_cursor` as `cursor` until it is `null`. Do not compute offsets yourself.
6. **Batch reads.** Up to 20 GET paths in one `POST /api/v1/batch` with `{"requests":[{"id":"a","path":"/api/v1/pricing"}]}`.
7. **Version pinning.** Use `/api/v1`. Breaking changes ship as `/api/v2` with `Deprecation` and `Sunset` headers at least 6 months ahead.
8. **Cache politely.** Responses carry `Cache-Control: max-age=300`. Do not poll faster than that.

## Quick test

```bash
curl -s https://www.anthonyhunts.com/api/v1/pricing?plan=consultoria
curl -s -X POST https://www.anthonyhunts.com/ask -H 'content-type: application/json' -d '{"query":"automatizar WhatsApp"}'
```
