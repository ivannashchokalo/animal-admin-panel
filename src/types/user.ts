export interface User {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  username: string;
  password: string;
}
