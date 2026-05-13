## Context

The "Custom New Tab Background" extension currently allows users to set static background image URLs and custom CSS. Settings are persisted via `chrome.storage.local` under the `newtabSettings` key. To transform it into a productivity dashboard, we are introducing Unsplash integration, a Todo list, local image uploads, and settings synchronization. This requires expanding our storage strategies and adding new DOM elements while maintaining the lightweight nature of the extension.

## Goals / Non-Goals

**Goals:**
- Implement a robust storage mechanism for local image uploads that bypasses `chrome.storage.local` quota limits.
- Persist Todo list tasks efficiently without interfering with visual settings.
- Implement a reliable JSON import/export function for user configuration.

**Non-Goals:**
- Creating a backend server for syncing settings across different devices. All data remains local.
- Implementing complex task management features (like sub-tasks, deadlines, or integrations with third-party task apps like Todoist).

## Decisions

1. **Storage for Local Images (IndexedDB):**
   - *Rationale:* `chrome.storage.local` can quickly hit quota limits if storing high-resolution base64 images. We will use `IndexedDB` to store the raw Blob/Base64 of the uploaded image. We'll use a simple wrapper to save and retrieve the `localBackgroundImage`.

2. **Unsplash Integration (Source URLs):**
   - *Rationale:* Instead of requiring an Unsplash API key (which exposes secrets in client-side code), we will use generic image sourcing endpoints (e.g., `https://source.unsplash.com/random/1920x1080/?<keyword>` or an alternative like `https://picsum.photos`) to fetch images dynamically. Users will configure the keyword.

3. **Todo List State Management:**
   - *Rationale:* We will store tasks under a new key `newtabTasks` in `chrome.storage.local` (separate from `newtabSettings`). The state will be an array of objects: `{ id: string, text: string, completed: boolean }`.

4. **Import / Export Strategy:**
   - *Rationale:* For export, we will serialize `newtabSettings` into a JSON string, create a Blob, and programmatically trigger a download via a hidden `<a>` tag. For import, we will use an `<input type="file" accept=".json">` to read the file, validate the JSON structure, and update storage.

## Risks / Trade-offs

- **[Risk] High memory usage from unoptimized local images** 
  → *Mitigation:* Before saving to `IndexedDB`, we can optionally draw the uploaded image to a `<canvas>` to downscale it to a maximum of 1920x1080 to save space.
- **[Risk] `source.unsplash.com` deprecation issues**
  → *Mitigation:* If the public Unsplash endpoint is unreliable, we will provide a fallback to Picsum Photos (`picsum.photos`) and allow users to manually define their "Random Image API" endpoint in the Advanced Settings.
