## the setup

Last month's binary exploitation challenge shipped with a stack canary, NX, and partial RELRO — enough to make most people reach for a ROP chain and give up. The binary was a small login service that read a username into a fixed buffer and then printed a "welcome" banner built with a format string.

That format string was the whole bug. The developer had written `printf(user_input)` instead of `printf("%s", user_input)`, which meant anything we put in the username field got interpreted as format specifiers.

## leaking the canary

Format string bugs are useful for exactly two things here: reading memory and writing memory. We only needed to read. Feeding a run of `%p` tokens walked the stack outward until we hit a value that looked like a canary — null-terminated on the low byte, the way glibc always generates them.

```python
payload = b"%9$p.%10$p.%11$p.%12$p"
io.sendline(payload)
leak = io.recvline()
canary = int(leak.split(b".")[2], 16)
```

Once we had the canary, the stack overflow that followed it was no longer a problem — we could overwrite the return address freely as long as we replayed the canary value first.

> The lesson here isn't "format strings are bad," it's that any user-controlled value passed as the *format* argument — not just the data argument — is worth testing, even in code that looks otherwise careful.

## getting a shell

With ASLR still on for libc, the same format string let us leak a GOT entry, calculate the libc base from a known offset, and build a one-gadget or `system("/bin/sh")` chain from there. From leak to shell took about twenty minutes once the offsets were confirmed against the challenge's libc version.

## takeaways

- Compiler warnings would have caught this — `-Wformat-security` flags exactly this pattern.
- A stack canary only protects against a plain buffer overflow; it does nothing if the attacker can read memory some other way first.
- Always check what happens when user input reaches the *first* argument of a variadic function, not just later ones.
