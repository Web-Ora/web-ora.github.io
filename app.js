/* =====================================================================
   WebOra . comportamento condiviso (vanilla, nessuna dipendenza)

   Cosa fa, in ordine di avvio:
     1  lingua IT/EN  . dizionario da config.js, scelta ricordata
     2  dati          . WhatsApp, email, anno, città da config.js
     3  overlay       . pannello Chi siamo da destra, modale legale
     4  navbar        . vetro allo scorrimento, menu mobile
     5  comparse      . IntersectionObserver, mai un listener di scroll
     6  slideshow     . carosello dei lavori

   Nota: niente window.addEventListener('scroll') in questo file.
   Tutto ciò che reagisce alla posizione usa IntersectionObserver.
   ===================================================================== */

(function () {
  'use strict';

  var CFG = window.WEBORA_CONFIG || {};
  var DICT = CFG.dict || { it: {}, en: {} };
  var STORE_KEY = 'webora.lang';
  var lang = CFG.defaultLang || 'it';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------ */
  /* utilità                                                            */
  /* ------------------------------------------------------------------ */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function t(key) {
    var table = DICT[lang] || {};
    if (key in table) return table[key];
    var fallback = DICT.it || {};
    return key in fallback ? fallback[key] : key;
  }
  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* ------------------------------------------------------------------ */
  /* 1 . lingua                                                         */
  /* ------------------------------------------------------------------ */
  function readStoredLang() {
    try {
      var saved = window.localStorage.getItem(STORE_KEY);
      if (saved === 'it' || saved === 'en') return saved;
    } catch (e) {
      /* localStorage bloccato (finestra privata): si usa il default */
    }
    return null;
  }

  function storeLang(value) {
    try {
      window.localStorage.setItem(STORE_KEY, value);
    } catch (e) {
      /* non critico: la lingua vale solo per questa visita */
    }
  }

  function applyLang() {
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    $$('[data-i18n-html]').forEach(function (node) {
      node.innerHTML = t(node.getAttribute('data-i18n-html'));
    });
    $$('[data-i18n-aria]').forEach(function (node) {
      node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria')));
    });

    /* titolo e descrizione della pagina */
    if (DICT[lang] && DICT[lang]['meta.title']) document.title = t('meta.title');
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));

    /* i link WhatsApp portano un messaggio già scritto, tradotto */
    linkContacts();

    /* testi che arrivano dal config (ruoli del team, categorie dei lavori) */
    $$('[data-t-it]').forEach(function (node) {
      node.textContent = lang === 'en' ? node.getAttribute('data-t-en') : node.getAttribute('data-t-it');
    });

    /* stato del selettore */
    $$('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    storeLang(next);
    applyLang();
  }

  function initLang() {
    var stored = readStoredLang();
    if (stored) {
      /* la scelta fatta in una visita precedente vince sempre */
      lang = stored;
    } else if (CFG.autoDetectLang && (navigator.language || '').toLowerCase().indexOf('it') !== 0) {
      /* opzionale, si attiva dal config: browser non italiano, parte in inglese */
      lang = 'en';
    }
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest ? ev.target.closest('.lang button') : null;
      if (!btn) return;
      setLang(btn.getAttribute('data-lang'));
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2 . dati di contatto dal config                                    */
  /* ------------------------------------------------------------------ */
  function waHref(msgKey) {
    var num = (CFG.whatsappNumber || '').replace(/\D/g, '');
    var msg = encodeURIComponent(t(msgKey || 'wa.generic'));
    return 'https://wa.me/' + num + '?text=' + msg;
  }

  function prettyNumber() {
    var n = (CFG.whatsappNumber || '').replace(/\D/g, '');
    if (n.length < 9) return n;
    /* 39 320 332 3493 */
    return '+' + n.slice(0, 2) + ' ' + n.slice(2, 5) + ' ' + n.slice(5, 8) + ' ' + n.slice(8);
  }

  function linkContacts() {
    $$('[data-wa]').forEach(function (a) {
      a.setAttribute('href', waHref(a.getAttribute('data-wa') || 'wa.generic'));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  function injectConfig() {
    $$('[data-brand]').forEach(function (n) {
      n.textContent = CFG.brandName || 'WebOra';
    });
    /* il logo scrive Web in bianco e Ora in verde */
    var mark = CFG.brandMark || {};
    $$('[data-brand-prefix]').forEach(function (n) {
      n.textContent = mark.prefix || 'Web';
    });
    $$('[data-brand-accent]').forEach(function (n) {
      n.textContent = mark.accent || 'Ora';
    });
    $$('[data-city]').forEach(function (n) {
      n.textContent = CFG.legalCity || '';
    });
    $$('[data-year]').forEach(function (n) {
      n.textContent = String(new Date().getFullYear());
    });
    $$('[data-mail]').forEach(function (a) {
      a.setAttribute('href', 'mailto:' + (CFG.email || ''));
      if (a.hasAttribute('data-mail-text')) a.textContent = CFG.email || '';
    });
    $$('[data-tel]').forEach(function (a) {
      a.setAttribute('href', 'tel:+' + (CFG.whatsappNumber || '').replace(/\D/g, ''));
      if (a.hasAttribute('data-tel-text')) a.textContent = prettyNumber();
    });
    linkContacts();
  }

  /* ------------------------------------------------------------------ */
  /* 3 . overlay: pannello Chi siamo + modale legale                    */
  /* ------------------------------------------------------------------ */
  var overlays = {};
  var openOverlay = null;
  var lastFocus = null;

  function initials(name) {
    return (name || '?').trim().charAt(0).toUpperCase();
  }

  function teamMarkup() {
    var team = CFG.team || [];
    return team
      .map(function (m) {
        var hasProfile = m.linkedin && m.linkedin.indexOf('PROFILO-') === -1;
        /* il link LinkedIn compare solo se il profilo nel config è reale */
        var link = hasProfile
          ? '<a class="icon-btn" href="' +
            m.linkedin +
            '" target="_blank" rel="noopener" data-i18n-aria="about.linkedin" aria-label="LinkedIn">' +
            '<i class="ph ph-linkedin-logo" aria-hidden="true"></i></a>'
          : '';
        return (
          '<li class="member">' +
          '<span class="monogram" data-accent="' +
          (m.accent || 'volt') +
          '" aria-hidden="true">' +
          initials(m.name) +
          '</span>' +
          '<span class="stack stack--sm" style="gap:2px;flex:1;min-width:0">' +
          '<span class="t-h4">' +
          m.name +
          '</span>' +
          '<span class="muted" style="font-size:.875rem" data-t-it="' +
          (m.role || '') +
          '" data-t-en="' +
          (m.roleEn || m.role || '') +
          '">' +
          (m.role || '') +
          '</span>' +
          '</span>' +
          link +
          '</li>'
        );
      })
      .join('');
  }

  function buildAboutDrawer() {
    var drawer = el('aside', {
      class: 'drawer',
      id: 'about-panel',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'about-title',
      tabindex: '-1'
    });

    drawer.innerHTML =
      '<div class="drawer__head">' +
      '<span class="eyebrow" data-brand>WebOra</span>' +
      '<button class="icon-btn" data-close type="button" data-i18n-aria="about.close" aria-label="Chiudi">' +
      '<i class="ph ph-x" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="drawer__body">' +
      '<h2 class="t-h2 brandwash" id="about-title" data-i18n="about.title">Chi siamo</h2>' +
      '<p class="lead" data-i18n="about.lead"></p>' +
      '<hr class="rule">' +
      '<ul class="stack stack--sm">' +
      teamMarkup() +
      '</ul>' +
      '<p class="muted" data-i18n="about.body"></p>' +
      '</div>' +
      '<div class="drawer__foot">' +
      '<a class="btn btn--accent btn--lg btn--block" data-wa="wa.generic">' +
      '<i class="ph ph-whatsapp-logo" aria-hidden="true"></i>' +
      '<span data-i18n="cta.whatsapp">Scrivici su WhatsApp</span></a>' +
      '</div>';

    return drawer;
  }

  function legalBlock(titleKey, bodyKey) {
    return (
      '<section class="stack stack--sm">' +
      '<h3 class="t-h3" data-i18n="' +
      titleKey +
      '"></h3>' +
      '<p class="body" style="font-size:.9375rem;line-height:1.7" data-i18n="' +
      bodyKey +
      '"></p>' +
      '</section>'
    );
  }

  function buildLegalModal() {
    var modal = el('div', {
      class: 'modal',
      id: 'legal-modal',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'legal-title',
      tabindex: '-1'
    });

    modal.innerHTML =
      '<div class="modal__card">' +
      '<div class="drawer__head">' +
      '<h2 class="t-h4" id="legal-title" data-i18n="legal.title"></h2>' +
      '<button class="icon-btn" data-close type="button" data-i18n-aria="legal.close" aria-label="Chiudi">' +
      '<i class="ph ph-x" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="modal__body">' +
      legalBlock('legal.privacyTitle', 'legal.privacyBody') +
      '<hr class="rule">' +
      legalBlock('legal.cookieTitle', 'legal.cookieBody') +
      '<hr class="rule">' +
      legalBlock('legal.legalTitle', 'legal.legalBody') +
      '<p class="caption" data-i18n="legal.disclaimer"></p>' +
      '<p class="caption">' +
      '<span data-brand>WebOra</span> . <span data-city></span>, Italia . ' +
      '<a class="link-arrow" style="font-size:.75rem;display:inline" data-mail data-mail-text href="#"></a>' +
      '</p>' +
      '</div>' +
      '</div>';

    return modal;
  }

  function focusables(root) {
    return $$(
      'a[href], button:not([disabled]), input, select, textarea, summary, [tabindex]:not([tabindex="-1"])',
      root
    ).filter(function (n) {
      return n.offsetParent !== null || n === document.activeElement;
    });
  }

  function setBackgroundInert(on) {
    Array.prototype.forEach.call(document.body.children, function (child) {
      if (child.classList.contains('drawer') || child.classList.contains('modal')) return;
      if (child.classList.contains('scrim')) return;
      if (child.tagName === 'SCRIPT') return;
      if (on) child.setAttribute('inert', '');
      else child.removeAttribute('inert');
    });
  }

  function open(name) {
    var node = overlays[name];
    if (!node || openOverlay === name) return;
    lastFocus = document.activeElement;
    openOverlay = name;
    overlays.scrim.classList.add('is-open');
    node.classList.add('is-open');
    document.body.classList.add('is-locked');
    setBackgroundInert(true);
    $$('[data-open="' + name + '"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'true');
    });
    /* il pannello è ancora visibility:hidden in questo tick, e un elemento
       nascosto non può ricevere il focus: si aspetta il frame successivo */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var first = focusables(node)[0];
        (first || node).focus({ preventScroll: true });
      });
    });
  }

  function close() {
    if (!openOverlay) return;
    var node = overlays[openOverlay];
    node.classList.remove('is-open');
    overlays.scrim.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setBackgroundInert(false);
    $$('[data-open="' + openOverlay + '"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
    openOverlay = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function initOverlays() {
    overlays.scrim = el('div', { class: 'scrim', 'data-close': '', hidden: null });
    overlays.about = buildAboutDrawer();
    overlays.legal = buildLegalModal();

    document.body.appendChild(overlays.scrim);
    document.body.appendChild(overlays.about);
    document.body.appendChild(overlays.legal);

    document.addEventListener('click', function (ev) {
      var opener = ev.target.closest ? ev.target.closest('[data-open]') : null;
      if (opener) {
        ev.preventDefault();
        open(opener.getAttribute('data-open'));
        return;
      }
      /* la modale occupa tutto lo schermo sopra la velatura: un clic sullo
         sfondo arriva a lei, non alla velatura, quindi lo gestiamo qui */
      if (openOverlay && ev.target === overlays[openOverlay]) {
        close();
        return;
      }
      var closer = ev.target.closest ? ev.target.closest('[data-close]') : null;
      if (closer) {
        ev.preventDefault();
        close();
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (!openOverlay) return;
      if (ev.key === 'Escape') {
        close();
        return;
      }
      if (ev.key !== 'Tab') return;
      /* la tastiera resta dentro l'overlay aperto */
      var list = focusables(overlays[openOverlay]);
      if (!list.length) return;
      var first = list[0];
      var last = list[list.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4 . navbar                                                         */
  /* ------------------------------------------------------------------ */
  function initNav() {
    var nav = $('.nav');
    if (!nav) return;

    /* sentinella invisibile in cima: niente listener di scroll */
    var sentinel = el('div', {
      'aria-hidden': 'true',
      style: 'position:absolute;top:0;left:0;width:1px;height:1px'
    });
    document.body.prepend(sentinel);
    new IntersectionObserver(
      function (entries) {
        nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
      },
      { rootMargin: '-8px 0px 0px 0px' }
    ).observe(sentinel);

    /* menu mobile */
    var burger = $('.burger');
    var menu = $('.navmenu');
    if (burger && menu) {
      burger.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.innerHTML = isOpen
          ? '<i class="ph ph-x" aria-hidden="true"></i>'
          : '<i class="ph ph-list" aria-hidden="true"></i>';
        burger.setAttribute('aria-label', t(isOpen ? 'nav.menuClose' : 'nav.menuOpen'));
      });
      menu.addEventListener('click', function (ev) {
        if (ev.target.closest('a, button')) {
          menu.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.innerHTML = '<i class="ph ph-list" aria-hidden="true"></i>';
        }
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* 5 . comparse, riflessi, pillola flottante, atti                    */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (reduceMotion.matches) {
      items.forEach(function (n) {
        n.classList.add('is-in');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach(function (n) {
      io.observe(n);
    });
  }

  function initSpotlight() {
    if (reduceMotion.matches) return;
    $$('.spotlight').forEach(function (card) {
      card.addEventListener('pointermove', function (ev) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((ev.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((ev.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* invito a scorrere nella prima schermata.
     Sparisce quando i primi 80px della pagina escono di campo: una
     sentinella a quell'altezza, non un listener di scroll, cosi' il
     filtraggio lo fa il browser e non c'e' lavoro a ogni frame. */
  function initScrollCue() {
    var cue = $('[data-scroll-cue]');
    if (!cue) return;
    var mark = el('div', {
      'aria-hidden': 'true',
      style:
        'position:absolute;top:80px;left:0;width:1px;height:1px;pointer-events:none'
    });
    document.body.appendChild(mark);
    new IntersectionObserver(function (entries) {
      cue.classList.toggle('is-gone', !entries[0].isIntersecting);
    }).observe(mark);
  }

  function initFloatCta() {
    var cta = $('.float-cta');
    var hero = $('.hero') || $('[data-hero]');
    if (!cta || !hero) return;
    new IntersectionObserver(
      function (entries) {
        /* la pillola compare quando la hero, e il suo CTA, sono fuori campo */
        cta.classList.toggle('is-on', !entries[0].isIntersecting);
      },
      { threshold: 0.12 }
    ).observe(hero);
  }


  /* ------------------------------------------------------------------ */
  /* 6 . slideshow dei lavori                                           */
  /* ------------------------------------------------------------------ */
  /* Le carte arrivano da CFG.portfolio, così sostituire i lavori di
     esempio con quelli veri è una modifica sola, dentro config.js.
     Lo scorrimento è quello nativo del browser con snap: dito, trackpad
     e tastiera funzionano anche prima che questo codice parta. Qui
     aggiungiamo solo la carta a fuoco, la profondità e i due pulsanti. */
  function initFolio() {
    var track = $('[data-folio-track]');
    if (!track) return;

    var items = CFG.portfolio || [];
    if (!items.length) {
      /* nessun lavoro nel config: la sezione sparisce invece di restare vuota */
      var section = track.closest('.folio');
      if (section) section.hidden = true;
      return;
    }

    var prevBtn = $('[data-folio-prev]');
    var nextBtn = $('[data-folio-next]');
    var bar = $('[data-folio-bar]');
    var rail = bar ? bar.parentNode : null;
    var count = $('[data-folio-count]');

    track.innerHTML = items
      .map(function (w, i) {
        return (
          '<article class="folio__card">' +
          '<div class="folio__shot">' +
          '<img src="' + w.image + '" alt="' + (w.name || '') + '" ' +
          'loading="' + (i < 3 ? 'eager' : 'lazy') + '" decoding="async">' +
          '</div>' +
          '<div class="folio__meta">' +
          '<span class="folio__name">' + (w.name || '') + '</span>' +
          '<span class="folio__tag" data-t-it="' + (w.tag || '') + '" ' +
          'data-t-en="' + (w.tagEn || w.tag || '') + '">' + (w.tag || '') + '</span>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    var cards = $$('.folio__card', track);

    function pad(n) {
      return n < 10 ? '0' + n : String(n);
    }

    /* un passo è una carta più il suo spazio */
    function stepWidth() {
      if (cards.length < 2) return cards[0].offsetWidth;
      return cards[1].offsetLeft - cards[0].offsetLeft;
    }

    /* Tutto si ricava dalla posizione di scorrimento, non da un indice
       memorizzato: così prima e ultima carta non hanno casi speciali. */
    function sync() {
      var max = Math.max(0, track.scrollWidth - track.clientWidth);
      var left = track.scrollLeft;
      var step = stepWidth() || 1;
      var lead = Math.min(cards.length - 1, Math.round(left / step));

      /* profondità: quanto ogni carta è lontana dal centro della rotaia */
      var mid = track.clientWidth / 2;
      cards.forEach(function (card) {
        var center = card.offsetLeft - left + card.offsetWidth / 2;
        var d = Math.max(-1, Math.min(1, (center - mid) / mid));
        card.style.setProperty('--d', d.toFixed(3));
      });

      if (bar && rail) {
        var visible = track.clientWidth / track.scrollWidth;
        var barW = Math.max(0.12, Math.min(1, visible));
        bar.style.width = barW * 100 + '%';
        var free = rail.clientWidth * (1 - barW);
        bar.style.translate = (max ? (left / max) * free : 0).toFixed(1) + 'px';
      }
      if (count) count.textContent = pad(lead + 1) + ' / ' + pad(cards.length);
      /* i pulsanti si spengono ai due estremi veri dello scorrimento */
      if (prevBtn) prevBtn.disabled = left <= 1;
      if (nextBtn) nextBtn.disabled = left >= max - 1;
    }

    function slide(dir) {
      var step = stepWidth();
      track.scrollBy({
        left: dir * step,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
      /* lo scorrimento morbido finisce dopo: si ricontrolla a cose ferme */
      window.setTimeout(sync, reduceMotion.matches ? 60 : 520);
    }

    /* Durante lo slancio del dito l'osservatore scatta molte volte di
       seguito e ogni misura del layout costa: qui ne lasciamo passare al
       massimo una per fotogramma, così lo scorrimento sul telefono resta
       fluido anche su macchine lente. */
    var queued = false;
    function requestSync() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        sync();
      });
    }

    /* l'osservatore fa da sveglia a ogni cambio di inquadratura,
       il conto vero lo fa sync: nessun listener di scroll */
    var io = new IntersectionObserver(requestSync, {
      root: track,
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    });
    cards.forEach(function (c) {
      io.observe(c);
    });
    /* alla prima misura le immagini possono non essere ancora arrivate */
    sync();
    window.addEventListener('resize', requestSync);
    window.addEventListener('load', requestSync);

    if (prevBtn) prevBtn.addEventListener('click', function () { slide(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { slide(1); });

    track.addEventListener('keydown', function (ev) {
      if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
      ev.preventDefault();
      slide(ev.key === 'ArrowRight' ? 1 : -1);
    });

    /* trascinamento col mouse: dito e trackpad ce l'hanno già di loro */
    var dragging = false;
    var startX = 0;
    var startLeft = 0;

    track.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType !== 'mouse') return;
      dragging = true;
      startX = ev.clientX;
      startLeft = track.scrollLeft;
    });

    track.addEventListener('pointermove', function (ev) {
      if (!dragging) return;
      var dx = ev.clientX - startX;
      if (Math.abs(dx) > 4 && !track.classList.contains('is-dragging')) {
        track.classList.add('is-dragging');
        track.setPointerCapture(ev.pointerId);
      }
      if (!track.classList.contains('is-dragging')) return;
      track.scrollLeft = startLeft - dx;
      requestSync();
    });

    function endDrag(ev) {
      if (!dragging) return;
      dragging = false;
      if (!track.classList.contains('is-dragging')) return;
      track.classList.remove('is-dragging');
      if (ev && ev.pointerId !== undefined && track.hasPointerCapture(ev.pointerId)) {
        track.releasePointerCapture(ev.pointerId);
      }
      /* lo snap è tornato attivo: si aggancia alla carta più vicina */
      window.setTimeout(sync, 400);
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);
  }

  /* ------------------------------------------------------------------ */
  /* avvio                                                             */
  /* ------------------------------------------------------------------ */
  function boot() {
    initLang();
    initOverlays(); /* prima: così anche pannello e modale ricevono i dati */
    injectConfig();
    applyLang();
    initNav();
    initReveal();
    initSpotlight();
    initFloatCta();
    initScrollCue();
    initFolio();
    document.documentElement.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
