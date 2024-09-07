export interface Iuser {
  id: number;
  name?: string;
  email: string;
  password?: string;
  role: string;
  token: string;
  refreshToken: string;
}
