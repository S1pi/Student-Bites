import { CreateUser } from "../interfaces/User";
import { fetchData } from "./fetchdata";

const createUser = async (
  username: string,
  password: string,
  email: string
): Promise<CreateUser | { created: false; message: string }> => {
  const data = { username, password, email };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  if (await checkUsername(username)) {
    const result: CreateUser = await fetchData("/users", options);
    return { ...result, created: true };
  } else {
    return { created: false, message: "Käyttäjänimi Varattu" };
  }
};

// muuta promisen voidi oikeeksi tyypiksi ja palauta funktio createUseriin
const checkUsername = async (username: string): Promise<boolean> => {
  const result: { available: boolean } = await fetchData(
    "/users/available/" + username
  );
  return result.available;
};

export { createUser, checkUsername };
