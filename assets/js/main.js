// Tương tác của Portfolio: menu điện thoại, menu con, chế độ sáng/tối, tab so sánh Prompt, bảng tự kiểm tra AI.
(function () {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // Chế độ sáng / tối
  const root = document.documentElement;
  const saved = store.get("theme");
  if (saved) root.setAttribute("data-theme", saved);
  const themeBtn = document.getElementById("theme-toggle");
  const isDark = () => root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const paint = () => { if (themeBtn) themeBtn.textContent = isDark() ? "☀" : "☾"; };
  paint();
  themeBtn && themeBtn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next); store.set("theme", next); paint();
  });

  // Menu điện thoại
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  burger && burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  // Menu con "Dự án" bằng bàn phím / chạm
  document.querySelectorAll(".has-sub > button.drop").forEach((b) => {
    b.addEventListener("click", () => {
      const li = b.parentElement; const open = li.classList.toggle("open");
      b.setAttribute("aria-expanded", open);
    });
  });

  // Tab (Bài 3)
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const btns = group.querySelectorAll("button[role=tab]");
    btns.forEach((btn) => btn.addEventListener("click", () => {
      btns.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      const scope = group.parentElement;
      scope.querySelectorAll(".panel").forEach((p) => (p.hidden = p.id !== btn.getAttribute("aria-controls")));
    }));
  });

  // Bảng tự kiểm tra (Bài 6)
  const box = document.getElementById("ai-checklist");
  if (box) {
    const inputs = box.querySelectorAll("input[type=checkbox]");
    const out = document.getElementById("ai-meter");
    const bar = document.getElementById("ai-meter-bar");
    const update = () => {
      const done = [...inputs].filter((i) => i.checked).length;
      const pct = Math.round((done / inputs.length) * 100);
      bar.style.width = pct + "%";
      out.textContent = done === inputs.length
        ? "Sẵn sàng nộp bài: đã đạt đủ " + done + "/" + inputs.length + " tiêu chí."
        : "Đã đạt " + done + "/" + inputs.length + " tiêu chí — hãy hoàn thiện trước khi nộp.";
    };
    inputs.forEach((i) => i.addEventListener("change", update));
    update();
  }
})();
