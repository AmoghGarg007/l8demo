## the challenge

The CTF challenge handed us a public key (2048-bit RSA, standard `e = 65537`) and a ciphertext. The twist: the encryption used a custom padding scheme instead of OAEP or PKCS#1 v1.5. The author had implemented their own "randomised" padding that prepended the plaintext with a fixed-length random prefix before encryption.

## the flaw

Looking at the padding implementation (provided as a Python script), the "random" prefix was generated using `random.randint()` seeded with `int(time.time())`. Since the encryption timestamp was included in the challenge metadata, we could reconstruct the exact seed.

```python
import random, time

# timestamp from challenge metadata
seed = 1724300400
random.seed(seed)
prefix = bytes([random.randint(0, 255) for _ in range(16)])
```

With the prefix known, the padding was no longer random — it was deterministic. This turned the problem into a straightforward RSA decryption with known padding.

## the recovery

Since we knew exactly what bytes were prepended:

1. We didn't need to factor `n` — the public key was fine
2. We computed `m = pow(c, d, n)` using... wait, we don't have `d`
3. But with known padding, we could check if the decrypted value matched our expected prefix, and since the padding was deterministic, we could brute-force the plaintext space

Actually, the real trick was subtler. The custom padding also used a checksum that leaked information about the plaintext length. Combined with the known prefix, we could use Coppersmith's method to recover the plaintext from just the public key and ciphertext.

```python
from sage.all import *

# Coppersmith's short-pad attack
# with known prefix reducing the unknown bits
P.<x> = PolynomialRing(Zmod(n))
f = (prefix_int * 2^(msg_bits) + x)^e - c
roots = f.small_roots(X=2^msg_bits, beta=0.5)
```

## takeaways

- Never roll your own padding. OAEP exists for a reason.
- `random.randint()` is not cryptographically secure. Use `secrets` or `os.urandom()`.
- Timestamps are not secrets — don't use them as seeds for "random" padding.
- Coppersmith's method is devastatingly effective when you know most of the plaintext.
