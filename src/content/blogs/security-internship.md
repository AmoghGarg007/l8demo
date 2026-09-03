## how it started

I applied to a security internship posted on our university's job board. The listing said "web application security testing" and required "familiarity with OWASP Top 10." I figured knowing what SQL injection was would be enough. It was not.

## the scope document

Day one, they handed me a scope document — a list of exactly which domains, endpoints, and functionality I was authorized to test. Anything outside the scope was off-limits, full stop. This is the part nobody tells you about: **most of your time as an intern isn't spent hacking; it's spent reading documentation and understanding boundaries.**

The scope covered:
- The student portal (authentication, profile management, grade viewing)
- The course registration API
- The internal messaging system

Explicitly excluded: the payment gateway, the admin dashboard, and anything involving other students' real data.

## the actual work

A typical day looked like:

- **Morning**: Read through the application's source code or API documentation, looking for patterns that might indicate vulnerabilities
- **Midday**: Write and run test cases — mostly using Burp Suite for intercepting requests and crafting payloads
- **Afternoon**: Document findings in a report template, including reproduction steps, severity rating, and recommended fixes

> The unglamorous truth: for every exciting finding, there are fifty tests that return nothing. Persistence matters more than brilliance.

## what I found

Over the semester, I reported:

- **3 medium-severity issues**: an IDOR in the profile endpoint, a reflected XSS in the search function, and a CSRF on the password change form
- **1 high-severity issue**: an authentication bypass that let any logged-in student access any other student's grade transcript by changing a numeric ID in the URL
- **Several informational findings**: verbose error messages, missing security headers, outdated library versions

## the disclosure process

Every finding went through a formal disclosure process:

1. Write it up with full reproduction steps
2. Submit to the security team's ticketing system
3. Wait for triage (usually 2-3 business days)
4. Discuss severity and remediation in a call
5. Verify the fix once deployed

The IDOR and auth bypass were fixed within a week. The XSS and CSRF took longer because they required frontend changes that went through a separate review process.

## what I wish I'd known

- **Legal protection matters.** Always have a signed agreement that authorizes your testing. "I was just doing my internship" is not a legal defence.
- **Reporting is the job.** Finding bugs is maybe 30% of the work. Writing clear, reproducible reports is the other 70%.
- **Don't touch production data.** Use test accounts. If you accidentally access real data, report it immediately and document what you saw.
- **Ask questions early.** If you're unsure whether something is in scope, ask. Don't guess.
