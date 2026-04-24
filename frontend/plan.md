# خطة محاكاة الـ Authentication & Routing في الواجهة فقط (بدون API)

## الهدف

- حماية الصفحات الخاصة (Protected Routes) بحيث لا يصل إليها إلا المستخدم المسجل.
- توجيه كل مستخدم للداشبورد الخاص بدوره (Role) بعد تسجيل الدخول.
- محاكاة تسجيل الدخول والخروج وتغيير الدور بدون باك-إند.

---

## الخطوات

### 1. إنشاء Context لإدارة حالة المستخدم (AuthContext)

- يحتوي على:
  - بيانات المستخدم (id, name, role, ...)
  - توكن وهمي (token)
  - دوال login, logout, switchRole
- يخزن البيانات في localStorage أو sessionStorage للمحاكاة.

### 2. إنشاء AuthGuard

- يتحقق من وجود المستخدم/التوكن في الـ Context.
- إذا لم يوجد: يوجه المستخدم لصفحة /login.
- إذا وجد: يسمح بالوصول للصفحة المطلوبة.

### 3. إنشاء RoleGuard

- يتحقق من دور المستخدم الحالي (role).
- إذا لم يكن الدور ضمن الأدوار المسموحة: يوجه المستخدم لصفحة /unauthorized.
- إذا كان الدور صحيح: يسمح بالوصول.

### 4. إعداد AppRouter

- تعريف جميع المسارات (Routes):
  - صفحات عامة (Public): /, /login, /register, /forgot-password ... إلخ
  - صفحات محمية (Protected): تحت AuthGuard
  - صفحات خاصة بالدور (Role): تحت RoleGuard
- بعد تسجيل الدخول: توجيه المستخدم تلقائياً للداشبورد الخاص بدوره (roleRedirects)

### 5. صفحات تسجيل الدخول والتسجيل

- عند تسجيل الدخول:
  - يتم حفظ بيانات المستخدم (مع الدور) في الـ Context و localStorage
  - إعادة التوجيه للداشبورد المناسب
- عند تسجيل الخروج:
  - حذف بيانات المستخدم من الـ Context و localStorage
  - إعادة التوجيه لصفحة /login

### 6. محاكاة المستخدمين

- يمكن عمل قائمة مستخدمين وهمية (students, admin, ...)
- أو السماح للمستخدم باختيار الدور من قائمة عند تسجيل الدخول

### 7. حماية الروابط

- إخفاء أو إظهار روابط التنقل حسب حالة المستخدم والدور

---

## مثال سريع للـ Context

```js
// AuthContext.js
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});

const login = (role) => {
  const fakeUser = { id: 1, name: "Test", role };
  setUser(fakeUser);
  localStorage.setItem("user", JSON.stringify(fakeUser));
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
};
```

---

## الخلاصة

- كل شيء يتم في الواجهة فقط (Front-end only)
- لا حاجة لأي API أو باك-إند
- يمكن التوسع لاحقاً لربط الـ API بسهولة
