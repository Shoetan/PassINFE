'use client'

import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"



type ProviderProps = {
  children : React.ReactNode
}

const TanstackProvider = ({children}:ProviderProps) =>{
  const [queryClient ] = useState(()=> new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/>

    </QueryClientProvider>
  )
  
}


export default TanstackProvider