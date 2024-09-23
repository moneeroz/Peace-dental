export interface Iuser {
  id: string;
  name?: string;
  email: string;
  password?: string;
  role: string;
  token: string;
  refreshToken: string;
}
