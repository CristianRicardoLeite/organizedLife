export interface User {
  id: number,
  email: string,
  name: string,
  createdAt: string,
}

export interface LoginDTO {
  email: string,
  password: string,
}

export interface RegisterDTO {
  name: string,
  email: string,
  password: string,
}

export interface AuthResponse {
  user: User,
  token: string,
}
