import { fetchData } from "./fetchdata";
import { Login, LoginError, User } from "../interfaces/User";
import { getCurrentUser } from "./getCurrentUser";

const profileBtn = document.querySelector(".profileBtn") as HTMLButtonElement;
const loginModal = document.getElementById("loginModal") as HTMLDialogElement;
const registerModal = document.getElementById(
  "registerModal"
) as HTMLDialogElement;
const logInBtn = document.querySelector(".loginBtn") as HTMLButtonElement;
const registerBtn = document.querySelector(".registerBtn") as HTMLButtonElement;
const profile = document.querySelector("#profileModal") as HTMLDialogElement;

const loginUname = document.querySelector("#loginUname") as HTMLInputElement;
const loginPword = document.querySelector("#loginPword") as HTMLInputElement;
const profileName = document.getElementById(
  "profileUname"
) as HTMLParagraphElement;
const profileEmail = document.getElementById(
  "profileEmail"
) as HTMLParagraphElement;
const favRes = document.getElementById(
  "favouriteRestaurant"
) as HTMLParagraphElement;

const close = document.querySelectorAll(
  ".loginCloseBtn"
) as NodeListOf<HTMLButtonElement>;

const profileModal = async (token: string): Promise<void> => {
  if (token) {
    const userData = await getCurrentUser(token);
    console.log(userData);
    profileName.textContent = "Käyttäjänimi: " + userData.username;
    profileEmail.textContent = "Sähköposti: " + userData.email;
    favRes.textContent = userData.favouriteRestaurant;
    profile.showModal();
  }
};

profileBtn.addEventListener("click", () => {
  const token = localStorage.getItem("token");
  token ? profileModal(token) : loginModal.showModal();
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

logInBtn.addEventListener("click", async () => {
  const username = loginUname.value;
  const password = loginPword.value;

  try {
    const data = await loginFunc(username, password);
    if ("errorText" in data) {
      console.log(data.message);
      alert(`${data.status}: ${data.errorText} 
        ${data.message}`);
    } else {
      localStorage.setItem("token", data.token);
      loginModal.close();
    }
  } catch (err) {
    throw new Error(`Error ${err} occured`);
  }
});

const loginFunc = async (username: string, password: string) => {
  const data = { username, password };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const result: Login | LoginError = await fetchData("/auth/login", options);
  return result;
};
