export interface IClaims {
  email: string;
  role: string;
  userId: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
