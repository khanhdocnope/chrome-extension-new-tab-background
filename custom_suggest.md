# 🎨 Custom CSS Suggestions

Dán từng đoạn CSS vào ô **Custom CSS** trong settings panel.  
*Copy → Paste → Apply*

---

## 1. 🌈 Liquid Aurora — Gradient sống động

```css
body {
  background: linear-gradient(-45deg, #0d0221, #190635, #0a1628, #001a33);
  background-size: 400% 400%;
  animation: liquidShift 8s ease infinite;
}

.bg-layer::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 15% 30%, rgba(147, 51, 234, 0.6) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 70%, rgba(59, 130, 246, 0.5) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 90%, rgba(236, 72, 153, 0.4) 0%, transparent 50%);
  animation: auroraFloat 10s ease-in-out infinite alternate;
  mix-blend-mode: screen;
}

@keyframes liquidShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes auroraFloat {
  0%   { transform: scale(1) rotate(0deg); opacity: 0.8; }
  50%  { transform: scale(1.08) rotate(2deg); opacity: 1; }
  100% { transform: scale(0.95) rotate(-1deg); opacity: 0.75; }
}
```

---

## 2. ☀️ Sunrise Horizon — Bình minh ấm áp

```css
body {
  background: linear-gradient(
    to bottom,
    #0a0015 0%,
    #1a0533 15%,
    #4a1040 30%,
    #c0392b 55%,
    #e67e22 75%,
    #f39c12 90%,
    #ffeaa7 100%
  );
}

.bg-layer::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 85%, rgba(255, 200, 0, 0.6) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 100%, rgba(255, 140, 0, 0.8) 0%, transparent 30%);
}
```

---

## 3. 💎 Crystal Dark — Kính trong bóng tối

```css
body {
  background: #05050f;
}

.bg-layer {
  background:
    radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 60%),
    #05050f;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.06) !important;
  box-shadow:
    0 0 80px rgba(99, 102, 241, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
}

.clock {
  background: linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
```

---

## 4. 🌊 Deep Neon Ocean — Đại dương neon

```css
body {
  background: #000814;
}

.bg-layer {
  background: linear-gradient(180deg,
    #000814 0%,
    #001233 25%,
    #002855 50%,
    #003f88 75%,
    #0a4f6e 100%
  );
}

.bg-layer::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 60%, rgba(0, 200, 255, 0.2) 0%, transparent 45%),
    radial-gradient(ellipse at 70% 40%, rgba(0, 100, 255, 0.15) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 100%, rgba(0, 220, 255, 0.3) 0%, transparent 35%);
  animation: neonPulse 4s ease-in-out infinite alternate;
}

@keyframes neonPulse {
  0%   { opacity: 0.6; }
  100% { opacity: 1; }
}

.clock {
  background: linear-gradient(135deg, #00f5ff, #0099ff, #ffffff) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 0 20px rgba(0, 200, 255, 0.5)) !important;
}
```

---

## 5. 🔴 Cyberpunk Red — Đỏ tương lai

```css
body {
  background: #0a0008;
}

.bg-layer {
  background:
    radial-gradient(ellipse at 50% 0%, rgba(220, 0, 50, 0.4) 0%, transparent 60%),
    radial-gradient(ellipse at 0% 100%, rgba(180, 0, 80, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 50%, rgba(255, 30, 30, 0.2) 0%, transparent 50%),
    #0a0008;
  animation: cyberFlicker 6s ease-in-out infinite alternate;
}

@keyframes cyberFlicker {
  0%, 95%, 100% { opacity: 1; }
  96%           { opacity: 0.92; }
  97%           { opacity: 1; }
  98%           { opacity: 0.88; }
}

.clock {
  background: linear-gradient(135deg, #ff073a, #ff6b6b, #ffffff) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 0 30px rgba(255, 7, 58, 0.6)) !important;
}

.search-box {
  border-color: rgba(255, 7, 58, 0.3) !important;
  box-shadow: 0 0 20px rgba(255, 7, 58, 0.1) !important;
}
.search-box:focus-within {
  border-color: rgba(255, 7, 58, 0.7) !important;
  box-shadow: 0 0 30px rgba(255, 7, 58, 0.25) !important;
}
```

---

## 6. 🌿 Emerald Forest — Rừng ngọc bích

```css
body {
  background: #010d06;
}

.bg-layer {
  background: linear-gradient(135deg,
    #010d06 0%,
    #022d14 25%,
    #054a23 50%,
    #076334 70%,
    #023d1c 100%
  );
  background-size: 300% 300%;
  animation: forestBreath 12s ease infinite;
}

.bg-layer::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(16, 185, 129, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(5, 150, 105, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 60%);
}

@keyframes forestBreath {
  0%   { background-position: 0% 0%; }
  50%  { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

.clock {
  background: linear-gradient(135deg, #6ee7b7, #34d399, #ffffff) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 0 25px rgba(52, 211, 153, 0.4)) !important;
}
```

---

## 7. 🪐 Space Dust — Bụi vũ trụ

```css
body {
  background: #02000a;
}

.bg-layer {
  background:
    radial-gradient(ellipse at 25% 25%, rgba(88, 28, 135, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 75%, rgba(30, 58, 138, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 10%, rgba(109, 40, 217, 0.3) 0%, transparent 40%),
    radial-gradient(ellipse at 10% 90%, rgba(67, 20, 150, 0.4) 0%, transparent 40%),
    #02000a;
  animation: spaceDrift 15s ease-in-out infinite alternate;
}

@keyframes spaceDrift {
  0%   { filter: hue-rotate(0deg) brightness(1); }
  50%  { filter: hue-rotate(30deg) brightness(1.1); }
  100% { filter: hue-rotate(-20deg) brightness(0.95); }
}

.glass-card {
  background: rgba(109, 40, 217, 0.06) !important;
  border-color: rgba(167, 139, 250, 0.15) !important;
}
```

---

## 8. 🌺 Rose Gold — Vàng hồng sang trọng

```css
body {
  background: #1a0a0a;
}

.bg-layer {
  background: linear-gradient(135deg,
    #1a0a0a 0%,
    #2d1515 20%,
    #4a1f1f 40%,
    #6b3030 55%,
    #8b4040 70%,
    #6b3030 85%,
    #1a0a0a 100%
  );
  background-size: 300% 300%;
  animation: roseGlow 10s ease infinite;
}

.bg-layer::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 60% 40%, rgba(205, 127, 50, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 70%, rgba(180, 90, 90, 0.25) 0%, transparent 50%);
}

@keyframes roseGlow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.clock {
  background: linear-gradient(135deg, #f4c2a1, #e8a87c, #cd7f32, #ffffff) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
```

---

## 9. ⬛ Monochrome Minimal — Tối giản đen trắng

```css
body {
  background: #080808;
}

.bg-layer {
  background:
    radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse at 0% 100%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
    #080808;
}

.glass-card {
  background: rgba(255, 255, 255, 0.025) !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8) !important;
}

.clock {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.55) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: none !important;
}

.search-box {
  background: rgba(255, 255, 255, 0.03) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}
```

---

## 10. 🔮 Holographic — Ánh kim loại holographic

```css
body {
  background: #050510;
}

.bg-layer {
  background: linear-gradient(
    125deg,
    #050510,
    #1a0533,
    #001a4d,
    #1a0533,
    #050510
  );
  background-size: 400% 400%;
  animation: holoShift 6s ease infinite;
}

.bg-layer::after {
  content: '';
  position: absolute; inset: 0;
  background:
    conic-gradient(from 0deg at 50% 50%,
      rgba(255,0,128,0.06),
      rgba(0,200,255,0.06),
      rgba(128,255,0,0.04),
      rgba(255,200,0,0.05),
      rgba(200,0,255,0.06),
      rgba(255,0,128,0.06)
    );
  animation: holoSpin 20s linear infinite;
  mix-blend-mode: screen;
}

@keyframes holoShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes holoSpin {
  from { transform: rotate(0deg) scale(1.5); }
  to   { transform: rotate(360deg) scale(1.5); }
}

.clock {
  background: linear-gradient(90deg, #ff0080, #00c8ff, #80ff00, #ffc800, #ff0080) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: holoText 4s linear infinite !important;
}

@keyframes holoText {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}
```

---

> 💡 **Tip**: Kết hợp CSS trên với ảnh nền URL để có hiệu ứng **double layer** đẹp hơn!  
> Ví dụ: dán CSS vào Custom CSS, rồi vào **Background Image** thêm ảnh với độ mờ ~30%.
