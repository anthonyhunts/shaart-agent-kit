#!/usr/bin/env node
// CLI de marca personal: `npx anthony-hunt`. Sin argumentos muestra el perfil;
// los comandos de datos se delegan al SDK de shaart-agency.
import { createClient, ShaartApiError } from "shaart-agency";
import { profile } from "../index.js";

const HELP = `anthony-hunt — Anthony Hunt · SHAART Agency

Usage:
  anthony-hunt                      Who is Anthony Hunt, how to reach him
  anthony-hunt links                Website, booking and social profiles
  anthony-hunt pricing [--plan id]  Public plans and prices (USD)
  anthony-hunt services             Services offered
  anthony-hunt ask "<question>"     Search guides about GoHighLevel and AI automation
  anthony-hunt book                 Link to book a free 15-minute call
  anthony-hunt help

Docs: https://www.anthonyhunts.com/developers`;

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const words = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
const [cmd, ...rest] = words;
const print = (v) => console.log(JSON.stringify(v, null, 2));
const api = createClient();

function about() {
  console.log(`
  ${profile.name}
  ${profile.title}
  Founder of ${profile.company} · ${profile.location}
  Serves Puerto Rico and the US · Spanish and English

  Done-for-you GoHighLevel, CRM and WhatsApp automation, AI agents
  that answer and book 24/7, and in-person AI training for teams.

  Website   ${profile.website}
  Book      ${profile.booking}   (free 15-minute call)
  WhatsApp  ${profile.whatsapp}
  Email     ${profile.email}

  Try: npx anthony-hunt pricing   ·   npx anthony-hunt ask "automatizar whatsapp"
`);
}

async function main() {
  switch (cmd) {
    case undefined:
    case "about":
      return about();
    case "links":
      return print({ website: profile.website, booking: profile.booking, whatsapp: profile.whatsapp, ...profile.links });
    case "book":
      return console.log(`Book a free 15-minute call with Anthony Hunt: ${profile.booking}`);
    case "pricing":
      return print(await api.pricing({ plan: flag("plan") }));
    case "services":
      return print(await api.capabilities({ tag: flag("tag") }));
    case "ask": {
      const query = rest.join(" ");
      if (!query) { console.error('Usage: anthony-hunt ask "<question>"'); process.exit(2); }
      const res = await api.ask(query, { limit: 5 });
      for (const r of res.results) console.log(`${r.name}\n  ${r.url}`);
      return;
    }
    case "help":
    case "--help":
      return console.log(HELP);
    default:
      console.error(`Unknown command: ${cmd}\n\n${HELP}`);
      process.exit(2);
  }
}

main().catch((e) => {
  if (e instanceof ShaartApiError) console.error(`Error ${e.status} ${e.code}: ${e.message}`);
  else console.error(e.message || e);
  process.exit(1);
});
