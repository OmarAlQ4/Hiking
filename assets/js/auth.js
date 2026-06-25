/* ═══════════════════════════════════════════
   auth.js – تسجيل الدخول والتسجيل والخروج فقط
   ═══════════════════════════════════════════ */

/* ── تسجيل دخول ── */
async function doLogin() {
  var email = document.getElementById('loginEmail').value.trim();
  var pass  = document.getElementById('loginPass').value;

  if (!email || !pass) return alert('أدخل الإيميل وكلمة المرور');

  var { data, error } = await sb.auth.signInWithPassword({ email: email, password: pass });

  if (error) return alert('خطأ: ' + error.message);

  closeModal('authModal');
}

/* ── تسجيل حساب جديد ── */
async function doRegister() {
  var name  = document.getElementById('regName').value.trim();
  var email = document.getElementById('regEmail').value.trim();
  var pass  = document.getElementById('regPass').value;

  if (!name || !email || !pass) return alert('أكمل جميع الحقول');
  if (pass.length < 6) return alert('كلمة المرور لازم 6 أحرف على الأقل');

  var { data, error } = await sb.auth.signUp({
    email: email,
    password: pass,
    options: { data: { full_name: name } }
  });

  if (error) return alert('خطأ: ' + error.message);

  closeModal('authModal');
  alert('✅ تم التسجيل! تحقق من إيميلك لتفعيل الحساب');
}

/* ── تسجيل خروج ── */
async function doLogout() {
  var { error } = await sb.auth.signOut();
  if (error) return alert('خطأ: ' + error.message);

  currentUser = null;
  currentUserRole = null;
  updateNavUI();
}

/* ── الاستماع لتغير حالة المستخدم ── */
sb.auth.onAuthStateChange(function(event, session) {
  if (session && session.user) {
    currentUser = session.user;
    currentUserRole = session.user.user_metadata?.role || 'user';
  } else {
    currentUser = null;
    currentUserRole = null;
  }
  updateNavUI();
});

/* ── تحديث واجهة Nav حسب حالة الدخول ── */
function updateNavUI() {
  var loginBtn  = document.getElementById('navLoginBtn');
  var regBtn    = document.getElementById('navRegBtn');
  var userBtn   = document.getElementById('navUserBtn');
  var logoutBtn = document.getElementById('navLogoutBtn');

  if (currentUser) {
    var name = currentUser.user_metadata?.full_name || currentUser.email;
    userBtn.textContent = name.substring(0, 15);
    userBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'inline-block';
    loginBtn.style.display  = 'none';
    regBtn.style.display    = 'none';
  } else {
    userBtn.style.display   = 'none';
    logoutBtn.style.display = 'none';
    loginBtn.style.display  = 'inline-block';
    regBtn.style.display    = 'inline-block';
  }
}

/* ── قائمة المستخدم (للمستقبل) ── */
function handleUserMenu() {
  if (currentUserRole === 'organizer' || currentUserRole === 'admin') {
    window.location.href = 'admin/dashboard.html';
  } else {
    alert('مرحباً ' + (currentUser.user_metadata?.full_name || '') + '!\nحسابك: مستخدم عادي');
  }
}
