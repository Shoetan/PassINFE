'use client'


import Image from "next/image";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";



export default function Home() {
/*  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  ); */

  redirect('/login')

  return (
    <p></p>
  )
}
