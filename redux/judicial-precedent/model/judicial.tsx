export interface IJudicial {
  userId: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;
  accessToken?: String;
  refreshToken?: String;
}
