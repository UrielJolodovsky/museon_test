import * as React from "react";
import Messages from "@/components/Messages";

export interface IMessageProps { }

export default function Message(props: IMessageProps) {
  return (
    <>
      <Messages/>
    </>
  );
}