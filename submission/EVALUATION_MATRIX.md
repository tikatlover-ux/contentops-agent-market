# Evaluation matrix

This matrix maps the ContentOps Agent Market submission to the review evidence.

| Evaluation area | Evidence | Link |
| --- | --- | --- |
| Agent economy fit | Buyer requests a service, sellers compete, winner delivers a bounded digital asset, escrow settles accepted delivery. | `README.md`, `PITCH_DECK_CONTENTOPS_AGENT_MARKET.md` |
| New sellable agent service | `contentops` service returns a reusable JSON content kit. | `coral-agents/seller-agent/src/service.ts` |
| Reproducible demo | `npm run demo:contentops -- "bakery selling cakes by WhatsApp"` prints the delivered JSON micro-asset. | `coral-agents/seller-agent/src/demo-contentops.ts` |
| Automated validation | CI runs runtime checks, TxODDS checks, ContentOps seller-agent typecheck/tests/demo, and escrow Rust compile check. | https://github.com/tikatlover-ux/contentops-agent-market/actions/runs/28626699176 |
| ContentOps tests | Seller-agent tests cover supported services, no external fetch for ContentOps, TxLINE fallback, and unsupported service behavior. | `coral-agents/seller-agent/src/service.test.ts` |
| Safety posture | No private keys, seed phrases, or mainnet funds in repo; payout destination is public address only. | `submission/REVIEW_GUIDE.md`, `.gitignore` |
| Judge path | Reviewer can inspect pitch, video, guide, demo command, and CI in under five minutes. | `submission/REVIEW_GUIDE.md` |

## Why this is payment-ready

The project demonstrates a concrete microservice an agent can sell, keeps settlement on devnet for safety, and exposes enough CI evidence for a reviewer to validate the service without trusting local screenshots.
