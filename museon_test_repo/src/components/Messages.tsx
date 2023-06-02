import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageProps } from "@/types";
import { useSession } from "next-auth/react";

export interface IMessageProps { }

export default function Message(props: IMessageProps) {

  const [messages, setMessages] = useState<MessageProps[]>([])
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    viewMessages()
  }, [messages])

  const { setError } = useForm()

  const viewMessages = async () => {
    try {
      await axios.get('http://localhost:3000/api/comments/get/[slug]')
        .then((res) => {
          console.log(res.data)
          setMessages(res.data)
        })
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
      <div className="messages-container">
        <div className="messages-items">
          <button className="messages-btn" ></button>
          {messages.map((message, index) => {
            return (
              <div key={index} className="message-item">
                <div className="messages">
                  <h1 className="message-title">{message.content}</h1>
                  <h2 className="message-date">{message.updatedAt}</h2>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    </>
  );
}