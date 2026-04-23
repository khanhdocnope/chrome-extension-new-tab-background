// ===== CONSTANTS =====
const DAYS_VI = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
const MONTHS_VI = ['tháng 1','tháng 2','tháng 3','tháng 4','tháng 5','tháng 6',
                   'tháng 7','tháng 8','tháng 9','tháng 10','tháng 11','tháng 12'];
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS_EN = ['January','February','March','April','May','June',
                   'July','August','September','October','November','December'];

// ===== TRANSLATIONS =====
const LANGS = {
  vi: {
    settings_title:    'Cài đặt nền',
    section_theme:     'Chọn kiểu nền',
    section_image:     'Ảnh nền',
    img_hint:          'Nhập URL ảnh HTTPS để đặt làm nền. Ảnh hiển thị phía sau hiệu ứng gradient.',
    img_opacity_label: 'Độ mờ ảnh',
    img_remove:        'Xoá ảnh nền',
    section_glass:     'Frosted Glass',
    glass_toggle_label:'Hiệu ứng kính mờ',
    glass_blur_label:  'Độ mờ',
    section_css:       'Custom CSS',
    apply_css:         'Áp dụng CSS',
    apply_css_done:    'Đã áp dụng!',
    search_placeholder:'Tìm kiếm trên Google...',
    css_hint_html:     'Viết CSS để tùy chỉnh nền. Dùng selector <code>body</code> hoặc <code>.bg-layer</code>',
    error_img:         'Không tải được ảnh!\nKiểm tra lại:\n• URL có đúng không?\n• Ảnh có phải HTTPS không?\n• Ảnh có cho phép truy cập từ ngoài không?',
    greeting_morning:  '☀️ Chào buổi sáng',
    greeting_afternoon:'🌤️ Chào buổi chiều',
    greeting_evening:  '🌆 Chào buổi tối',
    greeting_night:    '🌙 Chúc ngủ ngon',
  },
  en: {
    settings_title:    'Background Settings',
    section_theme:     'Choose Theme',
    section_image:     'Background Image',
    img_hint:          'Enter an HTTPS image URL to set as background. It appears behind the gradient.',
    img_opacity_label: 'Image opacity',
    img_remove:        'Remove image',
    section_glass:     'Frosted Glass',
    glass_toggle_label:'Glass blur effect',
    glass_blur_label:  'Blur amount',
    section_css:       'Custom CSS',
    apply_css:         'Apply CSS',
    apply_css_done:    'Applied!',
    search_placeholder:'Search on Google...',
    css_hint_html:     'Write CSS to customize the background. Use <code>body</code> or <code>.bg-layer</code>',
    error_img:         'Failed to load image!\nPlease check:\n• Is the URL correct?\n• Is it HTTPS?\n• Does the server allow external access?',
    greeting_morning:  '☀️ Good morning',
    greeting_afternoon:'🌤️ Good afternoon',
    greeting_evening:  '🌆 Good evening',
    greeting_night:    '🌙 Good night',
  }
};

// ===== DOM REFS =====
const clockEl        = document.getElementById('clock');
const dateEl         = document.getElementById('dateDisplay');
const greetingEl     = document.getElementById('greeting');
const settingsBtn    = document.getElementById('settingsBtn');
const settingsPanel  = document.getElementById('settingsPanel');
const overlay        = document.getElementById('settingsOverlay');
const closeBtn       = document.getElementById('closeSettings');
const themeGrid      = document.getElementById('themeGrid');
const cssEditor      = document.getElementById('cssEditor');
const applyCssBtn    = document.getElementById('applyCssBtn');
const customCssStyle = document.getElementById('customCssStyle');
const cssSection     = document.getElementById('cssEditorSection');
const searchInput    = document.getElementById('searchInput');
const starsContainer = document.getElementById('starsContainer');
// Image & Glass
const bgImageLayer   = document.getElementById('bgImageLayer');
const bgOverlay      = document.getElementById('bgOverlay');
const bgImageUrlEl   = document.getElementById('bgImageUrl');
const applyImageBtn  = document.getElementById('applyImageBtn');
const bgImageOpacity = document.getElementById('bgImageOpacity');
const opacityValue   = document.getElementById('opacityValue');
const removeImageBtn = document.getElementById('removeImageBtn');
const glassToggle    = document.getElementById('glassToggle');
const glassIntensity = document.getElementById('glassIntensity');
const glassValue     = document.getElementById('glassValue');

// ===== STATE =====
let currentTheme    = 'aurora';
let customCSS       = '';
let currentBgImage  = '';
let currentOpacity  = 60;
let glassEnabled    = true;
let glassBlur       = 20;
let currentLang     = 'vi';

// ===== I18N =====
function applyLanguage(lang) {
  currentLang = lang;
  const t = LANGS[lang];
  // Update all data-i18n text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  // Update innerHTML for hint elements (contain <code> tags)
  const cssHintEl = document.getElementById('cssHintEl');
  if (cssHintEl) cssHintEl.innerHTML = t.css_hint_html;
  // Update placeholder
  searchInput.placeholder = t.search_placeholder;
  // Update html lang attr
  document.getElementById('htmlRoot').lang = lang;
  // Update lang btn states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Re-run clock to refresh greeting & date
  updateClock();
}

// ===== CLOCK =====
function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}`;

  if (currentLang === 'vi') {
    const day   = DAYS_VI[now.getDay()];
    const month = MONTHS_VI[now.getMonth()];
    dateEl.textContent = `${day}, ${now.getDate()} ${month} ${now.getFullYear()}`;
  } else {
    const day   = DAYS_EN[now.getDay()];
    const month = MONTHS_EN[now.getMonth()];
    dateEl.textContent = `${day}, ${month} ${now.getDate()}, ${now.getFullYear()}`;
  }

  const t    = LANGS[currentLang];
  const hour = now.getHours();
  if      (hour >= 5  && hour < 12) greetingEl.textContent = t.greeting_morning;
  else if (hour >= 12 && hour < 18) greetingEl.textContent = t.greeting_afternoon;
  else if (hour >= 18 && hour < 22) greetingEl.textContent = t.greeting_evening;
  else                              greetingEl.textContent = t.greeting_night;
}
setInterval(updateClock, 1000);
updateClock();

// ===== STARS =====
function createStars(count = 120) {
  starsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*100}%;
      left:${Math.random()*100}%;
      --dur:${(Math.random()*3+2).toFixed(1)}s;
      --delay:-${(Math.random()*5).toFixed(1)}s;
      opacity:${Math.random()*0.5+0.1};
    `;
    starsContainer.appendChild(star);
  }
}
createStars();

// ===== THEME =====
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  currentTheme = theme;

  // Update active card
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === theme);
  });

  // Show/hide CSS editor
  cssSection.classList.toggle('visible', theme === 'custom');

  // Apply custom CSS if switching to custom
  if (theme === 'custom') {
    applyCustomCSS(customCSS);
  } else {
    customCssStyle.textContent = '';
  }
}

function applyCustomCSS(css) {
  customCssStyle.textContent = css;
}

// ===== BACKGROUND IMAGE =====
// silent=true: called from loadSettings (no button feedback, no alert on error)
function applyBgImage(url, opacity, silent = false) {
  if (!url) { removeImage(); return; }

  if (!silent) {
    applyImageBtn.textContent = '⏳';
    applyImageBtn.disabled = true;
  }

  // NOTE: do NOT set crossOrigin — it breaks non-CORS image servers
  const testImg = new Image();

  testImg.onload = () => {
    bgImageLayer.style.backgroundImage = `url("${url}")`;
    bgImageLayer.style.opacity = '0';
    bgImageLayer.classList.add('has-image');
    bgOverlay.classList.add('has-image');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bgImageLayer.style.opacity = String(opacity / 100);
      });
    });
    currentBgImage = url;
    currentOpacity = opacity;
    if (!silent) {
      saveSettings(); // Save AFTER state is set (onload is async)
      applyImageBtn.textContent = '✅';
      setTimeout(() => { applyImageBtn.textContent = '✓'; applyImageBtn.disabled = false; }, 1500);
    }
  };

  testImg.onerror = () => {
    if (!silent) {
      applyImageBtn.textContent = '❌';
      applyImageBtn.disabled = false;
      setTimeout(() => { applyImageBtn.textContent = '✓'; }, 2000);
      alert(LANGS[currentLang].error_img);
    }
    // Silent fail: image url may have expired or CORS-blocked during preload,
    // try setting it directly as CSS anyway (CSS bg-image has no CORS restriction)
    if (silent) {
      bgImageLayer.style.backgroundImage = `url("${url}")`;
      bgImageLayer.style.opacity = String(opacity / 100);
      bgImageLayer.classList.add('has-image');
      bgOverlay.classList.add('has-image');
      currentBgImage = url;
      currentOpacity = opacity;
    }
  };

  testImg.src = url;
}

function removeImage() {
  bgImageLayer.style.opacity = '0';
  setTimeout(() => {
    bgImageLayer.style.backgroundImage = '';
    bgImageLayer.classList.remove('has-image');       // display: none
    bgOverlay.classList.remove('has-image');
  }, 400);
  bgImageUrlEl.value = '';
  currentBgImage = '';
}

// ===== GLASS =====
function applyGlass(enabled, blur) {
  glassEnabled = enabled;
  glassBlur    = blur;
  document.body.classList.toggle('no-glass', !enabled);
  document.documentElement.style.setProperty('--glass-blur-amount', `${blur}px`);
}

// ===== IMAGE CONTROLS =====
applyImageBtn.addEventListener('click', () => {
  const url = bgImageUrlEl.value.trim();
  if (url) { applyBgImage(url, currentOpacity); } // saveSettings called inside onload
});
bgImageUrlEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') applyImageBtn.click();
});
bgImageOpacity.addEventListener('input', () => {
  currentOpacity = parseInt(bgImageOpacity.value);
  opacityValue.textContent = `${currentOpacity}%`;
  if (currentBgImage) { bgImageLayer.style.opacity = currentOpacity / 100; saveSettings(); }
});
removeImageBtn.addEventListener('click', () => { removeImage(); saveSettings(); });

// ===== GLASS CONTROLS =====
glassToggle.addEventListener('change', () => { applyGlass(glassToggle.checked, glassBlur); saveSettings(); });
glassIntensity.addEventListener('input', () => {
  glassBlur = parseInt(glassIntensity.value);
  glassValue.textContent = `${glassBlur}px`;
  document.documentElement.style.setProperty('--glass-blur-amount', `${glassBlur}px`);
  saveSettings();
});


// ===== SETTINGS PANEL =====
function openSettings() {
  settingsPanel.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSettings() {
  settingsPanel.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

settingsBtn.addEventListener('click', openSettings);
closeBtn.addEventListener('click', closeSettings);
overlay.addEventListener('click', closeSettings);

// ===== THEME SELECTION =====
themeGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.theme-card');
  if (!card) return;
  const theme = card.dataset.theme;
  applyTheme(theme);
  saveSettings();
});

// ===== APPLY CUSTOM CSS =====
applyCssBtn.addEventListener('click', () => {
  customCSS = cssEditor.value;
  applyCustomCSS(customCSS);
  saveSettings();

  // Button feedback
  applyCssBtn.textContent = '✅ Đã áp dụng!';
  setTimeout(() => { applyCssBtn.textContent = '✨ Áp dụng CSS'; }, 1800);
});

// ===== SEARCH =====
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }
});

// ===== STORAGE =====
function saveSettings() {
  const data = {
    theme: currentTheme,
    customCSS,
    bgImage: currentBgImage,
    bgOpacity: currentOpacity,
    glassEnabled,
    glassBlur,
    lang: currentLang
  };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ newtabSettings: data });
    } else {
      localStorage.setItem('newtabSettings', JSON.stringify(data));
    }
  } catch(e) { console.warn('Could not save settings:', e); }
}

function loadSettings() {
  const apply = (data) => {
    if (!data) return;
    if (data.theme)      applyTheme(data.theme);
    if (data.customCSS)  { customCSS = data.customCSS; cssEditor.value = data.customCSS; if (data.theme === 'custom') applyCustomCSS(data.customCSS); }
    if (data.bgImage) {
      const savedOpacity = data.bgOpacity ?? 60;
      bgImageUrlEl.value         = data.bgImage;
      bgImageOpacity.value       = savedOpacity;
      opacityValue.textContent   = `${savedOpacity}%`;
      applyBgImage(data.bgImage, savedOpacity, true); // silent — no button/alert
    }
    const ge = data.glassEnabled !== undefined ? data.glassEnabled : true;
    const gb = data.glassBlur    !== undefined ? data.glassBlur    : 20;
    glassToggle.checked    = ge;
    glassIntensity.value   = gb;
    glassValue.textContent = `${gb}px`;
    applyGlass(ge, gb);
    // Apply language last (updates text, re-runs clock)
    applyLanguage(data.lang || 'vi');
  };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get('newtabSettings', (result) => { apply(result.newtabSettings); });
    } else {
      const raw = localStorage.getItem('newtabSettings');
      if (raw) apply(JSON.parse(raw));
    }
  } catch(e) { console.warn('Could not load settings:', e); }
}

// ===== LANG BUTTONS =====
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.lang);
    saveSettings();
  });
});

// ===== INIT =====
loadSettings();
