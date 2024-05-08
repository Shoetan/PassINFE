import axios from "axios"


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "content-type": "application/json",
  }
})

export default api