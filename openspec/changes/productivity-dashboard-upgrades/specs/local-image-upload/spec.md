## ADDED Requirements

### Requirement: Upload Local Image
The system SHALL allow users to select an image file from their local device to use as the background.

#### Scenario: User selects a file
- **WHEN** the user clicks the "Upload Image" button and selects a valid image file
- **THEN** the system reads the file using `FileReader`
- **AND** the image is previewed as the background.

### Requirement: Persist Local Image
The system SHALL persist the uploaded local image so it remains available across new tab loads.

#### Scenario: Saving local image to IndexedDB
- **WHEN** the user successfully uploads an image
- **THEN** the image blob/base64 is saved in `IndexedDB` to bypass `chrome.storage` limits.

#### Scenario: Loading persisted local image
- **WHEN** a new tab is opened and a local image is set as the active background
- **THEN** the image is retrieved from `IndexedDB` and set as the background.
