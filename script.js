const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("[data-menu]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const url = String(data.get("url") || "").trim();
    const message = String(data.get("message") || "").trim();

    const draft = [
      "Exploratory UX/product review request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Product: ${url}`,
      "",
      "What to look at first:",
      message
    ].join("\n");

    navigator.clipboard?.writeText(draft).catch(() => undefined);
    formStatus.textContent = "Inquiry draft copied to clipboard.";
  });
}
