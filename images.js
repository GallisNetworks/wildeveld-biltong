window.WILDEVELD_IMAGES = {
  hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85",
  traditional: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=85",
  chilli: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=85",
  chopper: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85"
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-img]").forEach((el) => {
    const src = window.WILDEVELD_IMAGES[el.dataset.img];
    if (src) el.src = src;
  });
});
