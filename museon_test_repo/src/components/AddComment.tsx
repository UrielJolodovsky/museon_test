"use client"
import * as React from 'react';
import axios,{ AxiosError }  from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { MessageValidator } from '@/validations/add-message';
import { motion } from 'framer-motion';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export interface IAddCommentProps {
}

const AddComment = (props: IAddCommentProps) => {
  //const session = getServerSession(authOptions)
  //console.log(session)
  type FormData = z.infer<typeof MessageValidator>
  const [message, setMessage] = useState<string>("")
  const {register, handleSubmit, setError, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(MessageValidator)
  })

  const addMessage = async(message: string) => {
    try {
      await axios.post('api/auth/comments/add', {message: message})
      .then((res) => console.log(res))
      // .catch(err => console.log(err))
    } catch (error) {
      if (error instanceof AxiosError) {
        setError('message', {message: error?.message})
      }
      if (error instanceof z.ZodError) {
        setError('message', {message: "The message must have at least 1 characters and maximum 1000"})
      }
      else {
        setError('message', {message: 'Something went wrong'})
      }
    }
  }

  const MessageCargado = (data: FormData) => {
    addMessage(data.message)
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.5, 0.2, 1]
      }}
      className='comment-container'>
     <form className='form-comment' onSubmit={handleSubmit(MessageCargado)}>
      <h2 className='title-comment'>Add a message</h2>
      <input className='input-message' type="text" {...register("message" )} />
      {errors.message && 
        <motion.p 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0, 0.5, 0.2, 1]
          }}
          className='error-message'>
          {errors.message.message}</motion.p>}
      <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          type='submit' 
          className='btn-comment'>Send</motion.button>
      </form>
    </motion.div>
  );
}


export default AddComment