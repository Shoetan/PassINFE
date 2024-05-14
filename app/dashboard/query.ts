import api from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddRecordResponse, AddRecordType, PatchRecordResponse, PatchRecordType} from "@/types/types";

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

export const useRecordsQuery = () =>{
  const {data, isPending} = useQuery({
    queryKey:["records"],
    queryFn: async () =>{
      const response = await api.get("/records")
      return response.data
    }
  })

  return {records:data, fecthcingRecords:isPending}
}

const patchRecord =  async({record_id, payload}:{payload:PatchRecordType, record_id:any}):Promise<PatchRecordResponse> => {

  const response = await api.patch<PatchRecordResponse>(`/updateRecord/${record_id}`, payload)
  const {data} = response
  return data

}

export const usePatchRecord = () =>{
  const {mutate, isPending} = useMutation({
    mutationFn:({record_id, payload}:{record_id:any, payload:PatchRecordType}) =>{
      return patchRecord({record_id, payload})
    }
  })

  return {patchRecord:mutate, patchingRecord:isPending}
  
}