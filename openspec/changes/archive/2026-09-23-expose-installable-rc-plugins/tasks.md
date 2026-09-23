## 1. Contract and RED Evidence

- [x] 1.1 Add a behavior test requiring Content Factory RC visibility, test-installable policy, immutable refs, and continued production separation across all three host manifests.
- [x] 1.2 Run the focused test and record that it fails because the current blocked-candidate behavior excludes Content Factory.

## 2. Candidate Generation

- [x] 2.1 Change Content Factory candidate metadata to `release_candidate_installable` with explicit RC-facing metadata.
- [x] 2.2 Extend marketplace generation and validation to include only installable candidates while retaining hidden blocked candidates and duplicate-ID protection.
- [x] 2.3 Require semantic pre-release versions and matching GitHub pre-release evidence during remote validation.
- [x] 2.4 Regenerate Codex, ZCode, and Kimi marketplace manifests from `catalog.json`.

## 3. Documentation and Verification

- [x] 3.1 Update Chinese and English installation/catalog documentation to identify Content Factory as an installable RC whose production gate remains blocked.
- [x] 3.2 Run focused tests, full repository tests, local synchronization validation, candidate validation, remote release validation, and strict OpenSpec validation.
- [x] 3.3 Archive the verified OpenSpec change so the canonical specifications reflect installable RC governance.
- [x] 3.4 Commit and push the isolated change, verify the exact remote commit, and record that this marketplace repository has no GitHub Actions workflow.
- [x] 3.5 Refresh the configured central marketplace and perform a real Codex RC installation/readback test.
