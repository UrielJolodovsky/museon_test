import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

export interface IHeaderProps { }

export default function Header(props: IHeaderProps) {
  const { data: sessionData, status } = useSession();
  const nombre = sessionData?.user ? sessionData?.user?.name : "";
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="header-container">
      <Link className="start-icon" href="/">
        {" "}
        <HiHome />{" "}
      </Link>
      <div className="saludo-container">
        <h1 className="header-title">Hello !!</h1>
        <h3 className="header-subtitle">Logged in as {nombre}</h3>
      </div>
      <div className="logIn-container">
        {sessionData?.user ? (
          <div className="user-container">
            <Image
              className="user-image"
              width={50}
              height={50}
              src={sessionData?.user?.image ?? "public/next.svg"}
              alt={sessionData?.user?.name ?? ""}
            />
            <button className="logOut-button" onClick={() => void signOut()}>
              <FiLogOut />
            </button>
          </div>
        ) : (
          <button
            className="logIn-button"
            onClick={handleLogin}
          >
            <FiLogIn />
          </button>
        )}
      </div>
    </div>
  );
}
