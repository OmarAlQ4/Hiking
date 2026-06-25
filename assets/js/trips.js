/* ═══════════════════════════════════════════
   trips.js – بيانات الرحلات، جلبها من السابابيز، وعرضها فقط
   ═══════════════════════════════════════════ */

/* ── بيانات احتياطية (تظهر لو قاعدة البيانات فاضية) ── */
var trips = [
  {
    id: 1,
    title: 'هايك وادي نمار مع شلال الغروب',
    type: 'هايكنق', location: 'الرياض',
    place: 'وادي نمار – غرب الرياض',
    startPoint: 'موقف وادي نمار الرئيسي، طريق الملك عبدالعزيز',
    mapUrl: 'https://maps.google.com/?q=وادي+نمار+الرياض',
    difficulty: 'easy', diffLabel: 'سهل',
    distance: '8 كم', duration: '5 ساعات', price: 180,
    includes: ['وجبة خفيفة', 'مياه', 'تأمين'],
    excludes: ['نقل', 'معدات'],
    seatsAvailable: 6, seatsTotal: 18,
    guide: 'أحمد الغامدي', organizer: 'فريق الجبل السعودي',
    rating: 5, reviews: 42,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    dates: [
      { label: 'الجمعة 20 يونيو 2025', seats: 6 },
      { label: 'الجمعة 4 يوليو 2025', seats: 12 },
      { label: 'الجمعة 18 يوليو 2025', seats: 18 },
    ],
    toBring: ['حذاء رياضي مريح', 'مياه إضافية', 'كريم حماية من الشمس', 'قبعة', 'وجبة خفيفة'],
    ageRange: 'من 12 سنة فأكثر · مناسب للعائلات والمبتدئين',
    badges: [{ text: 'سهل', cls: 'badge badge-diff-easy' }, { text: 'جديد', cls: 'badge badge-new' }],
    cardDate: '20 يونيو',
  },
  {
    id: 2,
    title: 'تسلق قمة جبل اللوز الثلجية',
    type: 'تسلق وصخور', location: 'تبوك',
    place: 'جبل اللوز – تبوك',
    startPoint: 'بوابة محمية جبل اللوز، طريق تبوك–شرما',
    mapUrl: 'https://maps.google.com/?q=جبل+اللوز+تبوك',
    difficulty: 'hard', diffLabel: 'صعب',
    distance: '14 كم', duration: 'يومين', price: 320,
    includes: ['خيام', 'وجبات', 'معدات تسلق', 'تأمين', 'مرشد'],
    excludes: ['نقل'],
    seatsAvailable: 3, seatsTotal: 12,
    guide: 'فيصل المطيري', organizer: 'خبراء القمم',
    rating: 5, reviews: 28,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
    dates: [
      { label: 'الخميس–الجمعة 25–26 يونيو 2025', seats: 3 },
      { label: 'الخميس–الجمعة 10–11 يوليو 2025', seats: 12 },
    ],
    toBring: ['ملابس طبقات دافئة', 'حذاء تسلق', 'كيس نوم', 'بطارية احتياطية', 'نظارة شمسية'],
    ageRange: 'من 18 سنة فأكثر · يشترط لياقة بدنية جيدة',
    badges: [{ text: 'صعب', cls: 'badge badge-diff-hard' }],
    cardDate: '25 يونيو',
  },
  {
    id: 3,
    title: 'ساكتون في شلالات وادي ضي بالباحة',
    type: 'ساكتون', location: 'الباحة',
    place: 'وادي ضي – الباحة',
    startPoint: 'مدخل وادي ضي، طريق الباحة–بلجرشي',
    mapUrl: 'https://maps.google.com/?q=وادي+ضي+الباحة',
    difficulty: 'mid', diffLabel: 'متوسط',
    distance: '6 كم', duration: '8 ساعات', price: 250,
    includes: ['معدات ساكتون', 'وجبة غداء', 'مياه', 'تأمين'],
    excludes: ['نقل'],
    seatsAvailable: 8, seatsTotal: 15,
    guide: 'سلطان القحطاني', organizer: 'مغامرو الجنوب',
    rating: 5, reviews: 61,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    dates: [
      { label: 'السبت 27 يونيو 2025', seats: 8 },
      { label: 'السبت 11 يوليو 2025', seats: 15 },
      { label: 'السبت 25 يوليو 2025', seats: 15 },
    ],
    toBring: ['ملابس مناسبة للماء', 'حذاء مائي', 'كريم حماية', 'منشفة', 'حقيبة مقاومة للماء'],
    ageRange: 'من 14 سنة فأكثر · لا يشترط خبرة سابقة',
    badges: [{ text: 'متوسط', cls: 'badge badge-diff-mid' }],
    cardDate: '27 يونيو',
  },
  {
    id: 4,
    title: 'ليلة تحت النجوم في جبال عسير',
    type: 'كمبينق', location: 'عسير',
    place: 'جبال عسير – أبها',
    startPoint: 'ميدان أبها الدولي، مقابل فندق الهيلتون',
    mapUrl: 'https://maps.google.com/?q=جبال+عسير+أبها',
    difficulty: 'easy', diffLabel: 'سهل',
    distance: '3 كم', duration: 'ليلة كاملة', price: 200,
    includes: ['خيمة', 'عشاء وإفطار', 'مياه وقهوة', 'تأمين'],
    excludes: ['نقل', 'معدات شخصية'],
    seatsAvailable: 14, seatsTotal: 20,
    guide: 'محمد آل زاهر', organizer: 'نادي الهواء الطلق',
    rating: 4, reviews: 35,
    image: 'https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80',
    dates: [
      { label: 'الثلاثاء–الأربعاء 30 يونيو – 1 يوليو 2025', seats: 14 },
      { label: 'الثلاثاء–الأربعاء 14–15 يوليو 2025', seats: 20 },
    ],
    toBring: ['كيس نوم دافئ', 'ملابس للبرد', 'مصباح يدوي', 'شاحن بطارية'],
    ageRange: 'مناسب لجميع الأعمار · مرحب بالعائلات',
    badges: [{ text: 'سهل', cls: 'badge badge-diff-easy' }],
    cardDate: '30 يونيو',
  },
  {
    id: 5,
    title: 'غروب الربع الخالي – 3 أيام برية',
    type: 'صحراء', location: 'الرياض',
    place: 'الربع الخالي – جنوب الرياض',
    startPoint: 'استراحة العزيزية، طريق الرياض–وادي الدواسر',
    mapUrl: 'https://maps.google.com/?q=الربع+الخالي+السعودية',
    difficulty: 'mid', diffLabel: 'متوسط',
    distance: '120 كم (بالسيارة والمشي)', duration: '3 أيام', price: 450,
    includes: ['نقل 4×4', 'وجبات كاملة', 'خيام صحراوية', 'تأمين', 'مرشد'],
    excludes: ['ملابس شخصية'],
    seatsAvailable: 4, seatsTotal: 10,
    guide: 'ناصر الدوسري', organizer: 'روّاد الرمال',
    rating: 5, reviews: 19,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    dates: [
      { label: 'الخميس–السبت 5–7 يوليو 2025', seats: 4 },
      { label: 'الخميس–السبت 19–21 يوليو 2025', seats: 10 },
    ],
    toBring: ['ملابس خفيفة ودافئة لليل', 'نظارة شمسية', 'كريم حماية SPF50+', 'حذاء رمل'],
    ageRange: 'من 16 سنة فأكثر · يشترط لياقة متوسطة',
    badges: [{ text: 'متوسط', cls: 'badge badge-diff-mid' }, { text: '🔥 رائج', cls: 'badge badge-new' }],
    cardDate: '5 يوليو',
  },
  {
    id: 6,
    title: 'هايك شلالات الدفينة الخضراء',
    type: 'وادي', location: 'المدينة المنورة',
    place: 'وادي الدفينة – المدينة المنورة',
    startPoint: 'مدخل الوادي من جهة طريق العيون',
    mapUrl: 'https://maps.google.com/?q=شلالات+الدفينة+المدينة+المنورة',
    difficulty: 'easy', diffLabel: 'سهل',
    distance: '7 كم', duration: '4 ساعات', price: 160,
    includes: ['وجبة خفيفة', 'مياه', 'تأمين'],
    excludes: ['نقل', 'معدات'],
    seatsAvailable: 18, seatsTotal: 25,
    guide: 'عمر الأنصاري', organizer: 'طريق المشي',
    rating: 4, reviews: 53,
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    dates: [
      { label: 'الثلاثاء 8 يوليو 2025', seats: 18 },
      { label: 'الثلاثاء 22 يوليو 2025', seats: 25 },
      { label: 'الثلاثاء 5 أغسطس 2025', seats: 25 },
    ],
    toBring: ['حذاء رياضي', 'مياه (1.5 لتر)', 'كاميرا', 'وجبة خفيفة'],
    ageRange: 'مناسب لجميع الأعمار · مرحب بالأطفال من 8 سنوات',
    badges: [{ text: 'سهل', cls: 'badge badge-diff-easy' }],
    cardDate: '8 يوليو',
  },
];

/* ── مصفوفة كل الرحلات (تبدأ بالاحتياطية وتتحدث من السابابيز) ── */
var allTrips = trips.slice();

/* ── عرض بطاقات الرحلات في الشبكة ── */
function renderCards(list) {
  var grid = document.getElementById('tripsGrid');

  if (!list || list.length === 0) {
    grid.innerHTML = '<p style="color:var(--mist);text-align:center;grid-column:1/-1;padding:40px">لا توجد رحلات مطابقة</p>';
    return;
  }

  grid.innerHTML = list.map(function(t) {
    var starsHtml = '★'.repeat(t.rating) + (t.rating < 5 ? '☆'.repeat(5 - t.rating) : '');
    var badgesHtml = t.badges.map(function(b) { return '<span class="' + b.cls + '">' + b.text + '</span>'; }).join('');

    return '<div class="trip-card" onclick="openDetail(' + t.id + ')">' +
      '<div class="card-img-wrap">' +
        '<img class="card-img" src="' + t.image + '" alt="' + t.type + '" loading="lazy">' +
        '<div class="card-badges">' + badgesHtml + '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta">' +
          '<span class="card-type">' + t.type + '</span>' +
          '<span class="dot"></span>' +
          '<span class="card-loc">📍 ' + t.location + '</span>' +
        '</div>' +
        '<div class="card-title">' + t.title + '</div>' +
        '<div class="card-organizer">مع <span>' + t.organizer + '</span></div>' +
        '<div class="card-details">' +
          '<div class="detail-item">⏱ ' + t.duration + '</div>' +
          '<div class="detail-item">👥 ' + t.seatsTotal + ' شخص</div>' +
          '<div class="detail-item">📅 ' + t.cardDate + '</div>' +
        '</div>' +
        '<div class="card-footer">' +
          '<div>' +
            '<div class="card-price">' + t.price + ' ر<small>/شخص</small></div>' +
            '<div style="display:flex;align-items:center;gap:4px;margin-top:3px;">' +
              '<span class="stars">' + starsHtml + '</span>' +
              '<span class="reviews">(' + t.reviews + ')</span>' +
            '</div>' +
          '</div>' +
          '<button class="btn-book" onclick="event.stopPropagation();bookFromCard(' + t.id + ')">احجز ←</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ── فتح نافذة تفاصيل الرحلة ── */
function openDetail(id) {
  var t = allTrips.find(function(x) { return x.id == id; });
  if (!t) return;

  document.getElementById('dImg').src = t.image;
  document.getElementById('dTitle').textContent = t.title;
  document.getElementById('dOrganizer').textContent = t.organizer;
  document.getElementById('dGuideInline').textContent = 'مرشد: ' + t.guide;

  var starsHtml = '★'.repeat(t.rating) + (t.rating < 5 ? '☆'.repeat(5 - t.rating) : '');
  document.getElementById('dStars').textContent = starsHtml;
  document.getElementById('dRatingNum').textContent = t.rating + '.0';
  document.getElementById('dRatingCount').textContent = '(' + t.reviews + ' تقييم)';

  document.getElementById('dBadges').innerHTML = t.badges.map(function(b) {
    return '<span class="' + b.cls + '">' + b.text + '</span>';
  }).join('');

  var diffCls = t.difficulty === 'easy' ? 'diff-easy' : t.difficulty === 'mid' ? 'diff-mid' : 'diff-hard';

  document.getElementById('dInfoGrid').innerHTML =
    '<div class="detail-info-card"><div class="detail-info-label">الصعوبة</div><div class="detail-info-value"><span class="diff-pill ' + diffCls + '">' + t.diffLabel + '</span></div></div>' +
    '<div class="detail-info-card"><div class="detail-info-label">المسافة</div><div class="detail-info-value">' + t.distance + '</div></div>' +
    '<div class="detail-info-card"><div class="detail-info-label">المدة</div><div class="detail-info-value">' + t.duration + '</div></div>' +
    '<div class="detail-info-card"><div class="detail-info-label">المقاعد المتاحة</div><div class="detail-info-value clay">' + t.seatsAvailable + ' من ' + t.seatsTotal + '</div></div>';

  document.getElementById('dDates').innerHTML = t.dates.map(function(d, i) {
    var low = d.seats <= 4;
    var activeClass = i === 0 ? ' active-date' : '';
    var lowClass = low ? ' low' : '';
    var icon = low ? '🔴' : '🟢';
    return '<div class="detail-date-item' + activeClass + '">' +
      '<span class="date-label">📅 ' + d.label + '</span>' +
      '<span class="date-seats' + lowClass + '">' + icon + ' ' + d.seats + ' مقعد متاح</span>' +
    '</div>';
  }).join('');

  document.getElementById('dPlace').textContent = t.place;
  document.getElementById('dStartPoint').textContent = t.startPoint;
  document.getElementById('dMapBtn').href = t.mapUrl;

  document.getElementById('dGuideName').textContent = t.guide;
  document.getElementById('dGuideAvatar').textContent = t.guide.charAt(0);

  var incHtml = t.includes.map(function(x) { return '<span class="include-tag">✓ ' + x + '</span>'; }).join('');
  var excHtml = t.excludes.map(function(x) { return '<span class="exclude-tag">✗ ' + x + '</span>'; }).join('');
  document.getElementById('dIncludes').innerHTML = incHtml + excHtml;

  document.getElementById('dBring').innerHTML = t.toBring.map(function(x) {
    return '<span class="bring-item">' + x + '</span>';
  }).join('');

  document.getElementById('dAge').textContent = t.ageRange;
  document.getElementById('dPriceFooter').textContent = t.price + ' ريال';

  document.getElementById('dBookBtn').onclick = function() {
    closeDetail();
    openBooking(t.title, t.type, t.location, String(t.price));
  };

  var overlay = document.getElementById('detailOverlay');
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

/* ── إغلاق نافذة التفاصيل ── */
function closeDetail() {
  document.getElementById('detailOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── إغلاق بالضغط خارج النافذة ── */
document.getElementById('detailOverlay').addEventListener('click', function(e) {
  if (e.target === document.getElementById('detailOverlay')) closeDetail();
});

/* ── جلب الرحلات من السابابيز ── */
async function loadTrips() {
  try {
    var { data, error } = await sb
      .from('trips')
      .select('*, trip_dates(*)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      allTrips = data.map(function(t) {
        var diffLabel = t.difficulty === 'easy' ? 'سهل' : t.difficulty === 'mid' ? 'متوسط' : 'صعب';
        var cardDate = (t.trip_dates && t.trip_dates[0]) ? t.trip_dates[0].date_label : '';

        return {
          id: t.id,
          title: t.title,
          type: t.type,
          location: t.location,
          place: t.place,
          startPoint: t.start_point,
          mapUrl: t.map_url,
          difficulty: t.difficulty,
          diffLabel: diffLabel,
          distance: t.distance,
          duration: t.duration,
          price: t.price,
          includes: t.includes || [],
          excludes: t.excludes || [],
          seatsAvailable: t.seats_available,
          seatsTotal: t.seats_total,
          guide: t.guide,
          organizer: t.organizer_id,
          rating: 5,
          reviews: 0,
          image: t.image_url,
          dates: (t.trip_dates || []).map(function(d) { return { label: d.date_label, seats: d.seats }; }),
          toBring: t.to_bring || [],
          ageRange: t.age_range,
          badges: [{ text: diffLabel, cls: 'badge badge-diff-' + t.difficulty }],
          cardDate: cardDate,
        };
      });
    }
  } catch (err) {
    console.warn('ما قدرت أجلب من السابابيز، استخدم البيانات الاحتياطية:', err);
  }

  renderCards(allTrips);
}
