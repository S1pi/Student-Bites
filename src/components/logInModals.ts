import { fetchData } from "./fetchdata";
import { Login, LoginError } from "../interfaces/User";
import { getCurrentUser } from "./getCurrentUser";
import { createUser } from "./createUser";

const profileBtn = document.querySelector(".profileBtn") as HTMLButtonElement;
const loginModal = document.getElementById("loginModal") as HTMLDialogElement;
const registerModal = document.getElementById(
  "registerModal"
) as HTMLDialogElement;
const logInBtn = document.querySelector(".loginBtn") as HTMLButtonElement;
const registerBtn = document.querySelector(".registerBtn") as HTMLButtonElement;
const registerSubmit = document.querySelector(
  ".registerBtnSubmit"
) as HTMLButtonElement;

const regUname = document.querySelector("#regUname") as HTMLInputElement;
const regPword = document.querySelector("#regPword") as HTMLInputElement;
const regEmail = document.querySelector("#regEmail") as HTMLInputElement;

const logOutBtn = document.querySelector(".profileLogOut") as HTMLButtonElement;
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

logOutBtn.addEventListener("click", () => {
  // const token = localStorage.getItem("token")
  localStorage.removeItem("token");
  profile.close();
});

profileBtn.addEventListener("click", () => {
  const token = localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  token ? profileModal(token) : loginModal.showModal();
});

close.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginModal.close();
    registerModal.close();
    profile.close();
  });
});

registerBtn.addEventListener("click", () => {
  loginModal.close();
  registerModal.showModal();
});

registerSubmit.addEventListener("click", async () => {
  // Tässä kutsutaan käyttäjän rekisteröintiä'
  const uName = regUname.value;
  const pword = regPword.value;
  const email = regEmail.value;

  const result = await createUser(uName, pword, email);

  console.log(result);
  if (result.created) {
    alert(result.message);
    registerModal.close();
    loginModal.showModal();
  } else {
    alert(result.message);
  }
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
