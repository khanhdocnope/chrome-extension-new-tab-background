// ================================================================
// background.js — Theme, Background Image, Glass, Dynamic Sun Times
// Depends on: state.js, utils.js, config.js
// ================================================================

// ===== THEME =====
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  currentTheme = theme;

  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === theme);
  });

  // Show/hide CSS editor
  cssSection.classList.toggle('visible', theme === 'custom');

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
      saveSettings();
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
    // Silent fail: try setting it directly as CSS (no CORS restriction)
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
    bgImageLayer.classList.remove('has-image');
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

// ===== UNSPLASH (Dynamic Keyword Background) =====
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

// ===== DYNAMIC SUN TIMES =====
const SUN_CACHE_KEY = 'sunTimesCache';
const SUN_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function fetchDynamicSunTimes() {
  // Check cache first
  try {
    const raw = localStorage.getItem(SUN_CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw);
      if (Date.now() - cached.timestamp < SUN_CACHE_TTL) {
        sunTimes = cached.times;
        sunTimesFetched = true;
        return;
      }
    }
  } catch (e) { /* ignore */ }

  try {
    // Step 1: Get lat/lon from IP
    const geoResp = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    if (!geoResp.ok) throw new Error('geo failed');
    const geo = await geoResp.json();
    const { latitude, longitude } = geo;
    if (!latitude || !longitude) throw new Error('no coords');

    // Step 2: Get sun times
    const sunResp = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!sunResp.ok) throw new Error('sun api failed');
    const sunData = await sunResp.json();
    if (sunData.status !== 'OK') throw new Error('sun api status not OK');

    // Parse UTC ISO strings → local minutes-from-midnight
    const toLocalMins = (iso) => {
      const d = new Date(iso);
      return d.getHours() * 60 + d.getMinutes();
    };

    sunTimes = {
      sunrise:    toLocalMins(sunData.results.sunrise),
      solar_noon: toLocalMins(sunData.results.solar_noon),
      sunset:     toLocalMins(sunData.results.sunset),
    };
    sunTimesFetched = true;

    // Persist cache
    localStorage.setItem(SUN_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      times: sunTimes
    }));
  } catch (e) {
    // Offline or API error – silently fall back to fixed defaults
    console.warn('[SunTimes] Falling back to fixed times:', e.message);
    sunTimes = null;
    sunTimesFetched = true;
  }
}

function getSunPeriod(nowMins) {
  if (sunTimes) {
    const { sunrise, solar_noon, sunset } = sunTimes;
    const noonStart  = solar_noon - 90;
    const noonEnd    = solar_noon + 90;
    const eveningEnd = sunset + 180;
    if      (nowMins >= sunrise   && nowMins < noonStart)  return 'morning';
    else if (nowMins >= noonStart && nowMins < noonEnd)    return 'noon';
    else if (nowMins >= noonEnd   && nowMins < sunset)     return 'afternoon';
    else if (nowMins >= sunset    && nowMins < eveningEnd) return 'evening';
    else                                                   return 'night';
  }
  // Fixed fallback
  const h = Math.floor(nowMins / 60);
  if      (h >= 5  && h < 11) return 'morning';
  else if (h >= 11 && h < 13) return 'noon';
  else if (h >= 13 && h < 18) return 'afternoon';
  else if (h >= 18 && h < 22) return 'evening';
  else                        return 'night';
}
