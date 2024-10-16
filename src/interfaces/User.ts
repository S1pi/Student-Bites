type User = {
  username: string;
  email: string;
  favouriteRestaurant: string;
  _id: string;
  role: string;
  avatar: string;
};

type Login = {
  message: string;
  token: string;
  data: User;
};

type LoginError = {
  status: number;
  errorText: string;
  message: string;
};

type CreateUser = {
  message: string;
  data: Omit<User, "avatar"> & { activated: string };
  activationUrl: string;
};

export type { User, Login, CreateUser, LoginError };
