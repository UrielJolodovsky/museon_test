import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillCaretRight } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"



const Login = () => {

  const router = useRouter()

  const handleClickGoogle = () => {
    router.push('/dashboard')
  }

  return (
    <div className='login-container'>
      <div className="form-container">
        <form action="">
          <h1 className="login-title">Log In</h1>
          <input type="email" className='inputs' placeholder='email address' />
          <input type="password" className='inputs' placeholder='password' />
          <button onClick={handleClickGoogle} className='btn'> Log In <AiFillCaretRight /></button>
          <Link className='link-register' href={"hola"}> Register </Link>
          <button className="google-btn">
            <FcGoogle className='google-icon' />
            <h3 className="btn-text">Continue with Google</h3>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login