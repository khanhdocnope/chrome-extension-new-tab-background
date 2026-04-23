# ✨ Custom New Tab Background

> A Chrome Extension that replaces the default New Tab page with a beautiful, fully customizable background — supporting animated gradients, background images, frosted glass effects, and custom CSS.

![Manifest](https://img.shields.io/badge/Manifest-V3-blue?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow?style=flat-square&logo=googlechrome)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🖼️ Features

- 🎨 **6 built-in gradient themes** — Aurora, Deep Ocean, Sunset, Cosmic, Forest, Minimal Dark
- 🖼️ **Background image** — set any HTTPS image URL as wallpaper with adjustable opacity
- 🧊 **Frosted glass card** — glassmorphism clock panel with adjustable blur intensity
- ✏️ **Custom CSS editor** — write your own CSS to fully customize the look
- 🕐 **Real-time clock** — displays time, date, and context-aware greeting
- 🔍 **Google Search bar** — search directly from the New Tab page
- 🌐 **Bilingual UI** — switch between Vietnamese (VI) and English (EN)
- 💾 **Persistent settings** — all preferences saved via `chrome.storage.local`

---

## 📁 Project Structure

```
chrome-extension/
├── manifest.json        # Extension config (Manifest V3)
├── newtab.html          # New Tab page markup
├── newtab.css           # Styles, themes, animations
├── newtab.js            # Logic: clock, themes, i18n, storage
├── custom_suggest.md    # 10 ready-to-use Custom CSS snippets
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🚀 Installation (Developer Mode)

1. Clone or download this repository
   ```bash
   git clone https://github.com/your-username/custom-newtab.git
   ```

2. Open Chrome and navigate to:
   ```
   chrome://extensions
   ```

3. Enable **Developer mode** (toggle in the top-right corner)

4. Click **"Load unpacked"** and select the project folder

5. Open a **New Tab** — enjoy! 🎉

---

## 🎨 Built-in Themes

| Theme | Description |
|-------|-------------|
| **Aurora** | Animated purple-blue aurora borealis |
| **Deep Ocean** | Dark navy with flowing wave SVGs |
| **Sunset** | Warm orange-gold gradient |
| **Cosmic** | Deep space purple with twinkling stars |
| **Forest** | Rich green nature tones |
| **Minimal Dark** | Clean dark background with soft glow |
| **Custom CSS** | Full control via your own CSS |

---

## ✏️ Custom CSS Examples

See [`custom_suggest.md`](./custom_suggest.md) for 10 ready-to-paste CSS snippets including:

- 🌈 Liquid Aurora animated gradient
- ☀️ Sunrise Horizon
- 💎 Crystal Dark
- 🌊 Deep Neon Ocean
- 🔴 Cyberpunk Red with flicker effect
- 🌿 Emerald Forest
- 🪐 Space Dust with hue-rotate
- 🌺 Rose Gold
- ⬛ Monochrome Minimal
- 🔮 Holographic rainbow clock

---

## ⚙️ Permissions

| Permission | Reason |
|------------|--------|
| `storage` | Save user preferences (theme, image URL, CSS, language) |
| `host_permissions: <all_urls>` | Load background images from any HTTPS source |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **Vanilla CSS** — Custom properties, animations, glassmorphism
- **Vanilla JavaScript** — No dependencies, no frameworks
- **Chrome Extensions API (MV3)** — `chrome.storage.local`, `chrome_url_overrides`

---

## 🌐 i18n — Language Support

Switch between **Vietnamese** and **English** using the `VI / EN` toggle in the settings panel. Translated elements include:

- All settings panel labels and section headers
- Search bar placeholder
- Clock greeting messages
- Date format (`Thứ hai, 23 tháng 4 2026` ↔ `Monday, April 23, 2026`)
- Error messages

---

## 📝 License

MIT License — feel free to use, modify, and distribute.

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

### Steps

1. **Fork** this repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and test by loading the extension unpacked in Chrome
4. **Commit** with a clear message
   ```bash
   git commit -m "feat: describe your change"
   ```
5. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** — describe what changed and why

### Ideas for contributions

- 🌍 Add more language translations
- 🎨 Contribute new CSS themes to `custom_suggest.md`
- 🧩 Add new widgets (weather, bookmarks, notes...)
- 🐛 Report or fix bugs via [Issues](../../issues)
