// Tương tác: menu điện thoại, menu con, sáng/tối, đánh dấu mục đang xem, sao chép link, tab (Bài 3), phóng to ảnh.
(function () {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Chế độ sáng / tối
  const root = document.documentElement;
  const saved = store.get("theme");
  if (saved) root.setAttribute("data-theme", saved);
  const themeBtn = $("#theme-toggle");
  const isDark = () => root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const paint = () => { if (themeBtn) themeBtn.textContent = isDark() ? "☀" : "☾"; };
  paint();
  themeBtn && themeBtn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next); store.set("theme", next); paint();
  });

  // Menu điện thoại + menu con
  const burger = $("#burger"), menu = $("#menu");
  burger && burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  $$(".has-sub > button.drop").forEach((b) => b.addEventListener("click", () => {
    const open = b.parentElement.classList.toggle("open");
    b.setAttribute("aria-expanded", open);
  }));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("open"); burger && burger.setAttribute("aria-expanded", "false");
  }));

  // Đánh dấu mục đang xem trên trang chính
  const spyLinks = $$("[data-spy]");
  const sections = spyLinks.map((a) => document.getElementById(a.dataset.spy)).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const mark = (id) => spyLinks.forEach((a) => a.classList.toggle("active", a.dataset.spy === id));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) mark(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  // Thông báo nhỏ
  const toast = $("#toast");
  const say = (msg) => { if (!toast) return; toast.textContent = msg; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2200); };

  // Sao chép link chia sẻ
  const copyBtn = $("#copy-link");
  copyBtn && copyBtn.addEventListener("click", async () => {
    const url = copyBtn.dataset.url || location.href;
    try { await navigator.clipboard.writeText(url); say("Đã sao chép: " + url); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = url; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); say("Đã sao chép: " + url); } catch (_) { say(url); }
      ta.remove();
    }
  });

  // Tab (Bài 3)
  $$("[data-tabs]").forEach((group) => {
    const btns = $$("button[role=tab]", group);
    btns.forEach((btn) => btn.addEventListener("click", () => {
      btns.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      $$(".panel", group.parentElement).forEach((p) => (p.hidden = p.id !== btn.getAttribute("aria-controls")));
    }));
  });

  // Phóng to ảnh
  const lb = $("#lightbox");
  if (lb) {
    const lbImg = $("img", lb), lbCap = $("p", lb);
    const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
    $$("button.zoom").forEach((b) => b.addEventListener("click", () => {
      const im = $("img", b);
      lbImg.src = b.dataset.full; lbImg.alt = im.alt; lbCap.textContent = im.alt;
      lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb-close", lb).focus();
    }));
    lb.addEventListener("click", (e) => { if (e.target !== lbImg) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) close(); });
  }
})();
