/* ═══════════════════════════════════════════
   supabase.js – تفاصيل الاتصال بقاعدة البيانات فقط
   ═══════════════════════════════════════════ */

const { createClient } = supabase;

const sb = createClient(
  'https://hbuinozezcvpqtqthpij.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidWlub3plemN2cHF0cXRocGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjczMjcsImV4cCI6MjA5NzIwMzMyN30.k87yVz4mO7iN1EjNlSNVu7LfA_Kjdh-fXOEhdOcO71c'
);

/* متغيرات حالة المستخدم – يشاركها auth.js و main.js */
var currentUser = null;
var currentUserRole = null;
