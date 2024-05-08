export type LoginUserType = {
  email: string
  master_password: string
}

export type LoginResponseType = {
  email: string
  token: string
}

export type SignupResponseType = {
  id: string 
  email: string
  name: string
  inserted_at : string
  updated_at: string
}

export type SignupUserType = LoginUserType & {
  name : string
}