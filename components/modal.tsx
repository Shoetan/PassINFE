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


export default function Modal() {

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
  return (
    <Dialog>
      <div className="p-10 flex justify-end items-end">
        <DialogTrigger asChild>
          <Button variant="secondary" size='lg'>New</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Record</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username | Email
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <div className="flex col-span-3 items-center">
              <Input id="password" value={password} className="" type={type} onChange={(e)=>{setPassword(e.target.value)}}/>
              <span className='-ml-10 h-8 w-2' onClick={handleToggle}>{icon}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant='secondary'>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
