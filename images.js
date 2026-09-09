window.WILDEVELD_IMAGES = {
  hero: "assets/logo.webp",
  traditional: "assets/traditional-label.webp",
  chilli: "assets/chilli-label.webp",
  chopper: "assets/logo.webp"
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-img]").forEach((el) => {
    const src = window.WILDEVELD_IMAGES[el.dataset.img];
    if (src) el.src = src;
  });
});
