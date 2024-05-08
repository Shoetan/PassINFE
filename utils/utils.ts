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