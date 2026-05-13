## 1. Storage Infrastructure

- [x] 1.1 Create an IndexedDB utility wrapper for saving and retrieving large image blobs
- [x] 1.2 Update `saveSettings` and `loadSettings` to handle the new fields (Unsplash keyword, Todo tasks) but keep them separate from existing logic

## 2. Settings Import / Export

- [x] 2.1 Add "Export Settings" and "Import Settings" buttons in `newtab.html` Advanced Settings
- [x] 2.2 Implement `exportSettings` function to serialize `newtabSettings` to JSON and trigger download
- [x] 2.3 Implement `importSettings` function using a hidden file input to read, validate, and apply JSON configuration

## 3. Local Image Upload

- [x] 3.1 Add a "Local Upload" button or file input in the Image Settings section
- [x] 3.2 Implement `FileReader` logic to read the uploaded image, optionally compress it via canvas, and save to IndexedDB
- [x] 3.3 Update the background rendering logic to prioritize and load the IndexedDB image if set

## 4. Unsplash Backgrounds

- [x] 4.1 Add an input field for the "Unsplash Keyword" in the Settings panel
- [x] 4.2 Update the background rendering logic to construct the Unsplash URL (e.g., `https://source.unsplash.com/random/1920x1080/?<keyword>`) when the feature is enabled
- [x] 4.3 Handle image load errors gracefully (fallback to default theme)

## 5. Todo List Widget

- [x] 5.1 Create the HTML structure for the Todo list widget in `newtab.html`
- [x] 5.2 Style the widget with CSS (glassmorphism UI) in `newtab.css`
- [x] 5.3 Implement task rendering, adding, toggling, and deleting logic in `newtab.js`
- [x] 5.4 Connect the Todo logic to `chrome.storage.local` using the `newtabTasks` key

## 6. Testing & Polish

- [x] 6.1 Test all features in isolation and combined (e.g., Unsplash + Todo)
- [x] 6.2 Ensure UI responsiveness and add `data-i18n` translations for all new text elements
