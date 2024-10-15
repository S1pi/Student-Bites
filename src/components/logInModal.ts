const loginBtn = document.querySelector(".loginBtn") as HTMLButtonElement;
const loginModal = document.getElementById("loginModal") as HTMLDialogElement;
const registerModal = document.getElementById(
  "registerModal"
) as HTMLDialogElement;
const logInsideBtn = document.querySelector(".logInside") as HTMLButtonElement;
const registerBtn = document.querySelector(".registerBtn") as HTMLButtonElement;

const close = document.querySelectorAll(
  ".loginCloseBtn"
) as NodeListOf<HTMLButtonElement>;

loginBtn.addEventListener("click", () => {
  loginModal.showModal();
});

close.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginModal.close();
    registerModal.close();
  });
});

registerBtn.addEventListener("click", () => {
  loginModal.close();
  registerModal.showModal();
});
