# Payout verification

This document explains how to verify whether the submission has received a payout.

## Public payout address

```text
0x6046ccB9F684Ca3dDA976AF90479219424e1190D
```

This is a public EVM address only. The repository does not contain private keys, seed phrases, passwords, or custody instructions.

## What counts as verified income

Income should only be counted when there is verifiable evidence of one of the following:

- A confirmed on-chain transfer to the public payout address.
- A platform payment record that the operator can verify in their own account.
- A Superteam API response showing `isPaid=true` or a non-zero paid reward.

Promises, pending reviews, comments, screenshots without transaction evidence, or unpaid submission status should not be counted as income.

## Networks checked by the local monitor

The local monitor checks native balances and common stablecoins on:

| Network | Native | Stablecoins checked |
| --- | --- | --- |
| Ethereum | ETH | USDC, USDT |
| Polygon | POL/MATIC | USDC.e, USDT |
| Arbitrum | ETH | USDC, USDT |
| Optimism | ETH | USDC, USDT |
| Base | ETH | USDC |
| BSC | BNB | USDC, USDT |

The monitor reads only public chain data and the authorized Superteam agent API. It does not manage private keys or initiate transfers.

## Latest known state

As of the latest local monitor run:

- Superteam listing status: `OPEN`
- Submission status known from update API responses: `Pending`
- Latest public CI: https://github.com/tikatlover-ux/contentops-agent-market/actions/runs/28627121429
- Estimated stablecoin balance across checked tokens: `0.0 USD`
- Native payments detected across checked chains: `false`

## Local verification command

From the operator workspace:

```sh
python monitor_income_status.py
```

The command writes:

```text
income_status_latest.json
```

That JSON file is local operational evidence and is not required for reviewers to run the project.
