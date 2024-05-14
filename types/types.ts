export type LoginUserType = {
  email: string
  master_password: string
}

export type LoginResponseType = {
  user_id: string | number
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

export type AddRecordType = {
  record_email: string
  record_name : string 
  record_password : string
}

export type AddRecordResponse = {
  user_id: string | number
  record_name: string
  record_email: string
}

export type PatchRecordResponse = {
  record_id: string | number
  record_name: string
  record_email: string
}

export type PatchRecordType = {
  record_email: string
  record_name : string 
  record_password : string
}