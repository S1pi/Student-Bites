import { User } from "../interfaces/User";
import { fetchData } from "./fetchdata";

const getCurrentUser = async (token: string): Promise<User> => {
  const options: RequestInit = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetchData("/users/token", options);
};

export { getCurrentUser };
