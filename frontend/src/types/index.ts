export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  password: string;
  fullname: string;
  email: string;
}

export interface User {
  userId: string;
  userName: string;
}

export interface Chat {
  _id: string;
  message: string;
  actions?: string[];
  sender: "bot" | "user";
  userId: string;
  created_at: string;
}
