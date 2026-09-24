#!/usr/bin/env node
// CLI oficial de SHAART Agency. Uso: shaart <comando> [opciones] — ver `shaart help`.
import { createClient, ShaartApiError } from "../index.js";

const HELP = `shaart — Anthony Hunt · SHAART Agency public API (read-only, no API key)

Usage:
  shaart pricing [--plan <id>]          Plans and add-ons with prices in USD
  shaart services [--tag <tag>]         Services offered
  shaart contact [--channel <name>]     Email, phone, WhatsApp, booking link
  shaart posts [--lang es|en] [--limit N] [--cursor C]
  shaart ask "<question>" [--limit N]   Natural-language site search (NLWeb)
  shaart help

Flags:
  --json    Print raw JSON (default for pricing/services/contact)

Docs: https://www.anthonyhunts.com/developers`;

function parse(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) args[key] = true;
      else { args[key] = next; i++; }
    } else args._.push(a);
  }
  return args;
}

const print = (v) => console.log(JSON.stringify(v, null, 2));

async function main() {
  const args = parse(process.argv.slice(2));
  const [cmd, ...rest] = args._;
  const api = createClient();
  switch (cmd) {
    case "pricing":
      return print(await api.pricing({ plan: args.plan }));
    case "services":
      return print(await api.capabilities({ tag: args.tag }));
    case "contact":
      return print(await api.contact({ channel: args.channel }));
    case "posts": {
      const page = await api.posts({ lang: args.lang, limit: args.limit, cursor: args.cursor });
      if (args.json) return print(page);
      for (const p of page.data) console.log(`${p.published}  ${p.title}\n            ${p.url}`);
      if (page.next_cursor) console.log(`\nMore: shaart posts --cursor ${page.next_cursor}${args.lang ? ` --lang ${args.lang}` : ""}`);
      return;
    }
    case "ask": {
      const query = rest.join(" ");
      if (!query) { console.error('Usage: shaart ask "<question>"'); process.exit(2); }
      const res = await api.ask(query, { limit: args.limit ? Number(args.limit) : undefined });
      if (args.json) return print(res);
      for (const r of res.results) console.log(`${r.score.toFixed(2)}  ${r.name}\n      ${r.url}`);
      return;
    }
    case undefined:
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
