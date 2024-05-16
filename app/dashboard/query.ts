import api from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddRecordResponse, AddRecordType, PatchRecordResponse, PatchRecordType} from "@/types/types";


export const useRecordsQuery = (id:any) =>{
  const {data, isPending} = useQuery({
    queryKey:["records"],
    queryFn: async () =>{
      const response = await api.get(`/records/${id}`)
      return response.data
    }
  })

  return {records:data, fecthcingRecords:isPending}
}

const addRecord = async({id, payload} : {payload:AddRecordType, id:any}):Promise<AddRecordResponse> =>{
  const response = await api.post<AddRecordResponse>(`/record/${id}`, payload)

  const {data} = response

  return data

}

export const useAddRecord = ()=> {
  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationFn:({id, payload} : {payload:AddRecordType, id:any}) =>{
      return addRecord({payload, id})
    },
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey:['records']})
    }
  })

  return {addRecord:mutate, addingRecord:isPending}
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

const deleteRecord = async(id:any) =>{
  const response = await api.delete(`/deleteRecord/${id}`)
  const {data} = response
  return data
}

export const useDeleteRecord = () =>{
  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationFn:(id:any) =>{
      return deleteRecord(id)
    },
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey:['records']})
    }
  })

  return {deleteRecord:mutate, deletingRecord:isPending}
}