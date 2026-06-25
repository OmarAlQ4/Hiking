async function doLogin() {
  var email = document.getElementById('loginEmail').value.trim();
  var pass  = document.getElementById('loginPass').value;
  if (!email || !pass) return showToast('أدخل الإيميل وكلمة المرور', 'error');

  var { data, error } = await sb.auth.signInWithPassword({ email: email, password: pass });
  if (error) return showToast('خطأ: ' + error.message, 'error');

  closeModal('authModal');
  showToast('أهلاً بعودتك لخُطوة! 👋', 'success');
}

async function doRegister() {
  var name  = document.getElementById('regName').value.trim();
  var email = document.getElementById('regEmail').value.trim();
  var pass  = document.getElementById('regPass').value;
  if (!name || !email || !pass) return showToast('أكمل جميع الحقول', 'error');
  if (pass.length < 6) return showToast('كلمة المرور لازم 6 أحرف على الأقل', 'error');

  var { data, error } = await sb.auth.signUp({
    email: email, password: pass,
    options: { data: { full_name: name } }
  });
  if (error) return showToast('خطأ: ' + error.message, 'error');

  closeModal('authModal');
  showToast('✅ تم التسجيل! تحقق من إيميلك لتفعيل حسابك في خُطوة', 'success');
}

async function doLogout() {
  var { error } = await sb.auth.signOut();
  if (error) return showToast('خطأ: ' + error.message, 'error');
  currentUser = null;
  currentUserRole = null;
  updateNavUI();
  showToast('تم تسجيل الخروج – نراكم في رحلة قادمة! 🥾', 'success');
}

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

function handleUserMenu() {
  if (currentUserRole === 'organizer' || currentUserRole === 'admin') {
    window.location.href = 'admin/dashboard.html';
  } else {
    showToast('مرحباً في خُطوة، ' + (currentUser.user_metadata?.full_name || '') + '! 🥾', 'success');
  }
}
