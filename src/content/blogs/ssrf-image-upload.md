## the target

The application was a photo-sharing platform with an image upload feature. Users could upload profile pictures, which were then resized server-side and stored in an S3 bucket. The upload endpoint accepted a URL parameter — ostensibly to let users import images from external sources.

## the bug

The server fetched whatever URL you gave it, downloaded the content, and processed it as an image. No validation on the URL scheme, no blocklist, no timeout configuration worth mentioning.

```
POST /api/upload
Content-Type: application/json

{"image_url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/"}
```

The server dutifully fetched the AWS metadata endpoint, and while it couldn't *display* the response as an image, the error message helpfully included the first 500 bytes of the response body — which contained the IAM role's temporary security credentials.

## why "just validate the URL" doesn't work

Every SSRF mitigation based on URL validation has the same problem: there are too many ways to represent the same destination.

- `http://169.254.169.254` — direct
- `http://0xA9FEA9FE` — hex encoding
- `http://2852039166` — decimal encoding
- `http://[::ffff:169.254.169.254]` — IPv6-mapped
- DNS rebinding — point a domain at `169.254.169.254` after the validation check

> The only reliable SSRF mitigation is to not let user input control the destination of server-side HTTP requests. If you must, use an allowlist of domains and resolve DNS *before* making the request, then verify the resolved IP isn't private.

## the metadata service trick

Cloud metadata services (AWS `169.254.169.254`, GCP `metadata.google.internal`, Azure `169.254.169.254`) are the #1 SSRF target because they hand out credentials without authentication. AWS's IMDSv2 mitigates this by requiring a PUT request to get a session token first, but many instances still run IMDSv1.

## the report

We reported this through the platform's bug bounty program. Timeline:

- **Day 0**: Submitted report with reproduction steps
- **Day 1**: Triaged as P1 (critical)
- **Day 3**: Fix deployed — URL validation replaced with an allowlist plus DNS resolution check
- **Day 7**: IMDSv2 enforced on all EC2 instances
- **Day 14**: Bounty paid

## takeaways

- If your application fetches URLs on behalf of users, you almost certainly have an SSRF
- The metadata service is always the first thing to check
- DNS rebinding defeats URL-based validation — you need IP-based validation after resolution
- IMDSv2 is your last line of defense on AWS, but don't rely on it
