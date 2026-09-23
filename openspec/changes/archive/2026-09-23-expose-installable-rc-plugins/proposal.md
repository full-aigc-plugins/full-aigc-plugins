## Why

The central catalog currently treats every release-blocked candidate as hidden and non-installable, so a deliberately published RC cannot be discovered or installed for controlled host testing. Content Factory `1.0.0-rc.2` now has an immutable tag and GitHub pre-release and needs an explicit preview channel without weakening its production release gate.

## What Changes

- Add an explicit `release_candidate_installable` candidate state for approved RC builds.
- Emit installable RC entries into the Codex, ZCode, and Kimi marketplace manifests while retaining the candidate in `catalog.candidatePlugins` rather than promoting it to the production `plugins` collection.
- Pin every RC install source to its immutable semantic pre-release tag and published GitHub pre-release.
- Label the entry as RC/preview in user-facing marketplace metadata and keep its production release-gate path and blocked status visible in the central catalog.
- Continue excluding `release_candidate_blocked` candidates from all install manifests.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `candidate-plugin-governance`: Distinguish hidden blocked candidates from explicitly approved, installable RC candidates and define their marketplace visibility and validation requirements.
- `immutable-plugin-installation`: Extend immutable release identity validation to installable semantic pre-releases and GitHub pre-releases.

## Impact

- `catalog.json` candidate metadata and status semantics.
- `scripts/sync-marketplaces.mjs` generation and validation for Codex, ZCode, and Kimi.
- Candidate governance tests and all three generated marketplace manifests.
- Content Factory becomes visible and test-installable as an RC; its final `v1.0.0` release remains blocked by the plugin repository's existing release gate.
