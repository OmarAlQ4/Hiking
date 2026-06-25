/* ═══════════════════════════════════════════
   main.js – السلايدرز، النوافذ، الفلترة، الربط بين الملفات
   ═══════════════════════════════════════════ */

/* ── متغيرات عامة للحجز ── */
var currentBookPrice = 0;

/* ══════════════════════════════════════
   النوافذ المنبثقة (Modals)
   ══════════════════════════════════════ */

function openModal(type) {
  /* إغلاق كل النوافذ أولاً */
  document.querySelectorAll('.modal-overlay').forEach(function(m) {
    m.classList.remove('open');
  });

  var targetId = '';
  if (type === 'login' || type === 'register') {
    targetId = 'authModal';
    switchTab(type);
  } else if (type === 'organizer') {
    targetId = 'orgModal';
  }

  if (targetId) {
    document.getElementById(targetId).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* إغلاق بالضغط خارج النافذة */
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

/* ══════════════════════════════════════
   تبديل التبويبات (دخول / تسجيل)
   ══════════════════════════════════════ */

function switchTab(tab) {
  var loginTab  = document.getElementById('loginTab');
  var regTab    = document.getElementById('registerTab');
  var loginForm = document.getElementById('loginForm');
  var regForm   = document.getElementById('registerForm');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
  } else {
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    regForm.style.display = 'block';
    loginForm.style.display = 'none';
  }
}

/* ══════════════════════════════════════
   فلترة الأصناف
   ══════════════════════════════════════ */

function filterCat(el) {
  /* تحديث الشكل النشط */
  document.querySelectorAll('.cat-card').forEach(function(c) {
    c.classList.remove('active');
  });
  el.classList.add('active');

  var cat = el.getAttribute('data-cat');

  if (cat === 'الكل' || !cat) {
    renderCards(allTrips);
  } else {
    var filtered = allTrips.filter(function(t) {
      return t.type === cat;
    });
    renderCards(filtered);
  }
}

/* ══════════════════════════════════════
   البحث
   ══════════════════════════════════════ */

function doSearch() {
  var typeVal   = document.getElementById('searchType').value;
  var regionVal = document.getElementById('searchRegion').value;
  var diffVal   = document.getElementById('searchDiff').value;

  var filtered = allTrips.filter(function(t) {
    var matchType   = (typeVal === 'الكل') || (t.type === typeVal);
    var matchRegion = (regionVal === 'كل المناطق') || (t.location === regionVal);

    var diffMap = { 'سهل': 'easy', 'متوسط': 'mid', 'صعب': 'hard' };
    var matchDiff = (diffVal === 'أي مستوى') || (t.difficulty === diffMap[diffVal]);

    return matchType && matchRegion && matchDiff;
  });

  renderCards(filtered);

  /* تمرير لقسم الرحلات */
  document.getElementById('tripsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ══════════════════════════════════════
   نافذة الحجز
   ══════════════════════════════════════ */

function openBooking(title, type, location, price) {
  document.getElementById('bookTripName').textContent = title;
  document.getElementById('bookTripMeta').textContent = type + ' · ' + location;
  document.getElementById('numPersons').value = 1;
  currentBookPrice = parseInt(price) || 0;
  updateTotal();

  document.getElementById('bookModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function bookFromCard(id) {
  var t = allTrips.find(function(x) { return x.id == id; });
  if (!t) return;
  openBooking(t.title, t.type, t.location, String(t.price));
}

function updateTotal() {
  var num = parseInt(document.getElementById('numPersons').value) || 1;
  var total = currentBookPrice * num;
  document.getElementById('totalAmount').textContent = total + ' ريال';
}

function selectPay(btn) {
  document.querySelectorAll('.pay-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

function confirmBooking() {
  var name  = document.getElementById('bookName').value.trim();
  var phone = document.getElementById('bookPhone').value.trim();
  var num   = parseInt(document.getElementById('numPersons').value) || 1;

  if (!name) return alert('أدخل اسمك الكامل');
  if (!phone) return alert('أدخل رقم الجوال');

  if (!currentUser) {
    closeModal('bookModal');
    openModal('login');
    return alert('سجّل دخولك أولاً عشان تتمكن من الحجز');
  }

  /* هنا تقدر تضيف كود إرسال الحجز لجدول bookings في السابابيز */
  console.log('حجز جديد:', {
    trip: document.getElementById('bookTripName').textContent,
    name: name,
    phone: phone,
    persons: num,
    total: currentBookPrice * num,
    user: currentUser.id
  });

  closeModal('bookModal');
  alert('✅ تم تأكيد الحجز! راح توصلك رسالة تأكيد على الجوال.');
}

/* ══════════════════════════════════════
   نافذة تسجيل المنظم
   ══════════════════════════════════════ */

function confirmOrganizer() {
  var name  = document.getElementById('orgName').value.trim();
  var phone = document.getElementById('orgPhone').value.trim();
  var email = document.getElementById('orgEmail').value.trim();
  var types = document.getElementById('orgTypes').value.trim();

  if (!name || !phone || !email) return alert('أكمل جميع الحقول');

  /* هنا تقدر تضيف كود إرسال الطلب لجدول organizer_requests في السابابيز */
  console.log('طلب تنظيم جديد:', { name: name, phone: phone, email: email, types: types });

  closeModal('orgModal');
  alert('✅ تم إرسال طلبك! راح نراجعه ونواصلك خلال 48 ساعة.');
}

/* ══════════════════════════════════════
   إغلاق النوافذ بزر Escape
   ══════════════════════════════════════ */

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open, .detail-overlay.open').forEach(function(el) {
      el.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

/* ══════════════════════════════════════
   تشغيل الموقع عند التحميل
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  loadTrips();
});
