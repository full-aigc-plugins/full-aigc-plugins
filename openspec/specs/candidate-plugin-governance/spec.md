# candidate-plugin-governance Specification

## Purpose
TBD - created by archiving change add-candidate-plugin-registry. Update Purpose after archive.
## Requirements
### Requirement: Blocked candidates are centrally tracked without becoming installable

The marketplace SHALL track a release-blocked plugin candidate in the central catalog with its repository, exact candidate version, status, and release-gate evidence path. The marketplace SHALL NOT emit that candidate into any host install manifest while the status is `release_candidate_blocked`.

#### Scenario: Content Factory remains blocked

- **GIVEN** Content Factory version `1.0.0-rc.2` has a release gate whose status is `BLOCKED`
- **WHEN** the marketplace catalog is synchronized
- **THEN** the candidate is present in `catalog.json`
- **AND** it is absent from the Codex, ZCode, and Kimi installable manifests

#### Scenario: Candidate identity overlaps a released plugin

- **GIVEN** a candidate ID also exists in the installable `plugins` collection
- **WHEN** the marketplace is validated
- **THEN** validation fails instead of publishing duplicate entries

#### Scenario: Candidate gate no longer reports blocked

- **GIVEN** a candidate registry entry points to a release gate that is not `BLOCKED`
- **WHEN** the marketplace is validated
- **THEN** validation fails and requires an explicit immutable release and promotion to `plugins`
