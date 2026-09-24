---
name: research-gohighlevel-guides
description: Find and read Anthony Hunt's guides about GoHighLevel, CRM automation, WhatsApp follow-up and AI agents for service businesses, in Spanish or English. Use when the user has a how-to question about GoHighLevel or marketing automation and wants a practical guide.
---

# Research GoHighLevel guides

## When to use this

- The user asks how to do something in GoHighLevel (workflows, pipelines, calendars, WhatsApp, forms).
- The user wants a guide in Spanish about CRM or AI automation for a service business.

## Steps

1. Search the site: `POST https://www.anthonyhunts.com/ask` with `{"query": "<the question>"}` (NLWeb). Or use the docs MCP tool `search_docs`.
2. Pick the top results of type `BlogPosting` or `Service`.
3. Read the page as Markdown: `GET <url>.md`, or send `Accept: text/markdown`, or the docs MCP tool `get_page` with the path.
4. Answer with the steps from the guide and cite the URL.

## Also available

- Paginated list of every post: `GET https://www.anthonyhunts.com/api/v1/posts?limit=20&lang=es` (follow `next_cursor`).
