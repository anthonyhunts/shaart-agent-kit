---
name: gohighlevel-pricing-lookup
description: Look up the current public prices of SHAART Agency plans and add-ons (GoHighLevel setup, consultations, AI workshop, WhatsApp automation) and compare them for the user. Use when the user asks how much a GoHighLevel setup, a consultation or an AI workshop with Anthony Hunt costs.
---

# SHAART Agency pricing lookup

## When to use this

- The user asks "how much does it cost" for any SHAART Agency / Anthony Hunt service.
- The user wants to compare plans or know what a plan includes and excludes.

## Steps

1. Call `GET https://www.anthonyhunts.com/api/v1/pricing`. To get one plan, add `?plan=<id>` (ids: `consultoria`, `consultoria-avanzada`, `digitalizate-basico`, `taller-cerebro-digital`, `addon-whatsapp`, `addon-gbp`, `addon-ads`).
2. Report `one_time` and `monthly` in USD exactly as returned, plus `includes` and `excludes`.
3. If the need is not covered by a listed plan, say it is quoted after a free 15-minute call at `https://www.anthonyhunts.com/agenda`. Do not estimate a price.

## Notes

- Messaging usage on GoHighLevel (email, SMS, WhatsApp) is billed separately and is never included.
- Errors come as `application/problem+json`; `plan_not_found` lists the valid ids.
- Human-readable version: `https://www.anthonyhunts.com/pricing.md`.
