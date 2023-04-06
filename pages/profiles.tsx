import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

export async function getServerSideProps(context:NextPageContext) {
    const session = getSession(context)

    if(!session) {
        return {
            redirect: {
                destination: '/auth'
            }
        }
    }

    return {
        props: {}
    }
}

const Profiles = () => {
    return (
        <div>
            <p className="text-4xl text-white">Profiles</p>
        </div>
    )
}

export default Profiles