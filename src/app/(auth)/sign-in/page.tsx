'use client'
import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="bg-zinc-800 px-5 hover:opacity-50 duration-700 py-2 rounded-md" onClick={() => signIn()}>Sign in</button>
    </>
  )
}