// ================================================================
// ui.js — DOM References and All Event Listeners
// Depends on: config.js, state.js, background.js, storage.js, todo.js
// ================================================================

// ===== DOM REFS =====
const clockEl           = document.getElementById('clock');
const dateEl            = document.getElementById('dateDisplay');
const greetingEl        = document.getElementById('greeting');
const settingsBtn       = document.getElementById('settingsBtn');
const settingsPanel     = document.getElementById('settingsPanel');
const overlay           = document.getElementById('settingsOverlay');
const closeBtn          = document.getElementById('closeSettings');
const themeGrid         = document.getElementById('themeGrid');
const cssEditor         = document.getElementById('cssEditor');
const applyCssBtn       = document.getElementById('applyCssBtn');
const customCssStyle    = document.getElementById('customCssStyle');
const cssSection        = document.getElementById('cssEditorSection');
const searchInput       = document.getElementById('searchInput');
const starsContainer    = document.getElementById('starsContainer');
const todoList          = document.getElementById('todoList');
const todoInput         = document.getElementById('todoInput');
// Image & Glass
const bgImageLayer      = document.getElementById('bgImageLayer');
const bgOverlay         = document.getElementById('bgOverlay');
const bgImageUrlEl      = document.getElementById('bgImageUrl');
const applyImageBtn     = document.getElementById('applyImageBtn');
const localUploadBtn    = document.getElementById('localUploadBtn');
const localUploadInput  = document.getElementById('localUploadInput');
const bgImageOpacity    = document.getElementById('bgImageOpacity');
const opacityValue      = document.getElementById('opacityValue');
const removeImageBtn    = document.getElementById('removeImageBtn');
const glassToggle       = document.getElementById('glassToggle');
const glassIntensity    = document.getElementById('glassIntensity');
const glassValue        = document.getElementById('glassValue');
// Advanced Settings
const advancedToggleBtn = document.getElementById('advancedToggleBtn');
const advancedContent   = document.getElementById('advancedContent');
const timeBgToggle      = document.getElementById('timeBgToggle');
const timeBgInputs      = document.getElementById('timeBgInputs');
const applyTimeBgBtn    = document.getElementById('applyTimeBgBtn');
const bgMorning         = document.getElementById('bgMorning');
const bgNoon            = document.getElementById('bgNoon');
const bgAfternoon       = document.getElementById('bgAfternoon');
const bgEvening         = document.getElementById('bgEvening');
const bgNight           = document.getElementById('bgNight');
// Unsplash
const unsplashToggle    = document.getElementById('unsplashToggle');
const unsplashInputs    = document.getElementById('unsplashInputs');
const unsplashInput     = document.getElementById('unsplashInput');
const applyUnsplashBtn  = document.getElementById('applyUnsplashBtn');
// Dynamic Sun Times
const dynamicSunToggle  = document.getElementById('dynamicSunToggle');
// Sync
const exportSettingsBtn   = document.getElementById('exportSettingsBtn');
const importSettingsBtn   = document.getElementById('importSettingsBtn');
const importSettingsInput = document.getElementById('importSettingsInput');

// ===== I18N =====
function applyLanguage(lang) {
  currentLang = lang;
  const t = LANGS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  const cssHintEl = document.getElementById('cssHintEl');
  if (cssHintEl) cssHintEl.innerHTML = t.css_hint_html;
  searchInput.placeholder = t.search_placeholder;
  document.getElementById('htmlRoot').lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  updateClock(); // refresh greeting & date
}

// ===== IMAGE CONTROLS =====
applyImageBtn.addEventListener('click', () => {
  const url = bgImageUrlEl.value.trim();
  if (url) { applyBgImage(url, currentOpacity); }
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

// ===== SETTINGS PANEL OPEN/CLOSE =====
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
  applyTheme(card.dataset.theme);
  saveSettings();
});

// ===== APPLY CUSTOM CSS =====
applyCssBtn.addEventListener('click', () => {
  customCSS = cssEditor.value;
  applyCustomCSS(customCSS);
  saveSettings();
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
    updateClock(true);
  } else {
    applyBgImage(currentBgImage, currentOpacity, true);
  }
  saveSettings();
});

applyTimeBgBtn.addEventListener('click', () => {
  timeBgUrls = {
    morning:   bgMorning.value.trim(),
    noon:      bgNoon.value.trim(),
    afternoon: bgAfternoon.value.trim(),
    evening:   bgEvening.value.trim(),
    night:     bgNight.value.trim()
  };
  const originalText = LANGS[currentLang].apply_time_bg;
  applyTimeBgBtn.textContent = '✅ ' + originalText;
  setTimeout(() => { applyTimeBgBtn.textContent = originalText; }, 1500);
  updateClock(true);
  saveSettings();
});

// Dynamic Sun Toggle
if (dynamicSunToggle) {
  dynamicSunToggle.addEventListener('change', () => {
    dynamicSunEnabled = dynamicSunToggle.checked;
    if (dynamicSunEnabled && !sunTimesFetched) {
      fetchDynamicSunTimes().then(() => updateClock(true));
    } else {
      updateClock(true);
    }
    saveSettings();
  });
}

// ===== UNSPLASH =====
unsplashToggle.addEventListener('change', () => {
  unsplashEnabled = unsplashToggle.checked;
  if (unsplashInputs) unsplashInputs.style.display = unsplashEnabled ? 'block' : 'none';
  if (unsplashEnabled && unsplashKeyword) {
    applyUnsplash();
  } else if (!unsplashEnabled) {
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

// ===== EXPORT / IMPORT SETTINGS =====
exportSettingsBtn.addEventListener('click', () => {
  const data = {
    theme: currentTheme, customCSS,
    bgImage: currentBgImage, bgOpacity: currentOpacity,
    glassEnabled, glassBlur, lang: currentLang,
    timeBgEnabled, timeBgUrls, unsplashKeyword, unsplashEnabled,
    tasks: tasksList
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'newtab_settings_backup.json'; a.click();
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
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ newtabSettings: data });
        if (data.tasks) chrome.storage.local.set({ newtabTasks: data.tasks });
      } else {
        localStorage.setItem('newtabSettings', JSON.stringify(data));
        if (data.tasks) localStorage.setItem('newtabTasks', JSON.stringify(data.tasks));
      }
      window.location.reload();
    } catch (err) {
      alert('Failed to parse settings JSON. Invalid file.');
      console.error(err);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});

// ===== LANG BUTTONS =====
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.lang);
    saveSettings();
  });
});
