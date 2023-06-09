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
    const url = new URL(`https://museon-test.vercel.app/dashboard/${id}`)
    console.log(url.toString())
    router.push(url.toString())
  }

  useEffect(() => {
    viewMuseos()
  }, [museos])

  const { setError } = useForm()

  const viewMuseos = async () => {
    try {

      await axios.get('https://museon-test.vercel.app/api/museos')
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
      <div className="museo-container">
        {museos.map(({ id, name }) => {
          return (
            <div key={id} className="museo-item">
              <div className="museos">
                <button className="museos-btn" onClick={() => handleClickButton(id)}>
                  <h2 className="museos-name">{name}
                    <div className="line"></div>
                  </h2>
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