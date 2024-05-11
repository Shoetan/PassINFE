import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { AddRecordResponse, AddRecordType } from "@/types/types";

const addRecord = async({id, payload} : {payload:AddRecordType, id:any}):Promise<AddRecordResponse> =>{
  const response = await api.post<AddRecordResponse>(`/record/${id}`, payload)

  const {data} = response

  return data

}

export const useAddRecord = ()=> {
  const {mutate, isPending} = useMutation({
    mutationFn:({id, payload} : {payload:AddRecordType, id:any}) =>{
      return addRecord({payload, id})
    }
  })

  return {addRecord:mutate, addingRecord:isPending}
}