## the discovery

While auditing a test build of an internal academic platform, we noticed the authentication endpoint returned a JWT on login. Nothing unusual — until we decoded the header and saw `"alg": "HS256"`. Standard fare. But the server also accepted tokens with `"alg": "none"`.

## how none-alg works

The JWT spec defines a `none` algorithm for unsigned tokens. It was meant for situations where the token has already been verified through some other mechanism. In practice, if a server's JWT library doesn't explicitly reject `none`, you can forge any token you want by:

1. Setting the header to `{"alg": "none", "typ": "JWT"}`
2. Putting whatever claims you want in the payload
3. Leaving the signature empty (just a trailing dot)

```python
import base64, json

header = base64.urlsafe_b64encode(
    json.dumps({"alg": "none", "typ": "JWT"}).encode()
).decode().rstrip("=")

payload = base64.urlsafe_b64encode(
    json.dumps({"sub": "admin", "role": "superuser"}).encode()
).decode().rstrip("=")

forged = f"{header}.{payload}."
```

## the impact

With a forged admin token, we had full access to the platform's grade management API. We reported it through the university's responsible disclosure process and the fix — explicitly rejecting `none` in the JWT verification config — was deployed within 48 hours.

## why this still happens

- Many JWT libraries accept `none` by default unless you pass a whitelist of allowed algorithms.
- Developers copy-paste JWT verification code from tutorials that don't mention this edge case.
- The `none` algorithm is part of the spec (RFC 7519), so it's not a "bug" in the library — it's a misconfiguration.

> Always pass an explicit `algorithms` parameter when verifying JWTs. Never rely on the library's defaults.
