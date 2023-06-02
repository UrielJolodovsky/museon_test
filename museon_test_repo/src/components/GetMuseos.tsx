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
    const url = new URL(`http://localhost:3000/dashboard/${id}`)
    console.log(url.toString())
    router.push(url.toString())
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
                  <button onClick={() => handleClickButton(museo.id)}>
                  <h1 className="message-title">{museo.id}</h1>
                  <h2 className="message-date">{museo.name}</h2>
                  {/* Use params */}
                  </button>
                </div>
              </div>
            )
          })
          }
     </div>
     </>
    )

}