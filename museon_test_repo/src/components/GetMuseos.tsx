import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MuseosProps } from "@/types";

export interface IGetMuseosProps { }

export default function GetMuseos(props: IGetMuseosProps) {

  const [museos, setMuseos] = useState<MuseosProps[]>([])

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
     {museos.map((museo, index) => {
            return (
              <div key={index} className="message-item">
                <div className="messages">
                  <h1 className="message-title">{museo.id}</h1>
                  <h2 className="message-date">{museo.name}</h2>
                </div>
              </div>
            )
          })
          }
     </div>
     
     </>
    )

}