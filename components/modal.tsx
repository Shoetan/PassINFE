"use client"

import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader, Eye, EyeOff} from 'lucide-react';
import { useForm } from "react-hook-form";
import { AddRecordSchema, addRecordSchema, getUserId } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddRecord } from "@/app/dashboard/query";



//modal to receive props from dashboard this time around is the user Id 

type IAddRecordPayload = {
  record_name:  string
  record_email: string
  record_password: string
}

export default function Modal() {

  const{addRecord, addingRecord} = useAddRecord()

  //get userId from localstorage

  const id = getUserId()

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
  } = useForm<AddRecordSchema>({
    resolver:zodResolver(addRecordSchema),
  })

  const onSubmit = (payload:IAddRecordPayload)=>{
    addRecord({payload:payload, id:id})
    reset({
      record_email:"",
      record_name:"",
      record_password: "",

    })
  }


  return (
    <Dialog>
      <div className="p-10 flex justify-end items-end">
        <DialogTrigger asChild>
          <Button variant="secondary" size='lg'>Add Record</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Record</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Record name
            </Label>
            <Input  className="col-span-3" {...register("record_name")} />
            {errors.record_name&&(<p className="text-xs text-red-600 p-2">{errors.record_name?.message}</p>)}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Record email
            </Label>
              <Input className="col-span-3" {...register("record_email")} />
              {errors.record_email&&(<p className="text-xs text-red-600 p-2">{errors.record_email?.message}</p>)}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <div className="flex col-span-3 items-center">
              <Input id="password" {...register("record_password")} value={password} className="" type={type} onChange={(e)=>{setPassword(e.target.value)}}/>
              <span className='-ml-10 h-8 w-1' onClick={handleToggle}>{icon}</span>
              {errors.record_password&&(<p className="text-xs text-red-600 p-2">{errors.record_password?.message}</p>)}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit)} variant='secondary'>{addingRecord?(<Loader className='className="mr-2 h-4 w-4 animate-spin'/>):("Save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
