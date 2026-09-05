/* =========================================================
   BLACK FIRE — shared client-side data layer & UI helpers
   Pure front-end demo: all "backend" state lives in localStorage
   so every page (store, bank, admin panels) reads/writes the
   same shared data and feels like one connected system.
   ========================================================= */

const DB_KEY = "blackfire_db_v1";

const BlackFire = (() => {
  function uid(prefix = "id") {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function seed() {
    return {
      brand: { name: "بلاك فاير", tagline: "BLACK FIRE STORE & VAULT" },
      passwords: { bank: "blackbank12345", store: "blackstore12345", admin: "admin123" },
      toggles: { bankPortal: true, storePortal: true },
      commission: 5,
      leaders: [
        { id: uid("ldr"), name: "لوفي", title: "القائد", phone: "+967 781 814 733", avatar: "🐺" },
      ],
      deputies: [
        { id: uid("dep"), name: "باتريك جين", title: "نائب", phone: "+1 556 552 8974", avatar: "🎭" },
      ],
      bankOfficial: { name: "عوكو", title: "مسؤول البنك", phone: "+20 109 825 4076", avatar: "🏦" },
      storeOfficial: { name: "لوفي", title: "القائد", phone: "+967 781 814 733", avatar: "🛒" },
      sections: [
        { id: uid("sec"), name: "Ff", order: 1, status: "نشط", desc: "D" },
        { id: uid("sec"), name: "الأرقام والحسابات", order: 1, status: "نشط", desc: "يوجد هنا إرقام وهمية لكل وسائل التواصل الاجتماعي" },
      ],
      items: [
        {
          id: uid("itm"), name: "إرقام وهمية لتفعيل الحسابات", section: "الأرقام والحسابات",
          priceEmd: 100, priceUsd: 1, stock: 25, status: "متاح",
          desc: "أرقام وهمية جاهزة لتفعيل حسابات التواصل الاجتماعي فورًا.",
        },
      ],
      orders: [
        { id: uid("ord"), member: "آر نتز", item: "إرقام وهمية لتفعيل الحسابات", qty: 1, status: "قيد المراجعة", date: daysAgo(0) },
        { id: uid("ord"), member: "كودي", item: "إرقام وهمية لتفعيل الحسابات", qty: 2, status: "مكتمل", date: daysAgo(1) },
        { id: uid("ord"), member: "يوزوريها", item: "إرقام وهمية لتفعيل الحسابات", qty: 1, status: "مكتمل", date: daysAgo(2) },
        { id: uid("ord"), member: "باتريك جين", item: "إرقام وهمية لتفعيل الحسابات", qty: 1, status: "ملغي", date: daysAgo(3) },
      ],
      members: [
        { id: uid("mem"), name: "لوفي", phone: "+967 781 814 733", balance: 5200, role: "القائد" },
        { id: uid("mem"), name: "باتريك جين", phone: "+1 556 552 8974", balance: 3100, role: "نائب" },
        { id: uid("mem"), name: "عوكو", phone: "+20 109 825 4076", balance: 4800, role: "مسؤول البنك" },
        { id: uid("mem"), name: "آر نتز", phone: "+90 532 000 1122", balance: 2650, role: "عضو" },
        { id: uid("mem"), name: "كودي", phone: "+90 532 000 3344", balance: 1978, role: "عضو" },
        { id: uid("mem"), name: "يوزوريها", phone: "+90 532 000 5566", balance: 1900, role: "عضو" },
        { id: uid("mem"), name: "زورو", phone: "+90 532 000 7788", balance: 1000, role: "عضو" },
      ],
      bankRequests: [
        { id: uid("req"), member: "آر نتز", type: "سحب", amount: 500, status: "قيد المراجعة", date: daysAgo(0) },
        { id: uid("req"), member: "كودي", type: "إيداع", amount: 1200, status: "مقبول", date: daysAgo(1) },
        { id: uid("req"), member: "زورو", type: "سحب", amount: 300, status: "مرفوض", date: daysAgo(2) },
      ],
      ledger: [
        { id: uid("led"), text: "جائزة مسابقة النقابة الكبرى", amount: 500, date: "اليوم، 8:42 م" },
        { id: uid("led"), text: "شراء أرقام وهمية", amount: -200, date: "أمس، 11:20 م" },
        { id: uid("led"), text: "مكافأة النشاط الأسبوعي", amount: 1000, date: "28 أغسطس، 7:15 م" },
        { id: uid("led"), text: "مساعدة من القائد", amount: 300, date: "27 أغسطس، 9:10 م" },
      ],
      activityLog: [
        { id: uid("log"), text: "تسجيل دخول ناجح إلى لوحة القيادة", level: "info", date: daysAgo(0) },
        { id: uid("log"), text: "تحديث باسورد المتجر", level: "warn", date: daysAgo(1) },
        { id: uid("log"), text: "إضافة سلعة جديدة إلى المستودع", level: "info", date: daysAgo(2) },
        { id: uid("log"), text: "رفض طلب سحب مشبوه", level: "danger", date: daysAgo(3) },
      ],
      stats: { raids: 12, transfers: 1053, totalBalances: 20628, revenue: 125430 },
    };
  }

  function daysAgo(n) {
    if (n === 0) return "اليوم";
    if (n === 1) return "أمس";
    return `منذ ${n} أيام`;
  }

  function load() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (!raw) throw new Error("empty");
      return JSON.parse(raw);
    } catch (e) {
      const s = seed();
      localStorage.setItem(DB_KEY, JSON.stringify(s));
      return s;
    }
  }

  function save(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  function reset() {
    const s = seed();
    localStorage.setItem(DB_KEY, JSON.stringify(s));
    return s;
  }

  function money(n) {
    const num = Number(n) || 0;
    return num.toLocaleString("en-US");
  }

  function waLink(phone, text) {
    const clean = String(phone || "").replace(/[^0-9+]/g, "").replace("+", "");
    const msg = encodeURIComponent(text || "");
    return `https://wa.me/${clean}?text=${msg}`;
  }

  /* ---------------- Toast ---------------- */
  function ensureToastRoot() {
    let root = document.getElementById("toast-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "toast-root";
      document.body.appendChild(root);
    }
    return root;
  }

  const TOAST_STYLES = {
    success: { bg: "rgba(255,122,26,0.14)", border: "rgba(255,122,26,0.4)", icon: "check_circle", color: "#ff7a1a" },
    error: { bg: "rgba(255,59,48,0.14)", border: "rgba(255,59,48,0.4)", icon: "error", color: "#ff3b30" },
    info: { bg: "rgba(255,194,71,0.12)", border: "rgba(255,194,71,0.35)", icon: "info", color: "#ffc247" },
  };

  function toast(title, desc = "", type = "success") {
    const root = ensureToastRoot();
    const style = TOAST_STYLES[type] || TOAST_STYLES.success;
    const el = document.createElement("div");
    el.className = "toast-item glass-strong";
    el.style.borderColor = style.border;
    el.style.background = style.bg;
    el.innerHTML = `
      <span class="material-symbols-outlined" style="color:${style.color}">${style.icon}</span>
      <div class="flex flex-col min-w-0">
        <span class="font-body text-sm font-bold text-ink">${title}</span>
        ${desc ? `<span class="text-[11px] text-muted">${desc}</span>` : ""}
      </div>
    `;
    root.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity .3s ease, transform .3s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-8px)";
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  /* ---------------- Modal ---------------- */
  function openModal(innerHtml) {
    closeModal();
    const backdrop = document.createElement("div");
    backdrop.id = "bf-modal-backdrop";
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `<div class="modal-sheet glass-strong rounded-t-2xl sm:rounded-2xl p-5">${innerHtml}</div>`;
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
    document.body.appendChild(backdrop);
    return backdrop;
  }

  function closeModal() {
    const existing = document.getElementById("bf-modal-backdrop");
    if (existing) existing.remove();
  }

  /* ---------------- Tabs ---------------- */
  function initTabs(root) {
    const scope = root || document;
    const btns = scope.querySelectorAll("[data-tab-target]");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetSel = btn.getAttribute("data-tab-target");
        const group = btn.closest("[data-tab-group]");
        if (!group) return;
        group.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        group.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        const target = document.querySelector(targetSel);
        if (target) target.classList.add("active");
      });
    });
  }

  /* ---------------- Simple admin auth gate ---------------- */
  function requireAdmin(redirectTo = "login.html") {
    const ok = sessionStorage.getItem("bf_admin_ok");
    if (!ok) {
      window.location.href = redirectTo;
    }
  }

  return { uid, load, save, reset, money, waLink, toast, openModal, closeModal, initTabs, requireAdmin, seed };
})();
