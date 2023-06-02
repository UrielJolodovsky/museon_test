import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MuseosProps } from "@/types";
import { Router } from "next/router";
import { useRouter } from "next/router";

export interface IGetMuseosProps { }

export default function GetMuseos(props: IGetMuseosProps) {

  const [museos, setMuseos] = useState<MuseosProps[]>([])
  const router = useRouter()
  
  const handleClickButton = (id: any) => {
    window.location.href = `/dashboard/?id=${id}`
  }

  useEffect(() => {
    viewMuseos()
  }, [museos])

  const { setError } = useForm()

  const viewMuseos = async () => {
    try {

      await axios.get('api/museos')
        .then((res) => {
          console.log(res.data)
          setMuseos(res.data)
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
     <div>
     {museos.map(({id, name, title}) => {
            return (
              <div key={id} className="message-item">
                <div className="messages">
                  <h1 className="message-title">{name}</h1>
                  <h2 className="message-date">{title}</h2>
                </div>
              </div>
            )
          })
          }
     </div>
     </>
    )

}