import { Loader } from "lucide-react"





export default function Spinner (){

  return (
  <div className="flex items-center justify-center">
    <Loader className="mr-2 h-24 w-24 animate-spin text-blue-500"/>
  </div>

  )
}