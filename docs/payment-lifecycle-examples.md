# Payment lifecycle examples

These examples use the server's testnet profile. Replace the bearer token with
a short-lived development credential and use only testnet wallets. Never put a
secret key, seed phrase, signed transaction, or production identifier in a
request example.

## Create a payment request

```sh
curl -X POST "$VELA_API/v1/payment-requests" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"type":"payment-request","version":1,"recipient":"G...","asset":"USDC","amount":"10.00","timestamp":"2026-05-29T12:00:00.000Z","expiresAt":"2026-05-29T12:15:00.000Z"}'
```

The response contains a request ID and expiry. The receiver should share the
request payload through the client flow; the server validates the contract and
persists the request on the configured testnet.

## Check payment status

```sh
curl "$VELA_API/v1/payments/$PAYMENT_ID" \
  -H "Authorization: Bearer $TOKEN"
```

Payment state is authoritative on the server. A `SUBMITTED` or `CONFIRMED`
response does not mean a client should replay a signed submission. Use the
status endpoint and the returned public failure code when reconciliation is
needed.

Live Horizon/RPC and transaction verification are explicit operations and are
not implied by these local examples.
