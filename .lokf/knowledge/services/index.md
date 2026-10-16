# Services

* [KTL Registrar Plugin](ktl-registrar-plugin.md) - The plugin lifecycle in src/main.ts: fifteen commands, the status bar, vault-wide scanning, bundle-root resolution, and the read-only API the sibling KTL Curator may read.
* [Validator Engine](validator-engine.md) - The import-free rule engine in src/validator.ts: the LOKF semantic layer (bundle header and base_iri, type vocabulary, typed relationships, id minting, trust and lifecycle shape), the OKF v0.2 base layer behind checkOkfBaseLayer, the errors lokf validate also raises, and pure bundle-root detection.
* [Report View](report-view.md) - Collapsible side-panel view rendering the vault-wide LOKF conformance report.
* [Settings Tab](settings-tab.md) - The declarative settings tab in src/settings.ts (Obsidian 1.13.0 getSettingDefinitions API): its eleven groups, how list settings are stored and saved, bundle root folders and the break-glass whole-vault switch, and Known LOKF types as the domain-schema extension point.
