function tema() {
  const body = document.body;
  const icon = document.querySelector("#tema img");

  // Alterna classe "dark" no body
  body.classList.toggle("dark");

  // Se está no modo dark → ícone de sol
  if (body.classList.contains("dark")) {
    icon.src = "imagens/icon-sun.svg";
    icon.alt = "sun";
    localStorage.setItem("theme", "dark");
  } else {
    icon.src = "imagens/icon-moon.svg";
    icon.alt = "moon";
    localStorage.setItem("theme", "light");
  }
}

// Manter a escolha mesmo após recarregar
window.onload = () => {
  const body = document.body;
  const icon = document.querySelector("#tema img");

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    icon.src = "imagens/icon-sun.svg";
    icon.alt = "sun";
  }
};
document.querySelectorAll('.remove').forEach(button => {
  button.addEventListener('click', function() {
    this.closest('.content').remove(); 
  });
});
// script.js
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".button > div");
  const container = document.querySelector(".body"); // <main class="body">

  // Aplica filtro atual (usa display:'' para restaurar estilo css)
  function applyFilter(filter) {
    const cards = document.querySelectorAll(".content");
    cards.forEach(card => {
      if (filter === "all") {
        card.style.display = "";
      } else if (filter === "active") {
        card.style.display = card.classList.contains("active") ? "" : "none";
      } else if (filter === "inactive") {
        card.style.display = card.classList.contains("inactive") ? "" : "none";
      }
    });
  }

  // Sincroniza a classe .active/.inactive dos cards a partir do estado do checkbox
  function syncCardStateFromCheckboxes() {
    const cards = document.querySelectorAll(".content");
    cards.forEach(card => {
      const checkbox = card.querySelector(".switch input[type='checkbox']");
      if (checkbox && checkbox.checked) {
        card.classList.add("active");
        card.classList.remove("inactive");
      } else {
        card.classList.add("inactive");
        card.classList.remove("active");
      }
      card.style.display = ""; // garante visibilidade inicial
    });
  }

  // Inicializa estados
  syncCardStateFromCheckboxes();

  // === Delegação: clique no botão Remove ===
  // Por delegação para funcionar mesmo após remoções dinâmicas
  container.addEventListener("click", (e) => {
    if (e.target.matches(".remove")) {
      const card = e.target.closest(".content");
      if (card) card.remove();
      // reaplica filtro atual (se houver) para manter a lista consistente
      const activeFilterBtn = document.querySelector(".button > div.active");
      const currentFilter = activeFilterBtn ? activeFilterBtn.textContent.trim().toLowerCase() : "all";
      applyFilter(currentFilter);
    }
  });

  // === Delegação: mudança do checkbox (slider) ===
  container.addEventListener("change", (e) => {
    if (e.target.matches(".switch input[type='checkbox']")) {
      const checkbox = e.target;
      const card = checkbox.closest(".content");
      if (!card) return;
      if (checkbox.checked) {
        card.classList.add("active");
        card.classList.remove("inactive");
      } else {
        card.classList.add("inactive");
        card.classList.remove("active");
      }
      // reaplica filtro atual (se o usuário estiver vendo só active/inactive)
      const activeFilterBtn = document.querySelector(".button > div.active");
      const currentFilter = activeFilterBtn ? activeFilterBtn.textContent.trim().toLowerCase() : "all";
      applyFilter(currentFilter);
    }
  });

  // === Filtrar por All / Active / Inactive ===
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.textContent.trim().toLowerCase();
      applyFilter(filter);
    });
  });

  // Aplica o filtro inicial (se algum botão já tiver .active no HTML)
  const initialBtn = document.querySelector(".button > div.active") || document.querySelector(".button > div");
  if (initialBtn) {
    applyFilter(initialBtn.textContent.trim().toLowerCase());
  }
});
