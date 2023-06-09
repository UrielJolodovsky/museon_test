import { RegisterValidator } from '@/validations/register'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

export interface IRegisterProps { 
    label: string
}
const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  type FormData = z.infer<typeof RegisterValidator>
  const [message, setMessage] = useState<string>("")
  const {handleSubmit, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(RegisterValidator)
  })
  const router = useRouter()
  const AddUser = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('https://museon-test.vercel.app/api/register', {
        email: email,
        name: name,
        password: password
      }).then((res) => {
        console.log(res.data)
        router.push("/dashboard")
      }).catch((err) => {
        console.log(err)
      })
    } catch(error) {
      console.log(error)
    }
  }  
  // const UserCargado = (data: FormData) => {
  //   console.log("S")
  //   AddUser(data.email, data.name, data.password)
  // }

    return (
      <form method='post' onSubmit={AddUser}>
        <input
        id='Email' 
        type="text" 
        onChange={(ev: any) => setEmail(ev.target.value)}
        value={email}
        />
        <input
        id='Name' 
        type="text" 
        onChange={(ev: any) => setName(ev.target.value)}
        value={name}
        />
        <input 
        type="password" 
        id='Password'
        onChange={(ev: any) => setPassword(ev.target.value)}
        value={password}
        />
        <button type='submit'>Mandar</button>
      </form>
  )

}

export default Register