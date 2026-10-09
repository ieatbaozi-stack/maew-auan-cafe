/* Maew Auan Cafe (กาแฟแมวอ้วน) v2 — app.js : vanilla JS, no dependencies. B&W ink doodles. */
(function () {
  'use strict';

  var INK = '#1F1C1A';

  var MENU_DATA = [
    { id: 'espresso', nameTh: 'เอสเพรสโซ', nameEn: 'Espresso', descTh: 'ช็อตเข้มข้น หอมมัน แมวอ้วนตื่นทันทีในจิบเดียว', descEn: 'Bold single-origin shot, syrupy and nutty.', priceHot: 60, priceIced: 70, cats: ['hot', 'iced'], doodle: 'shot', caption: 'แมวอ้วนตาโตถือแก้วช็อตเล็กจิ๋วแต่แจ๋ว!' },
    { id: 'americano', nameTh: 'อเมริกาโน่', nameEn: 'Americano', descTh: 'สดชื่น คลีน ดื่มง่าย หอมกาแฟแท้ไม่ขมโดด', descEn: 'Clean crisp black coffee, gentle cocoa finish.', priceHot: 65, priceIced: 75, cats: ['hot', 'iced'], doodle: 'pool', caption: 'แมวอ้วนลอยน้ำในแก้วอเมริกาโน่เย็น!' },
    { id: 'latte', nameTh: 'ลาเต้', nameEn: 'Latte', descTh: 'นุ่มละมุน นมสดหวานมัน เข้ากันกับเอสเพรสโซอย่างลงตัว', descEn: 'Silky steamed milk over espresso — mellow & milky.', priceHot: 70, priceIced: 80, cats: ['hot', 'iced'], doodle: 'foam', caption: 'แมวอ้วนกลิ้งบนฟองนมนุ่มๆ เมี้ยว~' },
    { id: 'cappuccino', nameTh: 'คาปูชิโน', nameEn: 'Cappuccino', descTh: 'ฟองนมหนานุ่ม โรยโกโก้เบาๆ เข้มกว่าลาเต้นิดๆ', descEn: 'Classic espresso, steamed milk, airy foam + cocoa.', priceHot: 70, priceIced: 80, cats: ['hot', 'iced'], doodle: 'hat', caption: 'แมวอ้วนใส่หมวกฟองนมฟูๆ!' },
    { id: 'mocha', nameTh: 'มอคค่า', nameEn: 'Mocha', descTh: 'กาแฟผสานช็อกโกแลตเข้มข้น หวานละมุนเหมือนขนมแมว', descEn: 'Espresso meets rich chocolate — cozy & dessert-like.', priceHot: 75, priceIced: 85, cats: ['hot', 'iced'], doodle: 'choco', caption: 'แมวอ้วนตกถังช็อกโกแลต ฟินสุดๆ!' },
    { id: 'dirty', nameTh: 'เดอร์ตี้', nameEn: 'Dirty', descTh: 'นมเย็นจัดราดช็อตร้อน แยกชั้นสวย เข้ม หอม ต้องรีบจิบ', descEn: 'Cold milk + hot ristretto shot. Layered, sip fast.', priceHot: null, priceIced: 95, cats: ['iced'], badge: 'เย็นเท่านั้น', doodle: 'slurp', caption: 'แมวอ้วนเลอะหนวดกาแฟ ดูดหลอดอย่างไว!' },
    { id: 'maewauan', nameTh: 'ลาเต้แมวอ้วน', nameEn: 'Maew Auan Latte', descTh: 'ซิกเนเจอร์นมฮอกไกโด หอมวนิลานิดๆ วาดอุ้งเท้าทุกแก้ว', descEn: 'Signature Hokkaido-milk + vanilla, paw art every cup.', priceHot: 89, priceIced: 99, cats: ['signature', 'hot', 'iced'], badge: 'Signature ★ ขายดี', doodle: 'paw', caption: 'แมวอ้วนประทับอุ้งเท้าบนแก้วเธอ!' }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function doodleSVG(kind) {
    // B&W ink doodle: white fills, ink strokes. Happy variants (foam/pool/paw)
    // get closed joyful eyes + open smile; others classic dot eyes + omega mouth.
    // Signature/choco/hat get a chubby belly with paws + tail behind the cup.
    var isHappy = (kind === 'foam' || kind === 'pool' || kind === 'paw');
    var eyesMouth = isHappy
      ? '<path d="M41 51 q7 -8 14 0 M65 51 q7 -8 14 0" fill="none" stroke="' + INK + '" stroke-width="2.8" stroke-linecap="round"/>'
        + '<path d="M53 60 q7 9 14 0" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>'
      : '<circle cx="48" cy="50" r="3.4" fill="' + INK + '"/><circle cx="72" cy="50" r="3.4" fill="' + INK + '"/>'
        + '<path d="M52 62 q4 5 8 0 q4 5 8 0" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>';
    var face = '<ellipse cx="60" cy="52" rx="34" ry="30" fill="#fff" stroke="' + INK + '" stroke-width="3"/>'
      + '<path d="M32 30 L28 12 L46 24 Z M88 30 L92 12 L74 24 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>'
      + eyesMouth
      + '<path d="M22 54 l-12 -2 M23 60 l-11 3 M98 54 l12 -2 M97 60 l11 3" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>';
    var body = '';
    if (kind === 'paw' || kind === 'choco' || kind === 'hat') {
      body = '<ellipse cx="60" cy="98" rx="44" ry="18" fill="#fff" stroke="' + INK + '" stroke-width="3"/>'
        + '<ellipse cx="20" cy="96" rx="7" ry="9" fill="#fff" stroke="' + INK + '" stroke-width="2.6"/>'
        + '<ellipse cx="100" cy="96" rx="7" ry="9" fill="#fff" stroke="' + INK + '" stroke-width="2.6"/>'
        + '<path d="M100 104 q16 2 12 -12" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
    }
    var cup = '', extra = '';
    if (kind === 'shot') {
      cup = '<path d="M42 78 h36 l-4 26 h-28 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>'
        + '<path d="M78 84 q10 2 6 12 q-3 8 -11 6" fill="none" stroke="' + INK + '" stroke-width="3"/>'
        + '<path d="M50 86 l12 12 M58 86 l12 10" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>';
    }
    else if (kind === 'pool') {
      cup = '<path d="M30 72 h60 l-6 34 h-48 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>'
        + '<path d="M36 84 q8 -6 16 0 t16 0 t16 0" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>'
        + '<rect x="48" y="78" width="10" height="10" transform="rotate(12 53 83)" fill="#fff" stroke="' + INK + '" stroke-width="2"/>'
        + '<rect x="62" y="80" width="9" height="9" transform="rotate(-10 66 84)" fill="#fff" stroke="' + INK + '" stroke-width="2"/>';
    }
    else if (kind === 'foam') {
      cup = '<path d="M32 74 h56 l-5 32 h-46 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>'
        + '<ellipse cx="60" cy="72" rx="26" ry="10" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-dasharray="4 3"/>';
      extra = '<path d="M48 40 c-5 -7 5 -11 0 -18 M60 38 c-5 -7 5 -11 0 -18 M72 40 c-5 -7 5 -11 0 -18" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>';
    }
    else if (kind === 'hat') {
      cup = '<path d="M34 78 h52 l-5 28 h-42 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      extra = '<ellipse cx="60" cy="72" rx="30" ry="12" fill="#fff" stroke="' + INK + '" stroke-width="3"/>'
        + '<circle cx="44" cy="68" r="2.4" fill="' + INK + '"/><circle cx="60" cy="64" r="2.4" fill="' + INK + '"/><circle cx="76" cy="68" r="2.4" fill="' + INK + '"/>';
    }
    else if (kind === 'choco') {
      cup = '<path d="M30 74 h60 l-7 32 h-46 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>'
        + '<path d="M34 82 q13 10 26 0 t26 0" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>'
        + '<path d="M44 74 q4 8 0 13 M60 74 q-4 8 0 13 M76 74 q4 8 0 13" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>';
    }
    else if (kind === 'slurp') {
      cup = '<path d="M36 74 h48 l-5 32 h-38 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>'
        + '<path d="M70 40 L84 74" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
    }
    else {
      cup = '<path d="M32 74 h56 l-5 32 h-46 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      extra = '<g transform="translate(60 88)"><ellipse cx="0" cy="0" rx="9" ry="7.5" fill="' + INK + '"/><circle cx="-11" cy="-9" r="4" fill="' + INK + '"/><circle cx="-4" cy="-12" r="4" fill="' + INK + '"/><circle cx="4" cy="-12" r="4" fill="' + INK + '"/><circle cx="11" cy="-9" r="4" fill="' + INK + '"/></g>';
    }
    return '<svg viewBox="0 0 120 116" aria-hidden="true" focusable="false">' + extra + body + face + cup + '</svg>';
  }

  var SCRIBBLE = '<svg class="card-scribble" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 1.5v13M1.5 8h13M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function priceText(it) {
    if (it.priceHot && it.priceIced) return 'ร้อน ฿' + it.priceHot + ' · เย็น ฿' + it.priceIced;
    if (it.priceIced) return 'เย็น ฿' + it.priceIced;
    return 'ร้อน ฿' + it.priceHot;
  }

  var grid, emptyEl, filterBtns, current = 'all';

  function cardHTML(it, i) {
    var badge = it.badge ? '<span class="card-badge">' + esc(it.badge) + '</span>' : '';
    var sig = it.id === 'maewauan' ? ' is-sig' : '';
    return '<article class="menu-card' + sig + '" data-category="' + it.cats.join(' ') + '" data-id="' + it.id + '">'
      + badge + SCRIBBLE
      + '<div class="card-art art-' + (i % 4) + '">' + doodleSVG(it.doodle) + '</div>'
      + '<h3 class="card-name">' + esc(it.nameTh) + ' <span class="card-en" lang="en">' + esc(it.nameEn) + '</span></h3>'
      + '<p class="card-desc">' + esc(it.descTh) + '<br><span class="card-desc-en" lang="en">' + esc(it.descEn) + '</span></p>'
      + '<p class="card-caption">' + esc(it.caption) + '</p>'
      + '<div class="card-row"><span class="price-sticker">฿' + (it.priceHot || it.priceIced) + '</span>'
      + '<span class="card-price-note">' + esc(priceText(it)) + '</span></div>'
      + '</article>';
  }

  function renderMenu(filter) {
    current = filter || 'all';
    var shown = 0;
    var html = '';
    MENU_DATA.forEach(function (it, i) {
      var show = (current === 'all') || (it.cats.indexOf(current) !== -1);
      if (show) { html += cardHTML(it, i); shown++; }
    });
    grid.innerHTML = html;
    var cards = grid.querySelectorAll('.menu-card');
    cards.forEach(function (c, idx) {
      c.style.animationDelay = (idx * 60) + 'ms';
      c.classList.add('pop');
    });
    if (emptyEl) emptyEl.hidden = shown !== 0;
    updateCounts();
  }

  function updateCounts() {
    var counts = { all: MENU_DATA.length, hot: 0, iced: 0, signature: 0 };
    MENU_DATA.forEach(function (it) { it.cats.forEach(function (c) { if (counts[c] !== undefined) counts[c]++; }); });
    filterBtns.forEach(function (b) {
      var f = b.getAttribute('data-filter');
      var n = b.querySelector('.count');
      if (n && counts[f] !== undefined) n.textContent = counts[f];
    });
  }

  function activateFilter(f) {
    filterBtns.forEach(function (b) {
      var on = b.getAttribute('data-filter') === f;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderMenu(f);
  }

  function wireFilters() {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateFilter(btn.getAttribute('data-filter'));
      });
    });
  }

  function wireSigCta() {
    var sig = document.querySelector('[data-goto-sig]');
    if (!sig) return;
    sig.addEventListener('click', function () {
      activateFilter('signature');
    });
  }

  function wireNav() {
    var burger = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!burger || !links) return;
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }

  function wireYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    grid = document.getElementById('menu-grid');
    emptyEl = document.getElementById('menu-empty');
    filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    if (grid) renderMenu('all');
    if (filterBtns.length) wireFilters();
    wireSigCta();
    wireNav(); wireYear();
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  });

  window.__menu = { data: MENU_DATA, render: function (f) { renderMenu(f); return MENU_DATA.length; } };
})();
