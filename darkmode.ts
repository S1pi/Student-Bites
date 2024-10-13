const darkmodeToggle = document.getElementById(
  "darkModeTog"
) as HTMLInputElement | null;
const body = document.body as HTMLBodyElement;

if (darkmodeToggle) {
  darkmodeToggle.addEventListener("change", () => {
    body.classList.toggle("dark-theme");
  });
}
