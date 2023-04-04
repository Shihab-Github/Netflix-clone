import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps( context: NextPageContext) {
  const session  = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const {data:user} = useCurrentUser()
  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix Clone</h1>
      <p className="text-white text-2xl">Welcome {user?.name}</p>
      <button className="h-10 w-full bg-slate-50 mt-2" onClick={() => signOut()}>Logout</button>
    </>
  )
}
