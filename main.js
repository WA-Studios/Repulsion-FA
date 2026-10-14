(() => {
  const S = window.SITE || {};

  // Remplit les textes / liens issus de config.js
  document.querySelectorAll("[data-cfg]").forEach(el => {
    const v = S[el.dataset.cfg];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-href]").forEach(el => {
    const v = S[el.dataset.href];
    if (v) el.href = v;
  });
  document.querySelectorAll("[data-join]").forEach(el => {
    if (S.cfxCode) el.href = "fivem://connect/cfx.re/join/" + S.cfxCode;
    else el.href = S.discord || "#";
  });
  document.title = document.title.replace("{name}", S.name || "");

  // Duplique la bande d'images pour une boucle continue
  const track = document.querySelector(".strip-track");
  if (track) track.innerHTML += track.innerHTML;

  // Images manquantes : on garde le fond dégradé
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => { img.style.visibility = "hidden"; });
  });

  // Lueur qui suit la souris sur les cartes
  document.querySelectorAll(".card").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // Apparition au scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // Compteur de joueurs (API publique FiveM)
  const setStatus = (online, players, max) => {
    document.querySelectorAll("[data-players]").forEach(el => el.textContent = players);
    document.querySelectorAll("[data-max]").forEach(el => el.textContent = max);
    document.querySelectorAll(".dot").forEach(d => {
      d.classList.toggle("on", online);
      d.classList.toggle("off", !online);
    });
  };
  if (!S.cfxCode) {
    document.querySelectorAll("[data-status]").forEach(el => el.hidden = true);
  } else {
    fetch("https://servers-frontend.fivem.net/api/servers/single/" + S.cfxCode)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setStatus(true, j.Data.clients ?? 0, j.Data.sv_maxclients ?? S.maxPlayers))
      .catch(() => setStatus(false, 0, S.maxPlayers));
  }

  // Sommaire actif (page règlement)
  const toc = document.querySelectorAll(".toc a");
  if (toc.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          toc.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".rule-sec").forEach(s => spy.observe(s));
  }
})();
