import * as React from "react";
import Header from "@/components/Header";
import AddComment from "@/components/AddComment";
import Cards from "@/components/Cards";
import GetMuseos from "@/components/GetMuseos";

export interface IDashboardProps { }

export default function Dashboard(props: IDashboardProps) {
  return (
    <>
      <Header />
      <div className="container-dash-comp">
        <GetMuseos />
      </div>
    </>
  );
}