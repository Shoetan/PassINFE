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
import { SignupSchema, signupSchema } from '@/utils/utils';
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignup } from '../query';
import { Loader, Eye, EyeOff} from 'lucide-react';


type ISignupPayload = {
  email: string;
  name : string
  master_password:string;
}



const page = () => {

  const {signupUser, sigingUp} = useSignup()

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
  } = useForm<SignupSchema>({
    resolver:zodResolver(signupSchema)
  })

  const onSubmit =  async (payload:ISignupPayload) => {
    await signupUser(payload)
  }

  


  return (
    <Card className='flex min-h-24 max-w-96 flex-col items-center justify-between m-24 mx-auto sm:max-w-xl'>
      <CardHeader>
        <CardTitle>Login or create an account.</CardTitle>
      </CardHeader>
          <CardContent>
              <div className='grid w-full items-center gap-4'>

                <div className='p-2'>
                  <Label htmlFor="">Name</Label>
                  <Input className='w-full h-[30px] sm:h-[40px] sm:w-[300px]' {...register("name")} />
                  {errors.name&&(<p className="text-xs text-red-600 p-2">{errors.name.message}</p>)}
                </div>

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
            <Button onClick={handleSubmit(onSubmit)} variant='secondary' size='lg' >{sigingUp ? (<Loader className='className="mr-2 h-4 w-4 animate-spin' />):("Continue")}</Button>
            <a href="/login" className="text-xs" >Login</a>
          </CardFooter>
    </Card>
  )
}

export default page