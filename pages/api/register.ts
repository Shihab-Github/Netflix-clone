import bcrypt from 'bcrypt'
import {NextApiRequest, NextApiResponse} from 'next'
import prismadb from '../../lib/prismadb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const {email, name, password} = req.body
        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) {
            return res.status(422).json({error: 'Email already in use'})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const newUser = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image:'',
                emailVerified: new Date()
            }
        })

        return res.status(201).json(newUser)
        
    } catch (error) {
        console.log('error: ', error)
        return res.status(400).end()
    }
}

export default handler