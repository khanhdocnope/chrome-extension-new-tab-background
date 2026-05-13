## ADDED Requirements

### Requirement: Export Settings
The user SHALL be able to export their current settings and custom CSS to a file.

#### Scenario: User triggers export
- **WHEN** the user clicks the "Export Settings" button
- **THEN** the system generates a JSON file containing the `newtabSettings` data
- **AND** triggers a download of this JSON file.

### Requirement: Import Settings
The user SHALL be able to import a valid settings JSON file to restore their configuration.

#### Scenario: User imports valid settings
- **WHEN** the user selects a valid settings JSON file via the import button
- **THEN** the system parses the file
- **AND** overwrites the current settings in `chrome.storage.local`
- **AND** immediately applies the imported settings (theme, background, CSS, etc.).

#### Scenario: User imports invalid file
- **WHEN** the user selects an invalid or corrupted file
- **THEN** the system alerts the user that the import failed
- **AND** no existing settings are modified.
