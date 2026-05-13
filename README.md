# ✨ Custom New Tab Background & Productivity Dashboard

> A premium, high-performance Chrome Extension that transforms your default New Tab into a beautiful productivity dashboard. Featuring dynamic backgrounds, a focus-oriented Todo widget, and extensive customization options.

![Manifest](https://img.shields.io/badge/Manifest-V3-blue?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow?style=flat-square&logo=googlechrome)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🖼️ Key Features

### 🚀 Productivity Tools
- ✅ **Daily Focus Widget** — Integrated Todo list with glassmorphism UI to keep you on track.
- 🔄 **Settings Import/Export** — Easily backup and restore your entire configuration (CSS, tasks, and settings) via JSON.

### 🌅 Dynamic Background System
- ⛅ **Dynamic Sun Times (IP-Sync)** — Automatically syncs background periods (Morning, Noon, Afternoon, Evening, Night) with real-world sunrise/sunset times based on your IP location.
- 🌞 **New "Noon" (Trưa) Session** — Added a dedicated 5th time-based period for better day progression.
- 🎲 **Dynamic Keyword Backgrounds** — Toggle "Dynamic Keyword" to fetch random high-quality images from Unsplash/LoremFlickr based on your custom keywords (e.g., `nature`, `cyberpunk`).
- 📁 **Local Image Upload** — Upload and save your own wallpapers directly to **IndexedDB** for high-performance, quota-free storage.

### 🎨 Design & Aesthetics
- 🎨 **6 Premium Themes** — Aurora, Deep Ocean, Sunset, Cosmic, Forest, Minimal Dark.
- 🧊 **Glassmorphism UI** — Clock and Todo panels with adjustable frosting effects and blur.
- ✏️ **Pro CSS Editor** — Write your own CSS with a live preview.
- 🌐 **Full Bilingual Support** — Seamlessly toggle between Vietnamese (VI) and English (EN).

---

## 🛠️ Advanced Logic

### ⚡ Smart Caching (Sun Times)
To ensure performance and avoid rate limits, the extension caches your location-based sun times (sunrise, sunset, solar noon) in `localStorage`. 
- **Fetch Frequency**: At most once per 24 hours.
- **Offline Resilience**: Automatically falls back to standard fixed times (05:00, 11:00, 13:00, 18:00, 22:00) if you're offline or the API fails.

### 📦 Storage Strategy
- **IndexedDB**: Used for local image uploads to bypass `chrome.storage.local` size limitations.
- **Chrome Storage**: Used for all other settings and Todo tasks to ensure fast retrieval.

---

## 🚀 Installation (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **"Load unpacked"** and select this project folder.
5. Enjoy your new dashboard! 🎉

---

## ⚙️ Permissions

| Permission | Reason |
|------------|--------|
| `storage` | Save user preferences, CSS, and Todo tasks. |
| `host_permissions: <all_urls>` | Fetch dynamic sun times (ipapi/sunrise-sunset) and external background images. |

---

## 📝 License

MIT License — feel free to use, modify, and distribute.
