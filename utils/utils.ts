import * as z from 'zod'


export const loginSchema = z.object ({
  email : z.string().min(1, {message:'Email required'}).email({message:'Email is required'}),
  master_password: z.string().min(8,{message:'Password should be at least 8 characters'})

})

export type LoginSchema = z.infer<typeof loginSchema>


export const signupSchema = z.object ({
  email : z.string().min(1,{message:'Email is required'}).email({message:'Email is required'}),
  name : z.string().min(1,{message:'Name is required'}),
  master_password: z.string().min(8,{message:'Password should be at least 8 characters'})

})

export type SignupSchema = z.infer<typeof signupSchema>


export const addRecordSchema = z.object ({
  record_name: z.string().min(3, {message:'Name of record is required'}),
  record_password: z.string().min(8,{message:"Password should be at least 8 characters"}),
  record_email: z. string().min(1,{message:'Email is required'}).email({message:'Email is reqired'})
})

export type AddRecordSchema =z.infer<typeof addRecordSchema>


export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token : any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const getUserId =() =>{
  if (typeof window !== 'undefined'){
    return localStorage.getItem('userId')
  }
}

export const setUserId = (userId: any) =>{
  if (typeof window !== 'undefined') {
    localStorage.setItem('userId', userId)
  }
}