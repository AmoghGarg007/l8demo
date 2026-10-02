Hello there, fellas! Welcome to the Layer8 weekly blog <3

Cybersecurity, or "hacking," has been portrayed by mainstream media as something that can only be achieved by a prodigy tech bro — a few smart clicks here and there, and oh, we hack into a super-secret official domain just like that.

Well, obviously, that isn't the case in real life. Cybersecurity has multiple layers (see what I did there), each of which must be clearly studied to even begin to comprehend the whole picture.

That's why today we're trying to understand this through a case study. It's a case almost everyone knows of, featuring a certain... educational website portal? If you guessed the hacking of the CBSE result service portal, you are correct!

## what happened

In June 2026, CBSE's post-result services portal — the platform lakhs of Class XII students rely on for re-evaluation and verification requests — came under a coordinated cyberattack.

- **1.5 million hits** on the portal within just 2 minutes
- Over **1 lakh attempts** of unauthorized file access
- Malicious traffic originating from **multiple IP addresses**, both within India and abroad

The portal's launch was already delayed once, and access issues continued even after it went live.

CBSE filed a formal complaint with Delhi Police's Intelligence Fusion & Strategic Operations (IFSO) Unit, and cybersecurity teams from IIT Kanpur, IIT Madras, Digital India Corporation, I4C, and CERT-In stepped in to help contain it.

Thankfully, CBSE reported that there was no data breach and no unauthorized access to student data. The attack was mitigated, and the systems stayed operational.

Two major things happened here.

## 1. distributed denial-of-service (ddos)

The core of the attack was a DDoS — flooding the portal with an overwhelming volume of traffic from many different sources at once, so that real users couldn't get through. Imagine thousands of people trying to walk through a single doorway at the same time — nobody gets in, not because the door is locked, but because it's physically jammed.

1.5 million hits in 2 minutes is not organic traffic. No matter how popular a result-day portal is, real students don't generate that kind of burst. That volume, combined with multiple IPs, is the fingerprint of a botnet-driven DDoS attack, likely using compromised devices scattered across different networks and countries to coordinate the flood.

## 2. unauthorized access attempts

Separately, CBSE reported over 100,000 attempts at unauthorized file access. This suggests attackers weren't only trying to crash the site but were also probing exploitable files, misconfigured directories, or weak points that could let them pull data out. This is closer to a reconnaissance/exploitation attempt, run in parallel with the DDoS noise.

Combining both is a known tactic: the DDoS creates chaos and distracts monitoring systems, while the access attempts try to slip through in the confusion. Whether that was the actual intent here or not, it's a pattern worth knowing.

## what this tells us

- **High-traffic, high-stakes platforms are prime targets.** Anything time-sensitive and used by millions — result portals, ticket booking sites, exam registration systems — is attractive because even a short outage causes real damage and panic.
- **"No breach" doesn't mean "no attack."** A lot of people only think of cybersecurity incidents in terms of stolen data. But denying access to a legitimate service is itself a serious attack — this is literally the "A" in the CIA triad: Confidentiality, Integrity, Availability.
- **CBSE coordinated with CERT-In, I4C, and multiple IITs.** Real-world incident response almost always involves multiple teams and institutions working together in real time.
- **Traffic came from IPs within India and abroad** — typical of botnets, where attackers use compromised devices worldwide, making it very difficult to trace the attack back to a single source or motive.

> Cybersecurity isn't just about stopping hackers from "stealing your data." Sometimes the goal is simpler and just as disruptive: stop people from getting what they need, when they need it. For lakhs of students trying to access time-sensitive services, a few hours of downtime is a real problem — even if no data is ever touched.
