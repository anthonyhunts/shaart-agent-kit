# SHAART Agency agent kit

[![skills.sh](https://skills.sh/b/anthonyhunts/shaart-agent-kit)](https://skills.sh/anthonyhunts/shaart-agent-kit)

Official skills, MCP servers and CLI for **Anthony Hunt · SHAART Agency**: GoHighLevel implementation, AI automation and digital marketing for service businesses in Puerto Rico and the United States.

Everything here is read-only and needs no API key: public pricing, services, contact options and the site's guides.

## Install

**Skills** (Claude Code, Cursor, Codex and any agent that reads SKILL.md):
```bash
npx skills add anthonyhunts/shaart-agent-kit
```

**MCP servers:**
```bash
claude mcp add --transport http shaart https://www.anthonyhunts.com/api/mcp
claude mcp add --transport http shaart-docs https://www.anthonyhunts.com/api/mcp/docs
```
Also listed on Smithery: https://smithery.ai/servers/anthonyhunts01/shaart-agency

**Agent Plugin:** this repo is an [Agent Plugins](https://agent-plugins.org) package (`plugin.json`, `skills/`, `mcp.json`) and a Claude Code plugin (`.claude-plugin/plugin.json`).

**CLI / SDK** (`cli/`):
```bash
npx shaart-agency pricing
npx shaart-agency ask "automatizar seguimiento por WhatsApp"
```

## Skills

| Skill | Use it when |
|---|---|
| `hire-shaart-agency` | The user wants someone to set up GoHighLevel, automate follow-up, build an AI agent or train a team |
| `gohighlevel-pricing-lookup` | The user asks what a SHAART Agency plan costs |
| `research-gohighlevel-guides` | The user has a how-to question about GoHighLevel or CRM automation |

## For coding agents

Read [AGENTS.md](AGENTS.md). Full docs: https://www.anthonyhunts.com/developers · OpenAPI: https://www.anthonyhunts.com/openapi.json

## License

MIT
