import * as React from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";

export interface IMessageProps { }

export default function Message(props: IMessageProps) {

  const { setError } = useForm()

  const viewMessages = async () => {
    try {

      const messages = await axios.get('api/comments/get')
        .then((res) => console.log(res))

    } catch (error) {
      if (error instanceof AxiosError) {
        setError('message', { message: error?.message })
      }
      else {
        setError('message', { message: 'Something went wrong' })
      }
    }
  }

  return (
    <>
      <button onClick={viewMessages}>View Messages</button>
      {/*Anda god*/}
    </>
  );
}