// ===== INDEXEDDB UTILS =====
const DB_NAME = 'NewTabDB';
const DB_VERSION = 1;
const STORE_NAME = 'images';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveLocalImageDB(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(blob, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function getLocalImageDB(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

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
    advanced_settings: 'Cài đặt nâng cao',
    time_bg_toggle:    'Ảnh nền theo thời gian',
    time_bg_hint:      'Thiết lập ảnh khác nhau cho Sáng, Chiều, Tối, Đêm.',
    time_morning:      'Sáng (05:00 - 12:00)',
    time_afternoon:    'Chiều (12:00 - 18:00)',
    time_evening:      'Tối (18:00 - 22:00)',
    time_night:        'Đêm (22:00 - 05:00)',
    apply_time_bg:     'Áp dụng Ảnh theo thời gian',
    local_upload:      'Tải ảnh lên (Local)',
    unsplash_toggle:   'Ảnh nền theo từ khóa',
    todo_title:        'Mục tiêu hôm nay',
    section_sync:      'Dữ liệu & Đồng bộ',
    export_settings:   'Xuất cấu hình',
    import_settings:   'Nhập cấu hình',
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
    advanced_settings: 'Advanced Settings',
    time_bg_toggle:    'Time-based background',
    time_bg_hint:      'Set different images for morning, afternoon, evening, and night.',
    time_morning:      'Morning (05:00 - 12:00)',
    time_afternoon:    'Afternoon (12:00 - 18:00)',
    time_evening:      'Evening (18:00 - 22:00)',
    time_night:        'Night (22:00 - 05:00)',
    apply_time_bg:     'Apply Time Backgrounds',
    local_upload:      'Upload Local Image',
    unsplash_toggle:   'Dynamic Keyword Image',
    todo_title:        'Daily Focus',
    section_sync:      'Data & Sync',
    export_settings:   'Export Settings',
    import_settings:   'Import Settings',
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
const todoList       = document.getElementById('todoList');
const todoInput      = document.getElementById('todoInput');
// Image & Glass
const bgImageLayer   = document.getElementById('bgImageLayer');
const bgOverlay      = document.getElementById('bgOverlay');
const bgImageUrlEl   = document.getElementById('bgImageUrl');
const applyImageBtn  = document.getElementById('applyImageBtn');
const localUploadBtn = document.getElementById('localUploadBtn');
const localUploadInput = document.getElementById('localUploadInput');
const bgImageOpacity = document.getElementById('bgImageOpacity');
const opacityValue   = document.getElementById('opacityValue');
const removeImageBtn = document.getElementById('removeImageBtn');
const glassToggle    = document.getElementById('glassToggle');
const glassIntensity = document.getElementById('glassIntensity');
const glassValue     = document.getElementById('glassValue');
// Advanced Settings
const advancedToggleBtn = document.getElementById('advancedToggleBtn');
const advancedContent   = document.getElementById('advancedContent');
const timeBgToggle      = document.getElementById('timeBgToggle');
const timeBgInputs      = document.getElementById('timeBgInputs');
const applyTimeBgBtn    = document.getElementById('applyTimeBgBtn');
const bgMorning         = document.getElementById('bgMorning');
const bgAfternoon       = document.getElementById('bgAfternoon');
const bgEvening         = document.getElementById('bgEvening');
const bgNight           = document.getElementById('bgNight');

// Unsplash
const unsplashToggle    = document.getElementById('unsplashToggle');
const unsplashInputs    = document.getElementById('unsplashInputs');
const unsplashInput     = document.getElementById('unsplashInput');
const applyUnsplashBtn  = document.getElementById('applyUnsplashBtn');

// Sync
const exportSettingsBtn = document.getElementById('exportSettingsBtn');
const importSettingsBtn = document.getElementById('importSettingsBtn');
const importSettingsInput = document.getElementById('importSettingsInput');

// ===== STATE =====
let currentTheme    = 'aurora';
let customCSS       = '';
let currentBgImage  = '';
let currentOpacity  = 60;
let glassEnabled    = true;
let glassBlur       = 20;
let currentLang     = 'vi';
let timeBgEnabled   = false;
let timeBgUrls      = { morning: '', afternoon: '', evening: '', night: '' };
let currentPeriod   = ''; // tracks the active time period
let unsplashKeyword = '';
let unsplashEnabled = false;
let tasksList       = [];

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
function updateClock(forceBgUpdate = false) {
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
  
  let period = '';
  if      (hour >= 5  && hour < 12) { greetingEl.textContent = t.greeting_morning;   period = 'morning'; }
  else if (hour >= 12 && hour < 18) { greetingEl.textContent = t.greeting_afternoon; period = 'afternoon'; }
  else if (hour >= 18 && hour < 22) { greetingEl.textContent = t.greeting_evening;   period = 'evening'; }
  else                              { greetingEl.textContent = t.greeting_night;     period = 'night'; }
  
  // Apply time-based background if enabled
  if (timeBgEnabled && !unsplashEnabled) {
    if (period !== currentPeriod || forceBgUpdate) {
      currentPeriod = period;
      const url = timeBgUrls[period];
      if (url) {
        applyBgImage(url, currentOpacity, true);
      } else {
        removeImage();
      }
    }
  }
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
function applyBgImage(url, opacity, silent = false, isLocal = false) {
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
    currentBgImage = isLocal ? 'local' : url;
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
      currentBgImage = isLocal ? 'local' : url;
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
localUploadBtn.addEventListener('click', () => {
  localUploadInput.click();
});
localUploadInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const originalText = localUploadBtn.textContent;
  localUploadBtn.textContent = '⏳';
  try {
    await saveLocalImageDB('localBg', file);
    const url = URL.createObjectURL(file);
    applyBgImage(url, currentOpacity, false, true);
    bgImageUrlEl.value = '';
  } catch (err) {
    console.error('Failed to save local image', err);
    alert('Failed to save image locally.');
  } finally {
    localUploadBtn.textContent = originalText;
    e.target.value = '';
  }
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

// ===== ADVANCED SETTINGS =====
advancedToggleBtn.addEventListener('click', () => {
  advancedToggleBtn.classList.toggle('expanded');
  advancedContent.classList.toggle('expanded');
});

timeBgToggle.addEventListener('change', () => {
  timeBgEnabled = timeBgToggle.checked;
  timeBgInputs.classList.toggle('visible', timeBgEnabled);
  bgImageUrlEl.disabled = timeBgEnabled;
  applyImageBtn.disabled = timeBgEnabled;
  
  if (timeBgEnabled) {
    updateClock(true); // force background update for current period
  } else {
    // Revert to single image
    applyBgImage(currentBgImage, currentOpacity, true);
  }
  saveSettings();
});

applyTimeBgBtn.addEventListener('click', () => {
  timeBgUrls = {
    morning: bgMorning.value.trim(),
    afternoon: bgAfternoon.value.trim(),
    evening: bgEvening.value.trim(),
    night: bgNight.value.trim()
  };
  
  // Feedback
  const originalText = LANGS[currentLang].apply_time_bg;
  applyTimeBgBtn.textContent = '✅ ' + originalText;
  setTimeout(() => { applyTimeBgBtn.textContent = originalText; }, 1500);
  
  updateClock(true); // force application
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
// ===== UNSPLASH =====
unsplashToggle.addEventListener('change', () => {
  unsplashEnabled = unsplashToggle.checked;
  if (unsplashInputs) unsplashInputs.style.display = unsplashEnabled ? 'block' : 'none';
  if (unsplashEnabled && unsplashKeyword) {
    applyUnsplash();
  } else if (!unsplashEnabled) {
    // Revert to normal
    if (timeBgEnabled) {
      updateClock(true);
    } else if (currentBgImage === 'local') {
      getLocalImageDB('localBg').then(blob => {
        if (blob) applyBgImage(URL.createObjectURL(blob), currentOpacity, false, true);
      }).catch(console.error);
    } else {
      applyBgImage(currentBgImage, currentOpacity);
    }
  }
  saveSettings();
});

applyUnsplashBtn.addEventListener('click', () => {
  unsplashKeyword = unsplashInput.value.trim();
  applyUnsplash();
  saveSettings();
});

function applyUnsplash(silent = false) {
  if (!unsplashKeyword) return;
  const originalText = applyUnsplashBtn ? applyUnsplashBtn.textContent : '✓';
  if (applyUnsplashBtn && !silent) applyUnsplashBtn.textContent = '⏳';
  
  const url = `https://loremflickr.com/1920/1080/${encodeURIComponent(unsplashKeyword)}?random=${Date.now()}`;
  
  const testImg = new Image();
  testImg.onload = () => {
    applyBgImage(url, currentOpacity, silent);
    if (applyUnsplashBtn && !silent) {
      applyUnsplashBtn.textContent = '✅';
      setTimeout(() => { applyUnsplashBtn.textContent = originalText; }, 1500);
    }
  };
  testImg.onerror = () => {
    if (applyUnsplashBtn && !silent) {
      applyUnsplashBtn.textContent = '❌';
      setTimeout(() => { applyUnsplashBtn.textContent = originalText; }, 1500);
      alert('Failed to load dynamic background. Using fallback.');
    }
  };
  testImg.src = url;
}

// ===== EXPORT / IMPORT SETTINGS =====
exportSettingsBtn.addEventListener('click', () => {
  const data = {
    theme: currentTheme,
    customCSS,
    bgImage: currentBgImage,
    bgOpacity: currentOpacity,
    glassEnabled,
    glassBlur,
    lang: currentLang,
    timeBgEnabled,
    timeBgUrls,
    unsplashKeyword,
    unsplashEnabled,
    tasks: tasksList // include tasks in export
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'newtab_settings_backup.json';
  a.click();
  URL.revokeObjectURL(url);
  
  const originalText = exportSettingsBtn.textContent;
  exportSettingsBtn.textContent = '✅';
  setTimeout(() => { exportSettingsBtn.textContent = originalText; }, 1500);
});

importSettingsBtn.addEventListener('click', () => {
  importSettingsInput.click();
});

importSettingsInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      
      // Update local storage
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ newtabSettings: data });
        if (data.tasks) {
          chrome.storage.local.set({ newtabTasks: data.tasks });
        }
      } else {
        localStorage.setItem('newtabSettings', JSON.stringify(data));
        if (data.tasks) {
          localStorage.setItem('newtabTasks', JSON.stringify(data.tasks));
        }
      }
      
      // Reload settings & UI
      window.location.reload();
      
    } catch (err) {
      alert('Failed to parse settings JSON. Invalid file.');
      console.error(err);
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // reset
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
    lang: currentLang,
    timeBgEnabled,
    timeBgUrls,
    unsplashKeyword,
    unsplashEnabled
  };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ newtabSettings: data });
    } else {
      localStorage.setItem('newtabSettings', JSON.stringify(data));
    }
  } catch(e) { console.warn('Could not save settings:', e); }
}

function saveTasks() {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ newtabTasks: tasksList });
    } else {
      localStorage.setItem('newtabTasks', JSON.stringify(tasksList));
    }
  } catch(e) { console.warn('Could not save tasks:', e); }
}

function loadSettings() {
  const apply = (data) => {
    if (!data) return;
    if (data.theme)      applyTheme(data.theme);
    if (data.customCSS)  { customCSS = data.customCSS; cssEditor.value = data.customCSS; if (data.theme === 'custom') applyCustomCSS(data.customCSS); }
    // Load Advanced Settings First
    if (data.timeBgEnabled !== undefined) {
      timeBgEnabled = data.timeBgEnabled;
      timeBgToggle.checked = timeBgEnabled;
      timeBgInputs.classList.toggle('visible', timeBgEnabled);
      bgImageUrlEl.disabled = timeBgEnabled;
      applyImageBtn.disabled = timeBgEnabled;
    }
    if (data.unsplashEnabled !== undefined) {
      unsplashEnabled = data.unsplashEnabled;
      unsplashKeyword = data.unsplashKeyword || '';
      if (unsplashToggle) unsplashToggle.checked = unsplashEnabled;
      if (unsplashInput) unsplashInput.value = unsplashKeyword;
      if (unsplashInputs) unsplashInputs.style.display = unsplashEnabled ? 'block' : 'none';
    }
    if (data.timeBgUrls) {
      timeBgUrls = data.timeBgUrls;
      bgMorning.value = timeBgUrls.morning || '';
      bgAfternoon.value = timeBgUrls.afternoon || '';
      bgEvening.value = timeBgUrls.evening || '';
      bgNight.value = timeBgUrls.night || '';
    }

    if (data.bgImage) {
      const savedOpacity = data.bgOpacity ?? 60;
      bgImageUrlEl.value         = data.bgImage === 'local' ? '' : data.bgImage;
      bgImageOpacity.value       = savedOpacity;
      opacityValue.textContent   = `${savedOpacity}%`;
      currentBgImage             = data.bgImage;
      currentOpacity             = savedOpacity;
      if (unsplashEnabled && unsplashKeyword) {
        applyUnsplash(true);
      } else if (!timeBgEnabled) {
        if (data.bgImage === 'local') {
          getLocalImageDB('localBg').then(blob => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              applyBgImage(url, savedOpacity, true, true);
            }
          }).catch(console.error);
        } else {
          applyBgImage(data.bgImage, savedOpacity, true); // silent
        }
      }
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

function loadTasks() {
  const applyTasks = (tasks) => {
    if (tasks && Array.isArray(tasks)) {
      tasksList = tasks;
    } else {
      tasksList = [];
    }
    if (typeof renderTasks === 'function') renderTasks();
  };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get('newtabTasks', (result) => { applyTasks(result.newtabTasks); });
    } else {
      const raw = localStorage.getItem('newtabTasks');
      if (raw) applyTasks(JSON.parse(raw));
    }
  } catch(e) { console.warn('Could not load tasks:', e); }
}

// ===== TODO WIDGET =====
function renderTasks() {
  if (!todoList) return;
  todoList.innerHTML = '';
  tasksList.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasksList[index].completed = checkbox.checked;
      renderTasks();
      saveTasks();
    });
    
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = task.text;
    
    const delBtn = document.createElement('button');
    delBtn.className = 'todo-delete';
    delBtn.innerHTML = '×';
    delBtn.title = 'Delete';
    delBtn.addEventListener('click', () => {
      tasksList.splice(index, 1);
      renderTasks();
      saveTasks();
    });
    
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

if (todoInput) {
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = todoInput.value.trim();
      if (text) {
        tasksList.push({ text, completed: false });
        todoInput.value = '';
        renderTasks();
        saveTasks();
      }
    }
  });
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
loadTasks();
