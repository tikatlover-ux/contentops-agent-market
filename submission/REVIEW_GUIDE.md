# Reviewer guide

This guide lets a reviewer validate the ContentOps Agent Market submission quickly.

## What to review first

1. Repo: https://github.com/tikatlover-ux/contentops-agent-market
2. Pitch deck: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/submission/contentops_agent_market_pitch_deck.pdf
3. Demo video: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/submission/contentops_agent_market_demo.mp4
4. CI run: https://github.com/tikatlover-ux/contentops-agent-market/actions/runs/28626699176
5. ContentOps CI job: https://github.com/tikatlover-ux/contentops-agent-market/actions/runs/28626699176/job/84894683803
6. Evaluation matrix: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/submission/EVALUATION_MATRIX.md

## What changed

The fork adds a `contentops` seller service to the Solana x CoralOS starter kit.

Buyer agents can request a small-business content kit, seller agents compete, and the winning seller returns a JSON deliverable that can be consumed by another agent or a human operator.

Example request:

```text
contentops bakery selling cakes by WhatsApp
```

Example deliverable includes:

- WhatsApp reply templates.
- A short content calendar.
- An adaptation checklist.
- Settlement notes for the Solana devnet escrow flow.

## Five-minute validation

The public CI already runs these checks on `main`:

- Agent runtime typecheck and tests.
- TxODDS demo typecheck and tests.
- ContentOps seller-agent typecheck and tests.
- Escrow and arbiter Rust compile check.

Local validation for the ContentOps seller agent:

```sh
cd coral-agents/seller-agent
npm install --package-lock=false --ignore-scripts
npm run typecheck
npm test
npm run demo:contentops -- "bakery selling cakes by WhatsApp"
```

Expected seller-agent test result:

```text
5 test files passed
17 tests passed
```

The ContentOps behavior is covered in:

```text
coral-agents/seller-agent/src/service.test.ts
```

The reproducible demo command prints a JSON content kit with WhatsApp replies, a short content calendar, an adaptation checklist, and settlement notes.

## Safety and payout notes

- The repo contains no private keys, seed phrases, or mainnet funds.
- Settlement examples use Solana devnet.
- The supplied payout destination is a public EVM address only:

```text
0x6046ccB9F684Ca3dDA976AF90479219424e1190D
```

## Why it fits the bounty

ContentOps Agent Market demonstrates an agent economy primitive:

- A buyer agent can express demand.
- Seller agents can bid on price and quality.
- A seller can deliver a bounded digital product.
- The escrow spine can settle accepted delivery.
- CI proves the service path and tests are reproducible.
