---
type: SDD Issue Input
title: Sample GitHub Issue 42 Input
description: Local raw intent used by the isolated SpecForge sample.
tags: [sdd, example, issue-input]
status: draft
sdd:
  issue: 42
  stage: intake
  artifact: issue-input
---

# Add a portable slug normalizer example

**Problem:** Small automation examples need predictable directory slugs, but
ad-hoc transformations produce spaces, repeated separators, and uppercase text.

**Desired outcome:** Given a short ASCII title, output a lowercase,
hyphen-separated slug.

**Known constraints:** Keep this sample deliberately small and portable. It must
not impose an application language on SpecForge adopters.

**Non-goal:** International transliteration and a production CLI package.
