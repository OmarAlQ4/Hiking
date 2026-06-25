var currentBookPrice = 0;
var currentBookTitle = '';
var moyasarInstance = null;

function showToast(msg, type) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast ' + (type || '');
  toast.innerHTML = (type === 'success' ? '✅ ' : type === 'error' ? '❌ ' : 'ℹ️ ') + msg;
  document.body.appendChild(toast);
  setTimeout(function() { toast.classList.add('show'); }, 50);
  setTimeout(function() { toast.classList.remove('show'); setTimeout(function() { toast.remove(); }, 400); }, 3500);
}

function openModal(type) {
  document.querySelectorAll('.modal-overlay').forEach(function(m) { m.classList.remove('open'); });
  var targetId = '';
  if (type === 'login' || type === 'register') { targetId = 'authModal'; switchTab(type); }
  else if (type === 'organizer') { targetId = 'orgModal'; }
  if (targetId) { document.getElementById(targetId).classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  if (id === 'bookModal' && moyasarInstance) { try { moyasarInstance.unmount(); } catch(e) {} moyasarInstance = null; }
}

document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
  overlay.addEventListener('click', function(e) { if (e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; } });
});

function switchTab(tab) {
  var loginTab = document.getElementById('loginTab'), regTab = document.getElementById('registerTab');
  var loginForm = document.getElementById('loginForm'), regForm = document.getElementById('registerForm');
  if (tab === 'login') { loginTab.classList.add('active'); regTab.classList.remove('active'); loginForm.style.display = 'block'; regForm.style.display = 'none'; }
  else { regTab.classList.add('active'); loginTab.classList.remove('active'); regForm.style.display = 'block'; loginForm.style.display = 'none'; }
}

function filterCat(el) {
  document.querySelectorAll('.cat-card').forEach(function(c) { c.classList.remove('active'); });
  el.classList.add('active');
  var cat = el.getAttribute('data-cat');
  renderCards(!cat ? allTrips : allTrips.filter(function(t) { return t.type === cat; }));
}

function doSearch() {
  var typeVal = document.getElementById('searchType').value;
  var regionVal = document.getElementById('searchRegion').value;
  var diffVal = document.getElementById('searchDiff').value;
  var diffMap = { 'سهل': 'easy', 'متوسط': 'mid', 'صعب': 'hard' };
  var filtered = allTrips.filter(function(t) {
    return (typeVal === 'الكل' || t.type === typeVal) && (regionVal === 'كل المناطق' || t.location === regionVal) && (diffVal === 'أي مستوى' || t.difficulty === diffMap[diffVal]);
  });
  renderCards(filtered);
  document.getElementById('tripsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openBooking(title, type, location, price) {
  document.getElementById('bookTripName').textContent = title;
  document.getElementById('bookTripMeta').textContent = type + ' · ' + location;
  document.getElementById('numPersons').value = 1;
  currentBookPrice = parseInt(price) || 0;
  currentBookTitle = title;
  updateTotal();
  document.getElementById('moyasar-payment-section').style.display = 'none';
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
  document.getElementById('totalAmount').textContent = (currentBookPrice * num) + ' ريال';
  if (moyasarInstance) { try { moyasarInstance.updateAmount(currentBookPrice * num * 100); } catch(e) {} }
}

function selectPay(btn) {
  document.querySelectorAll('.pay-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}

function initMoyasarPayment() {
  var container = document.getElementById('moyasar-payment-element');
  if (!container) return;
  container.innerHTML = '<p style="color:var(--mist-dim);font-size:13px;">جاري تحميل نموذج الدفع...</p>';
  if (moyasarInstance) { try { moyasarInstance.unmount(); } catch(e) {} moyasarInstance = null; }
  var num = parseInt(document.getElementById('numPersons').value) || 1;
  var total = currentBookPrice * num;
  try {
    moyasarInstance = Moyasar.init({
      element: container, amount: total * 100, currency: 'SAR',
      description: 'حجز: ' + currentBookTitle + ' – خُطوة',
      publishable_api_key: 'pk_test_xxxxxxxxxxxxxxxxxx',
      callback_url: window.location.href,
      methods: ['applepay', 'card', 'stcpay'],
      apple_pay: { country: 'SA', label: 'خُطوة – رحلات', type: 'recurring' },
      stylenode: {
        base: { color: '#F5F8F5', fontFamily: 'Tajawal, sans-serif', fontWeight: '600', fontSize: '15px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '13px 16px', ':focus': { border: '1.5px solid #2D6B3F', boxShadow: '0 0 0 3px rgba(45,107,63,0.15)' }, '::placeholder': { color: 'rgba(143,184,154,0.4)' } }
      },
      on_completed: function(payment) { closeModal('bookModal'); showToast('✅ تم الدفع بنجاح في خُطوة! رقم: ' + payment.id, 'success'); },
      on_failed: function(error) { showToast('فشل الدفع: ' + (error.message || 'حاول مرة أخرى'), 'error'); }
    });
  } catch(e) { container.innerHTML = '<p style="color:var(--alert);font-size:13px;">خطأ في تحميل الدفع</p>'; }
}

function confirmBooking() {
  var name = document.getElementById('bookName').value.trim();
  var phone = document.getElementById('bookPhone').value.trim();
  if (!name) return showToast('أدخل اسمك الكامل', 'error');
  if (!phone) return showToast('أدخل رقم الجوال', 'error');
  if (!currentUser) { closeModal('bookModal'); setTimeout(function() { openModal('login'); }, 300); return showToast('سجّل دخولك أولاً عشان تكمل خطوتك', 'error'); }
  var paySection = document.getElementById('moyasar-payment-section');
  if (paySection) { paySection.style.display = 'block'; initMoyasarPayment(); showToast('اختر طريقة الدفع وأكمل خطوتك 💳', 'success'); }
  else { closeModal('bookModal'); showToast('✅ تم تأكيد الحجز في خُطوة!', 'success'); }
}

function confirmOrganizer() {
  var name = document.getElementById('orgName').value.trim();
  var phone = document.getElementById('orgPhone').value.trim();
  var email = document.getElementById('orgEmail').value.trim();
  if (!name || !phone || !email) return showToast('أكمل جميع الحقول', 'error');
  closeModal('orgModal');
  showToast('✅ تم إرسال طلبك لخُطوة! راح نواصلك خلال 48 ساعة', 'success');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { document.querySelectorAll('.modal-overlay.open, .detail-overlay.open').forEach(function(el) { el.classList.remove('open'); }); document.body.style.overflow = ''; }
});

function handleScrollAnimations() {
  document.querySelectorAll('.section-header, .organizer-cta, .review-card').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
  });
}
window.addEventListener('scroll', handleScrollAnimations);

document.addEventListener('DOMContentLoaded', function() { loadTrips(); handleScrollAnimations(); });
