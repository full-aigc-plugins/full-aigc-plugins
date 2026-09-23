# candidate-plugin-governance Specification

## Purpose
TBD - created by archiving change add-candidate-plugin-registry. Update Purpose after archive.
## Requirements
### Requirement: Blocked candidates are centrally tracked without becoming installable

The marketplace SHALL track every release candidate in the central catalog with its repository, exact candidate version, status, and release-gate evidence path. The marketplace SHALL NOT emit a candidate into any host install manifest while its status is `release_candidate_blocked`. The marketplace SHALL emit a candidate whose status is `release_candidate_installable` into the Codex, ZCode, and Kimi install manifests as an explicitly labeled RC/preview entry pinned to its immutable pre-release tag, without promoting it to the production `plugins` collection or changing its production release gate.

#### Scenario: Content Factory remains blocked

- **GIVEN** Content Factory has status `release_candidate_blocked`
- **WHEN** the marketplace catalog is synchronized
- **THEN** the candidate remains present in `catalog.json`
- **AND** it is absent from the Codex, ZCode, and Kimi installable manifests

#### Scenario: Approved RC is visible and test-installable

- **GIVEN** Content Factory version `1.0.0-rc.2` has an immutable tag and published GitHub pre-release
- **AND** its candidate status is `release_candidate_installable`
- **WHEN** the marketplace catalog is synchronized
- **THEN** it is present in the Codex, ZCode, and Kimi installable manifests
- **AND** each entry identifies it as an RC/preview and pins installation to `v1.0.0-rc.2`
- **AND** the candidate remains outside the production `plugins` collection with its final release gate unchanged

#### Scenario: Candidate identity overlaps a released plugin

- **GIVEN** a candidate ID also exists in the production `plugins` collection
- **WHEN** the marketplace is validated
- **THEN** validation fails instead of publishing duplicate entries

#### Scenario: Installable candidate uses a stable version

- **GIVEN** a candidate status is `release_candidate_installable`
- **AND** its version is not a semantic pre-release version
- **WHEN** the marketplace is validated
- **THEN** validation fails instead of exposing a stable-looking candidate through the preview path

#### Scenario: Candidate gate no longer reports blocked

- **GIVEN** a candidate registry entry points to a release gate that is not `BLOCKED`
- **WHEN** the marketplace is validated
- **THEN** validation fails and requires explicit promotion to the production `plugins` collection
