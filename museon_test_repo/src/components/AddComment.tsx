"use client"
import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageValidator } from '@/validations/add-message';
import { motion } from 'framer-motion';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Message from './Messages';

interface IAddCommentProps {
  museoId: string
}

const AddComment = ({ museoId }: IAddCommentProps) => {
  //const session = getServerSession(authOptions)
  //console.log(session)
  type FormData = z.infer<typeof MessageValidator>
  const [message, setMessage] = useState<string>("")
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(MessageValidator)
  })

  const addMessage = async (message: string) => {
    try {
      await axios.post('https://museon-test.vercel.app/api/comments/add', {
        museoId: museoId,
        message: message
      })
        .then((res) => console.log(res))
      // .catch(err => console.log(err))
    } catch (error) {
      if (error instanceof AxiosError) {
        setError('message', { message: error?.message })
      }
      if (error instanceof z.ZodError) {
        setError('message', { message: "The message must have at least 1 characters and maximum 1000" })
      }
      else {
        setError('message', { message: 'Something went wrong' })
      }
    }
  }

  const MessageCargado = (data: FormData) => {
    addMessage(data.message)
  }

  return (
    <div className='dashboard-body'>
      <div className='comment-container'>
        <form className='form-comment' onSubmit={handleSubmit(MessageCargado)}>
          <h1 className='title-comment'>Add a message</h1>
          <div className="send-message">
            <input className='input-message' type="text" {...register("message")} autoComplete="off" />
            {errors.message &&
              <p className='error-message'>
                {errors.message.message}</p>}
            <button type='submit' className='btn-comment'>Send</button>
          </div>
        </form>
      </div>
      <Message museoId={museoId} />
    </div>
  );
}


export default AddComment