"use client"
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillCaretRight } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"



const Login = () => {

  const router = useRouter()
  const [name, setname] = useState()

  async function LogInGoogle() {
    try {
      await signIn("google", { callbackUrl: '/dashboard' }).then((res) => {
        console.log(res?.error)
      }).catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }
  async function LogInFacebook() {
    try {
      await signIn("facebook", { callbackUrl: '/dashboard' }).then((res) => {
        console.log(res?.error)
      }).catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login-container'>
      <div className="form-container">
        <form action="">
          <h1 className="login-title">Log In</h1>
          <input type="email" className='inputs' placeholder='Email address' />
          <input type="password" className='inputs' placeholder='Password' />
          <button className='btn'> Log In <AiFillCaretRight /></button>
        </form>
        <Link className='link-register' href={'http://localhost:3000/register'}> Register </Link>
        <button className="google-btn" onClick={LogInGoogle}>
          <FcGoogle className='google-icon' />
          <h3 className="btn-text">Continue with Google</h3>
        </button>
      </div>
    </div>
  )
}

export default Login