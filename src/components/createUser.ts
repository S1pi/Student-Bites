import { CreateUser } from "../interfaces/User";
import { fetchData } from "./fetchdata";

const createUser = async (
  username: string,
  password: string,
  email: string
): Promise<CreateUser> => {
  const data = { username, password, email };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const result: CreateUser = await fetchData("/users", options);
  return result;
};

// muuta promisen voidi oikeeksi tyypiksi ja palauta funktio createUseriin
const checkUsername = async (username: string): Promise<void> => {
  const result = await fetchData("/users/available/" + username);
  console.log("Täs ollaan");

  // Tää toimii hetiku tyyppi toteutetaan
  // console.log(result.available);
};

export { createUser, checkUsername };
