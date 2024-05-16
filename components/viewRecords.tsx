"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Loader, Eye, EyeOff} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { usePatchRecord, useDeleteRecord} from '@/app/dashboard/query';
import { AddRecordSchema, addRecordSchema } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type IPatchRecordPayload = {
  record_name:  string
  record_email: string
  record_password: string
}


export default function ViewRecords ({id,record_email,record_name,record_password}:{id:string|number; record_email:string; record_name:string; record_password:string | number}){

  const{patchRecord, patchingRecord} = usePatchRecord()
  const{deleteRecord, deletingRecord} = useDeleteRecord()

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<AddRecordSchema>({
    resolver:zodResolver(addRecordSchema),
  })

  const onSubmit = (payload:IPatchRecordPayload)=>{
    patchRecord({payload:payload, record_id:id})
  }

  const removeRecord = () =>{
    deleteRecord(id as any)
  }

  
  return (
    <div className='max-w-7xl mx-auto my-4 bg-white/60 p-4 rounded-2xl shadow-2xl flex items-center justify-evenly gap-10'>
      <div className='basis-1/2'>
        <div className='flex flex-col items-start p-2 gap-2'> 
          <div className='flex items-center gap-2'> 
            <Label className='text-xs w-96'>Name</Label> {/* Adjust the width as needed */}
            <Input className='border border-gray-800 flex-grow' type="text" defaultValue={record_name} {...register("record_name")}/> 
          </div>
          <div className='flex items-center gap-2'> 
            <Label className='text-xs w-96'>Email</Label> {/* Adjust the width as needed */}
            <Input className='border border-gray-800 flex-grow' type="text"  defaultValue={record_email} {...register("record_email")}/>
          </div>
          <div className='flex items-center gap-2'> 
            <Label className='text-xs w-96'>Password</Label> {/* Adjust the width as needed */}
            <Input className='border border-gray-800 flex-grow' type="text"  defaultValue={record_password} {...register("record_password")} />
          </div>
        </div>
      </div>
      <div className='basis-1/2'>
        <div className='flex gap-4'>
        <Button onClick={handleSubmit(onSubmit)} variant='secondary'>{patchingRecord?(<Loader className='className="mr-2 h-4 w-4 animate-spin'/>):("Edit")}</Button>
          <Trash2 className='cursor-pointer' onClick={removeRecord}/>
        </div>
      </div>
    </div>


  )

}