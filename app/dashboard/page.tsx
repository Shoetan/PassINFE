"use client"

import Modal from "@/components/modal";
import ViewRecords from "@/components/viewRecords";
import { useRecordsQuery } from "./query";
import Spinner from "@/components/loader";
import { getUserId } from "@/utils/utils";


export default function page() {

  type IRecord = {
    id: any;
    record_name: string;
    record_email: string;
    record_password: any;
  }

  const userId = getUserId()

  const {records, fecthcingRecords} = useRecordsQuery(userId)
  return (
    <>
      <Modal />

      {
        fecthcingRecords ? (<Spinner/>):(
          records?.map((record: IRecord) =>(
            <ViewRecords
              key={record.id}
              id={record.id}
              record_email={record.record_email}
              record_name={record.record_name}
              record_password={record.record_password}
            /> 
          ))
        )   
      }      
    </>
  )
}
