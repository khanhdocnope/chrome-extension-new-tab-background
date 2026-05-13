## ADDED Requirements

### Requirement: Configure Unsplash Keyword
The user SHALL be able to configure a keyword to fetch random images from Unsplash.

#### Scenario: User saves a new Unsplash keyword
- **WHEN** the user inputs a keyword in the Advanced Settings and clicks Apply
- **THEN** the keyword is saved to `chrome.storage.local`
- **AND** the background is immediately updated using the new keyword.

### Requirement: Fetch Unsplash Background
The system SHALL fetch a dynamic background image using a generic image API based on the user's configured keyword.

#### Scenario: Keyword is provided
- **WHEN** the extension loads and the user has a keyword configured
- **THEN** the background image is sourced from `https://source.unsplash.com/random/1920x1080/?<keyword>` (or fallback equivalent).

#### Scenario: Network error or block
- **WHEN** the Unsplash image fails to load
- **THEN** the system MUST display the default aesthetic background or an error state gracefully without breaking the layout.
