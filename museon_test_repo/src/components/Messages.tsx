import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageProps } from "@/types";
import { useSession } from "next-auth/react";

export interface IMessageProps {
  museoId: string
}

export default function Message({ museoId }: IMessageProps) {

  const [messages, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    viewMessages()
  }, [messages])

  const { setError } = useForm()

  const viewMessages = async () => {
    try {
      const response = await axios.get('https://museon-test.vercel.app/api/comments/get', {
        params: {
          museoId: museoId,
        }
      });
      const reversedMessages = response.data.reverse(); // Invierte el orden de los mensajes
      setMessages(reversedMessages);// Invierte el orden de los mensajes

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
        <h1 className="m-title">Messages</h1>
        <div className="messages-items">
          {messages.map((message, index) => {
            return (
              <div className="message-item">
                <div key={index} className="messages">
                  <h2 className="message-title">{message.content}</h2>
                  <h3 className="message-date">{message.updatedAt}</h3>
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