---
name: sdd-spec
description: Define framework-neutral expected behavior, requirements, acceptance criteria, constraints, and non-goals for a SpecForge feature.
---

# SDD Specification

## Purpose

Define what and why, with measurable behavior, before implementation design.

## Trigger

The workflow is at `spec`, or a higher-authority conflict routes work back here.

## Inputs

Constitution, normalized `issue.md`, resolved clarifications, and relevant stable
contracts or repository conventions.

## Required Artifacts

`.sdd/templates/spec.md`; persist `spec.md` and update the feature index.

## Preconditions

Intake is complete and critical source gaps are identified.

## Procedure

Define scope, non-goals, constraints, and stable `REQ-<issue>-<sequence>` IDs.
Give each significant Requirement measurable `AC-<issue>-<sequence>` criteria.
Describe observable behavior, including relevant negative and compatibility
cases, without prescribing unnecessary implementation.

## Recommended Agent

`architect`.

## Allowed Actions

Refine raw intent into explicit behavior and record unresolved questions.

## Forbidden Actions

Do not implement, silently contradict the Constitution, create untestable
promises, or renumber stable IDs during normal revision.

## Outputs

OKF-conformant `spec.md` with Requirements, Acceptance Criteria, constraints,
non-goals, and open questions.

## Completion Criteria

Every significant Requirement has measurable criteria and no known critical
ambiguity is hidden.

## Failure Conditions

Constitution conflict, unresolvable product semantics, missing security or data
boundary, or acceptance behavior that cannot be made observable.

## State Transition

Persist draft or approved `spec_status`. On a complete draft move to `clarify`;
route conflicts according to the Orchestrator.

## GitHub Label Transition

After state persistence, project `stage:clarify` on successful specification.

## Human Escalation Conditions

Escalate undefined business rules, product semantics, security/data/public API
boundaries, irreversible behavior, or a needed Constitution exception.
