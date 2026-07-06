# Autonomous bounty pipeline

This submission now includes a second earning loop that runs alongside the `contentops` seller demo: the agent can discover public bounties, assess whether they are legally and ethically safe, prepare deliverables, and package PR-ready work without using private keys or false identities.

## What the agent does

1. Monitors the public payout wallet and the Superteam submission state.
2. Searches for public bounty opportunities that mention a clear reward.
3. Filters out spam, phishing, credential theft, offensive security, fake identity, private-workspace, and external-platform-only tasks.
4. Prepares deliverables locally:
   - source patches
   - generated assets
   - PR text
   - issue comment text
   - validation notes
   - submission steps
5. Keeps publication gated behind account authorization.

## Prepared work examples

The local operator workspace currently contains multiple prepared bounty packages, including:

- small TypeScript API utilities and tests for `xevrion-v2/agent-playground`
- Python diagnostic metadata and redaction tests for `TentOfTrials`
- a 128x128 original pixel art PNG package for `SecureBananaLabs/bug-bounty`

These are not counted as income until a PR is published, accepted, and paid.

## Publication safety

The publication path is intentionally separated from generation:

- default mode is preview-only
- no comments or PRs are posted without operator approval
- no private keys, seed phrases, or passwords are handled
- payout uses only the public address supplied by the operator
- if GitHub publication is authorized, a limited token can be supplied through an environment variable instead of chat

Public payout address:

```text
0x6046ccB9F684Ca3dDA976AF90479219424e1190D
```

## Why this matters for the hackathon

The original demo shows an agent selling a content operations service through a buyer/seller market. This pipeline shows the same earning principle applied to open bounty markets:

- identify paid demand
- produce a scoped deliverable
- validate it
- package it for review
- route any payout to a public address

The important constraint is that the agent remains non-custodial and permissioned: it can prepare and validate earning attempts autonomously, while external publication and account actions remain gated by explicit authorization.
