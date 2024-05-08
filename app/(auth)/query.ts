import api from "@/api/api";
import { LoginResponseType, LoginUserType, SignupResponseType, SignupUserType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const loginUser = async (payload:LoginUserType):Promise<LoginResponseType> =>{
  const response = await api.post<LoginResponseType>("/login", payload)
  const {data} = response

  return data
}

export const useLogin = () =>{

  const router = useRouter()
  const {mutate, isPending} = useMutation({
    mutationFn:(payload:LoginUserType) =>{
      return loginUser(payload)
    },
    onSuccess:() =>{
      router.push('/dashboard')
    }
  })

  return{loginUser:mutate, isPending}
}

const signupUser = async (payload:SignupUserType):Promise<SignupResponseType> =>{
  const response  =  await api.post<SignupResponseType>("/register", payload)
  const {data} = response

  return data
}

export const useSignup = () =>{
  const router = useRouter()
  const {mutate, isPending} = useMutation({
    mutationFn:(payload:SignupUserType) =>{
      return signupUser(payload)
    },
    onSuccess:() =>{
      router.push('/login')
    }
  })

  return {signupUser: mutate, sigingUp:isPending}
}