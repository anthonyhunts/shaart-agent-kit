# anthony-hunt

Official CLI of **Anthony Hunt** — GoHighLevel expert, AI automation and digital marketing for service businesses in Puerto Rico and the United States. Founder of [SHAART Agency](https://www.anthonyhunts.com).

```bash
npx anthony-hunt
```

| Command | What it shows |
|---|---|
| `npx anthony-hunt` | Who Anthony Hunt is and how to reach him |
| `npx anthony-hunt pricing` | Public plans and prices in USD |
| `npx anthony-hunt services` | Services offered |
| `npx anthony-hunt ask "automatizar whatsapp"` | Guides about GoHighLevel and AI automation |
| `npx anthony-hunt book` | Link to book a free 15-minute call |
| `npx anthony-hunt links` | Website and social profiles |

## As a library

```js
import client, { profile } from "anthony-hunt";
const { plans } = await client.pricing();
console.log(profile.booking);
```

Built on [`shaart-agency`](https://www.npmjs.com/package/shaart-agency). Read-only, no API key.

## For AI agents

- MCP servers: `https://www.anthonyhunts.com/api/mcp` and `/api/mcp/docs` (official MCP Registry: `com.anthonyhunts/shaart-agency`)
- Skills: `npx skills add anthonyhunts/shaart-agent-kit`
- Docs: https://www.anthonyhunts.com/developers

## Links

[Website](https://www.anthonyhunts.com) · [Book a call](https://www.anthonyhunts.com/agenda) · [Instagram](https://www.instagram.com/anthonyhunt.s) · [TikTok](https://www.tiktok.com/@anthonyhunt.s) · [YouTube](https://www.youtube.com/@Anthonyhunt.s) · [LinkedIn](https://www.linkedin.com/in/anthonyhunts)

MIT
