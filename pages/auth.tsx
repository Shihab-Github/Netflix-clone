import { useState } from 'react'
import axios from 'axios'
import Input from '@/components/input'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = () =>
    setVariant((prevVariant) =>
      prevVariant === 'login' ? 'register' : 'login'
    )

  const register = async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password 
      })
    } catch (error) {
      console.log('error: ',error)
    }
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' ? (
                <Input
                  label="User Name"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  type="text"
                  value={name}
                />
              ) : null}

              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={register} className="bg-red-600 py-3 text-white px-3 rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Log In'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
