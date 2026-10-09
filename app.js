/* Maew Auan Cafe (กาแฟแมวอ้วน) v2 — app.js : vanilla JS, no dependencies. B&W ink doodles. */
(function () {
  'use strict';

  var INK = '#1F1C1A';

  var MENU_DATA = [
    { id: 'espresso', nameTh: 'เอสเพรสโซ', nameEn: 'Espresso', descTh: 'ช็อตเข้มข้น หอมมัน แมวอ้วนตื่นทันทีในจิบเดียว', descEn: 'Bold single-origin shot, syrupy and nutty.', priceHot: 60, priceIced: null, cats: ['hot'], badge: 'ร้อนเท่านั้น', doodle: 'shot', caption: 'แมวอ้วนตาโตถือแก้วช็อตเล็กจิ๋วแต่แจ๋ว!' },
    { id: 'esyen', nameTh: 'เอส-เย็น', nameEn: 'Es-Yen', descTh: 'เอสเพรสโซ่เย็นจัด เข้มสะใจ สดชื่นทั้งวัน', descEn: 'Iced espresso on the rocks — bold, cold, refreshing.', priceHot: null, priceIced: 70, cats: ['iced'], badge: 'เย็นเท่านั้น', doodle: 'esyen', caption: 'แมวอ้วนจุ่มน้ำแข็ง เอส-เย็นซ่า สดชื่น!' },
    { id: 'americano', nameTh: 'อเมริกาโน่', nameEn: 'Americano', descTh: 'สดชื่น คลีน ดื่มง่าย หอมกาแฟแท้ไม่ขมโดด', descEn: 'Clean crisp black coffee, gentle cocoa finish.', priceHot: 60, priceIced: 70, cats: ['hot', 'iced'], doodle: 'pool', caption: 'แมวอ้วนลอยน้ำในแก้วอเมริกาโน่เย็น!' },
    { id: 'latte', nameTh: 'ลาเต้', nameEn: 'Latte', descTh: 'นุ่มละมุน นมสดหวานมัน เข้ากันกับเอสเพรสโซอย่างลงตัว', descEn: 'Silky steamed milk over espresso — mellow & milky.', priceHot: 70, priceIced: 80, cats: ['hot', 'iced'], doodle: 'foam', caption: 'แมวอ้วนกลิ้งบนฟองนมนุ่มๆ เมี้ยว~' },
    { id: 'cappuccino', nameTh: 'คาปูชิโน', nameEn: 'Cappuccino', descTh: 'ฟองนมหนานุ่ม โรยโกโก้เบาๆ เข้มกว่าลาเต้นิดๆ', descEn: 'Classic espresso, steamed milk, airy foam + cocoa.', priceHot: 70, priceIced: 80, cats: ['hot', 'iced'], doodle: 'hat', caption: 'แมวอ้วนใส่หมวกฟองนมฟูๆ!' },
    { id: 'mocha', nameTh: 'มอคค่า', nameEn: 'Mocha', descTh: 'กาแฟผสานช็อกโกแลตเข้มข้น หวานละมุนเหมือนขนมแมว', descEn: 'Espresso meets rich chocolate — cozy & dessert-like.', priceHot: 75, priceIced: 85, cats: ['hot', 'iced'], doodle: 'choco', caption: 'แมวอ้วนตกถังช็อกโกแลต ฟินสุดๆ!' },
    { id: 'hokkaido', nameTh: 'แมวอ้วนฮอกไกโด', nameEn: 'Maew Auan Hokkaido', descTh: 'ซิกเนเจอร์นมฮอกไกโด หอมมัน ละมุนกลมกล่อม', descEn: 'Signature Hokkaido-milk latte — creamy, mellow, silky.', priceHot: null, priceIced: 99, cats: ['signature', 'iced'], badge: 'Signature ★ ขายดี', doodle: 'hokkaido', caption: 'แมวอ้วนดำผุดดำว่ายในนมฮอกไกโด!' },
    { id: 'coconut', nameTh: 'แมวอ้วนโคโคนัท', nameEn: 'Maew Auan Coconut', descTh: 'ซิกเนเจอร์นมมะพร้าว หอมโคโคนัท สดชื่นกลมกล่อม', descEn: 'Signature coconut-milk latte — nutty, fresh, tropical.', priceHot: null, priceIced: 99, cats: ['signature', 'iced'], badge: 'Signature ★ ใหม่', doodle: 'coconut', caption: 'แมวอ้วนปีนต้นมะพร้าว กลิ่นโคโคนัทหอมฟุ้ง!' },
    { id: 'dirty', nameTh: 'แมวอ้วนไม่อาบน้ำ', nameEn: 'Maew Auan Dirty', descTh: 'นมเย็นจัดราดช็อตร้อน แยกชั้นสวย เข้ม หอม ต้องรีบจิบ', descEn: 'Cold milk + hot ristretto shot. Layered, sip fast.', priceHot: null, priceIced: 95, cats: ['signature', 'iced'], badge: 'Signature ★', doodle: 'dirty', caption: 'แมวอ้วนไม่อาบน้ำ เลอะกาแฟเต็มหนวด!' }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function catEmoji(kind) {
    // emoji แมว — คละใหม่ 9 เมนู ไม่ซ้ำกันเลย
    var emoji = '';

    if (kind === 'shot') {
      // เอสเพรสโซ — แมวยิ้มตาโต ตื่นเต็มที่
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวยิ้มตาโต">😺</span>';
    }
    else if (kind === 'esyen') {
      // เอส-เย็น — แมวตาหยี สดชื่นเย็นฉ่ำ
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวตาหยี">😸</span>';
    }
    else if (kind === 'pool') {
      // อเมริกาโน่ — แมวมาดเท่ สายคลีน
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวมาดเท่">😼</span>';
    }
    else if (kind === 'foam') {
      // ลาเต้ — แมวตาหัวใจ หลงรักฟองนม
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวตาหัวใจ">😻</span>';
    }
    else if (kind === 'hat') {
      // คาปูชิโน่ — แมวหัวเราะ ฟองนมสนุก
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวหัวเราะ">😹</span>';
    }
    else if (kind === 'choco') {
      // มอคค่า — แมวจู๋จี๋ หวานละมุน
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวจู๋จี๋">😽</span>';
    }
    else if (kind === 'hokkaido') {
      // แมวอ้วนฮอกไกโด — หน้านิ่ง นมละมุน
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวหน้านิ่ง">🐱</span>';
    }
    else if (kind === 'coconut') {
      // แมวอ้วนโคโคนัท — แมวสดใส กลิ่นมะพร้าว
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวสดใส">🐈</span>';
    }
    else {
      // แมวอ้วนไม่อาบน้ำ — แมวงอน ไม่ยอมอาบน้ำ
      emoji = '<span class="cat-emoji" role="img" aria-label="แมวงอน">😾</span>';
    }

    return emoji;
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
    var sig = it.cats.indexOf('signature') !== -1 ? ' is-sig' : '';
    return '<article class="menu-card' + sig + '" data-category="' + it.cats.join(' ') + '" data-id="' + it.id + '">'
      + badge + SCRIBBLE
      + '<div class="card-art art-' + (i % 4) + '">' + catEmoji(it.doodle) + '</div>'
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
