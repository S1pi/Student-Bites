const darkmodeToggle = document.getElementById(
  "darkModeTog"
) as HTMLInputElement | null;
const body = document.body as HTMLBodyElement;

const sunBtn = document.getElementById("sun") as HTMLElement;
const moonBtn = document.getElementById("moon") as HTMLElement;

if (darkmodeToggle) {
  darkmodeToggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    // moonBtn.style.display = "none";
    // sunBtn.style.display = "inline-block";
  });
}
