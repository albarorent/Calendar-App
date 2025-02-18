export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface GetResponseLogin {
  ok: boolean;
  msg: string;
  uid: string;
  name: string;
  token: string;
}
