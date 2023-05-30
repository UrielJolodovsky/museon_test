import * as React from "react";
import Login from "../../components/Login";


export interface ILoginProps { }

export default function LoginHome(props: ILoginProps) {
  return (
    <>
      <Login />
    </>
  );
}