import * as React from "react";
import Header from "@/components/Header";
import AddComment from "@/components/AddComment";

export interface IDashboardProps { }

export default function Dashboard(props: IDashboardProps) {
  return (
    <>
        <Header />
        <AddComment />
    </>
  );
}