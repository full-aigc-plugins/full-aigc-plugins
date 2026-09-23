## Context

See `proposal.md` for motivation. The generator currently derives all three host manifests solely from `catalog.plugins`; every `candidatePlugins` entry is validated as blocked and explicitly rejected from generated manifests. Content Factory `1.0.0-rc.2` already has an immutable annotated tag and GitHub pre-release, while its production release gate intentionally remains blocked.

## Goals / Non-Goals

**Goals:**

- Make an explicitly approved RC discoverable and installable on Codex, ZCode, and Kimi.
- Preserve one catalog source of truth and immutable installation refs.
- Keep RC identity visibly distinct from production readiness.
- Preserve hidden behavior for candidates that remain `release_candidate_blocked`.

**Non-Goals:**

- Completing Content Factory's production release gate.
- Creating or implying a stable `v1.0.0` release.
- Changing the Content Factory runtime package or immutable RC tag.
- Automatically promoting every candidate to an installable preview.

## Decisions

### Keep RC entries in `candidatePlugins`

An installable RC remains in `candidatePlugins` with status `release_candidate_installable`. The generator composes host manifests from production plugins plus only installable candidates. This preserves the production/candidate distinction instead of moving incomplete software into `plugins`.

Alternative considered: add Content Factory to `plugins`. Rejected because downstream readers treat that collection as released production inventory.

### Use host-compatible metadata with visible RC labeling

The candidate record carries `shortDescription`, `category`, and `tags`. Generated entries use an RC-labeled display name and description while retaining the canonical plugin ID. Optional artwork is omitted when the immutable candidate does not contain a release-pinned logo, allowing hosts to render their default icon without referencing mutable assets.

Alternative considered: add artwork after the tag. Rejected because an immutable tag cannot be changed and a mutable external logo would violate release pinning.

### Pin all installs to the existing semantic pre-release tag

Codex and ZCode install from `v1.0.0-rc.2`; Kimi links to the corresponding GitHub pre-release. Candidate validation requires a semantic pre-release version, a `BLOCKED` production gate, matching plugin manifest version, and—during remote validation—a published GitHub release whose `prerelease` flag is true.

Alternative considered: install from `main`. Rejected because it breaks reproducibility and would no longer correspond to the verified candidate digest.

## Risks / Trade-offs

- **Users may mistake RC availability for production readiness** → Label the entry as RC/preview in every host and retain the blocked gate in the central catalog and documentation.
- **Some hosts may show a default icon** → Prefer an honest default icon over a mutable or fabricated release asset.
- **Candidate and production IDs could collide during promotion** → Continue rejecting any ID present in both collections.
- **A pre-release could disappear remotely** → Remote validation checks both the tag and GitHub pre-release before accepting the catalog state.

## Migration Plan

1. Add failing marketplace behavior tests for installable RC visibility and immutable refs.
2. Change the candidate status and metadata in `catalog.json`.
3. Extend generation and validation, then regenerate all three host manifests.
4. Update bilingual installation documentation.
5. Run local full validation, push the isolated commit, and require remote CI success.

Rollback consists of restoring `release_candidate_blocked` and regenerating manifests, which removes the candidate from every host without changing the candidate repository or tag.
