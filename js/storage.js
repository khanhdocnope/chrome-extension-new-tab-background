// ================================================================
// storage.js — Settings & Tasks Persistence (chrome.storage / localStorage)
// Depends on: state.js, utils.js, background.js, todo.js
// ================================================================

// ===== SAVE SETTINGS =====
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
    unsplashEnabled,
    dynamicSunEnabled
  };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ newtabSettings: data });
    } else {
      localStorage.setItem('newtabSettings', JSON.stringify(data));
    }
  } catch(e) { console.warn('Could not save settings:', e); }
}

// ===== SAVE TASKS =====
function saveTasks() {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ newtabTasks: tasksList });
    } else {
      localStorage.setItem('newtabTasks', JSON.stringify(tasksList));
    }
  } catch(e) { console.warn('Could not save tasks:', e); }
}

// ===== LOAD SETTINGS =====
function loadSettings() {
  const apply = (data) => {
    if (!data) return;

    if (data.theme)     applyTheme(data.theme);
    if (data.customCSS) {
      customCSS = data.customCSS;
      cssEditor.value = data.customCSS;
      if (data.theme === 'custom') applyCustomCSS(data.customCSS);
    }

    // Time-based backgrounds
    if (data.timeBgEnabled !== undefined) {
      timeBgEnabled = data.timeBgEnabled;
      timeBgToggle.checked = timeBgEnabled;
      timeBgInputs.classList.toggle('visible', timeBgEnabled);
      bgImageUrlEl.disabled = timeBgEnabled;
      applyImageBtn.disabled = timeBgEnabled;
    }

    // Unsplash
    if (data.unsplashEnabled !== undefined) {
      unsplashEnabled = data.unsplashEnabled;
      unsplashKeyword = data.unsplashKeyword || '';
      if (unsplashToggle) unsplashToggle.checked = unsplashEnabled;
      if (unsplashInput)  unsplashInput.value = unsplashKeyword;
      if (unsplashInputs) unsplashInputs.style.display = unsplashEnabled ? 'block' : 'none';
    }

    // Time BG URLs (including noon)
    if (data.timeBgUrls) {
      timeBgUrls = { morning: '', noon: '', afternoon: '', evening: '', night: '', ...data.timeBgUrls };
      bgMorning.value   = timeBgUrls.morning   || '';
      if (bgNoon)       bgNoon.value      = timeBgUrls.noon      || '';
      bgAfternoon.value = timeBgUrls.afternoon || '';
      bgEvening.value   = timeBgUrls.evening   || '';
      bgNight.value     = timeBgUrls.night     || '';
    }

    // Dynamic sun toggle
    if (data.dynamicSunEnabled !== undefined) {
      dynamicSunEnabled = data.dynamicSunEnabled;
      if (dynamicSunToggle) dynamicSunToggle.checked = dynamicSunEnabled;
    }

    // Background image
    if (data.bgImage) {
      const savedOpacity = data.bgOpacity ?? 60;
      bgImageUrlEl.value       = data.bgImage === 'local' ? '' : data.bgImage;
      bgImageOpacity.value     = savedOpacity;
      opacityValue.textContent = `${savedOpacity}%`;
      currentBgImage           = data.bgImage;
      currentOpacity           = savedOpacity;

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
          applyBgImage(data.bgImage, savedOpacity, true);
        }
      }
    }

    // Glass
    const ge = data.glassEnabled !== undefined ? data.glassEnabled : true;
    const gb = data.glassBlur    !== undefined ? data.glassBlur    : 20;
    glassToggle.checked    = ge;
    glassIntensity.value   = gb;
    glassValue.textContent = `${gb}px`;
    applyGlass(ge, gb);

    // Language last (refreshes all text)
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

// ===== LOAD TASKS =====
function loadTasks() {
  const applyTasks = (tasks) => {
    tasksList = (tasks && Array.isArray(tasks)) ? tasks : [];
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
