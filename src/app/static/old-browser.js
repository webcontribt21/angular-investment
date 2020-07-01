window.onload = function() {
  if (isOldBrowser()) {
    showOldBrowserPage();
  }
}

var TRANSLATIONS = {
  de: {
    MESSAGE: 'Sie sehen diese Seite, weil Sie einen Browser nutzen, welchen wir nicht unterstützen.\nZurzeit unterstützen wir die folgenden Browser:',
    TITLE: 'Verbessern Sie Ihr Nutzererlebnis'
  },
  en: {
    MESSAGE: 'You are seeing this page because you are using a browser we do not support.\nCurrently, we support the following browsers:',
    TITLE: 'Improve your experience'
  },
  zh: {
    MESSAGE: '您看到此页面，因为您使用的浏览器我们不支持。\n我们支持以下浏览器：',
    TITLE: '优化您的体验'
  }
};

function showOldBrowserPage() {
  var wrapper = document.getElementById('gm-old-browser');
  var app = document.querySelector('app-root');
  if (wrapper) {
    wrapper.className = 'gm-old-browser--show';
    translatePage();
    window.location.href = window.location.origin + '#old-browser';
  }
  if (app) {
    app.style.display = 'none';
    app.parentElement.removeChild(app);
  }
}
function translatePage() {
  var messageEl = document.getElementById('gm-old-browser-message');
  var langCode = Cookies ? Cookies.get('****_locale') || 'de' : 'de';
  if (messageEl) {
    var message = TRANSLATIONS[langCode].MESSAGE;
    messageEl.innerText = message;
    document.title = TRANSLATIONS[langCode].TITLE;
  }
}
function isOldBrowser() {
  return isOldIE() || isOldSafari();
}
function isOldIE() {
  return bowser.msie;
}
function isOldSafari() {
  return bowser.safari && getMainVersion(bowser.version) <= 9;
}
function getMainVersion(version) {
  return +(version + "").split(".")[0];
}
