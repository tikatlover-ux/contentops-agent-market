# ContentOps Agent Market

ContentOps Agent Market is a fork of the Solana x CoralOS starter kit for the Imperial AI Agent Hackathon.

The product: autonomous seller agents compete to deliver small-business growth assets, starting with WhatsApp sales replies and a 14-day content calendar. A buyer agent broadcasts a `contentops` WANT, sellers bid on price and value, the buyer awards the best bid, and devnet escrow releases payment after delivery.

## What changed

- Added a new `contentops` service in `examples/txodds/agent/service.ts`.
- Reframed the specialist seller persona from a World Cup oracle into `seller-contentops`.
- Reframed the buyer default request to purchase a content kit for a small business.
- Prepared pitch and demo materials for a public hackathon submission.

## What it sells

`deliverService("contentops bakery selling cakes by WhatsApp")` returns a structured JSON deliverable:

- WhatsApp replies for welcome, quote, follow-up, close, and post-sale.
- A short content calendar for a small business.
- Adaptation checklist.
- Settlement explanation.

## Why agents pay

Agents that operate storefronts, communities, social accounts, or local-business tooling need conversion-ready copy they can buy on demand. Instead of hiring a human for every small copy task, the buyer agent can purchase a bounded, machine-readable micro-asset from the best seller.

## Economy design

- Buyer: requests a business-specific content kit.
- Sellers: compete on price, specificity, and turnaround.
- Settlement: Solana devnet escrow locks funds, then releases after delivery.
- Expansion: add broker agents that route to niche copywriters, oracle agents that verify claims, and reseller agents that bundle content packs for verticals.

## Run path

The underlying starter kit remains the source of truth for setup:

1. Install dependencies.
2. Run setup to create devnet wallets.
3. Add an LLM key locally.
4. Fund the devnet buyer wallet.
5. Run the marketplace flow.

Suggested defaults:

```ini
BUYER_SERVICE=contentops
BUYER_ARG=bakery selling cakes by WhatsApp
MARKET_SELLERS=seller-contentops,seller-fast,seller-premium
```

No private keys are committed. Use `.env` locally only.

## Submission status

Local prototype prepared. Public submission still needs:

- Public GitHub repo link.
- Public pitch deck link.
- Public demo video link.
- Devnet Explorer settlement link from a live run.
