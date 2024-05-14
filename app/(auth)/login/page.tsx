"use client"


import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from '@/utils/utils';
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from '../query';
import { Loader, Eye, EyeOff} from 'lucide-react';


type ILoginPayload = {
  email: string;
  master_password:string;
}

const page = () => {

  const {loginUser, isPending} = useLogin()

  const [password, setPassword] = React.useState("");
  const [type, setType] = React.useState('password');
  const [icon, setIcon] = React.useState(<EyeOff/>);

  const handleToggle = () => {
    if (type==='password'){
      setIcon(<Eye />);
      setType('text')
    } else {
      setIcon(<EyeOff/>)
      setType('password')
    }
  }


  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<LoginSchema>({
    resolver:zodResolver(loginSchema)
  })

  const onSubmit = (payload:ILoginPayload) => {
    loginUser(payload)
  }

  


  return (
    <Card className='flex min-h-24 max-w-96 flex-col items-center justify-between m-24 mx-auto sm:max-w-xl'>
      <CardHeader>
        <CardTitle>Login or create an account.</CardTitle>
      </CardHeader>
          <CardContent>
              <div className='grid w-full items-center gap-4'>
                <div className='p-2'>
                  <Label htmlFor="">Email address (required)</Label>
                  <Input className='w-full h-[30px] sm:h-[40px] sm:w-[300px]' {...register("email")} />
                  {errors.email&&(<p className="text-xs text-red-600 p-2">{errors.email.message}</p>)}
                </div>

                <div className='p-2'>
                  <Label htmlFor="">Password</Label>
                  <div className='flex justify-around items-center'>
                    <Input className='w-full h-[30px] sm:h-[40px] sm:w-[300px]' {...register("master_password")} type={type} onChange={(e) => setPassword(e.target.value)} value={password} />

                    <span className='-ml-10' onClick={handleToggle}>{icon}</span>

                  </div>
                  {errors.master_password&&(<p className="text-xs text-red-600 p-2">{errors.master_password.message}</p>)}
                </div>
                
              </div>
          </CardContent>
          <CardFooter className='flex flex-col p-4'>
            <Button onClick={handleSubmit(onSubmit)} variant='secondary' size='lg' >{isPending ? (<Loader className='className="mr-2 h-4 w-4 animate-spin' />):("Continue")}</Button>
            <a href="/register" className="text-xs" >Create an account</a>
          </CardFooter>
    </Card>
  )
}

export default page