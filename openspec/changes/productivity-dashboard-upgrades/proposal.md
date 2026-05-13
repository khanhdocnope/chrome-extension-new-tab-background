## Why

The "Custom New Tab Background" extension currently serves as a simple aesthetic tool. By introducing productivity features like a daily focus/todo list and expanding background source options (Unsplash, local uploads), the extension will be transformed into a more robust "Productivity Dashboard". This caters to user needs for an all-in-one focus workspace directly from their new tab page, increasing the overall utility of the extension.

## What Changes

- Add Unsplash API integration to fetch high-quality, professional backgrounds automatically.
- Introduce a "Daily Focus" and minimalist Todo List widget.
- Add functionality to upload and set local images from the user's computer as the background.
- Add an Import/Export feature for backing up and restoring user settings and custom CSS.

## Capabilities

### New Capabilities
- `unsplash-backgrounds`: Integration with Unsplash API for fetching random or daily background images.
- `productivity-widgets`: Todo list and daily focus task tracking, persisting data via `chrome.storage`.
- `local-image-upload`: Functionality to read, store, and display local images as the new tab background.
- `settings-sync`: Import and export capabilities for user settings (JSON format).

### Modified Capabilities
*(No existing capabilities to modify)*

## Impact

- **UI/UX**: Significant additions to `newtab.html` and `newtab.css` for the new widgets and settings sections.
- **State Management**: Increased usage of `chrome.storage.local` for tasks, daily focus, and settings.
- **Storage**: May require handling large base64 strings or moving to `IndexedDB` for local image support.
- **Network**: New external requests to `api.unsplash.com` (requires API keys or proxy).
