# Bounty status

## Submission

Platform: Superteam Earn

Listing: Imperial AI Agent Hackathon: Build the Agent Economy

Submission ID:

`34fedd60-e32f-46a0-9655-e88d59d43487`

Current status from API:

`Pending`

Last API update:

`2026-07-02T22:34:42.515Z`

## Public assets

- Repo: https://github.com/tikatlover-ux/contentops-agent-market
- Pitch deck: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/submission/contentops_agent_market_pitch_deck.pdf
- Demo MP4: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/submission/contentops_agent_market_demo.mp4
- Demo transcript: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/submission/demo_transcript_contentops_market.json
- Test file: https://github.com/tikatlover-ux/contentops-agent-market/blob/main/coral-agents/seller-agent/src/service.test.ts

## Validation evidence

Public CI:

- GitHub Actions CI: PASS
- Latest green run: https://github.com/tikatlover-ux/contentops-agent-market/actions/runs/28626304883
- ContentOps seller agent CI job: PASS

Local validation run:

- `pnpm run typecheck` in `coral-agents/seller-agent`: PASS
- `pnpm test` in `coral-agents/seller-agent`: PASS
- Test result: 5 test files, 17 tests

## What changed in the fork

The fork adds a `contentops` service to the seller agent. A buyer agent can ask for a small-business content kit, seller agents compete, and the winning seller delivers a JSON micro-asset.

Example request:

`contentops bakery selling cakes by WhatsApp`

Example output:

- WhatsApp sales replies
- Short content calendar
- Adaptation checklist
- Settlement explanation

## Payout destination

Public EVM wallet supplied by the operator:

`0x6046ccB9F684Ca3dDA976AF90479219424e1190D`

No private keys, seed phrases, or mainnet funds are included in this repository.

## Remaining dependency for payment

Payment depends on Superteam review, winner selection, and the platform's claim/payment flow. The current API state is not paid:

`isPaid=false`
