import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

export default function Home() {
  const [sidebarOut, setSidebarOut] = useState(false);

  const handleSideBar = () =>{
    setSidebarOut(!sidebarOut);
  }

  return (
    <React.Fragment>
      <div className="wrapper">
        <NavBar sidebarOut={sidebarOut} handleSideBar={handleSideBar}  />
        <div className="ec-page-wrapper">
          <Header sidebarOut={sidebarOut} handleSideBar={handleSideBar}/>
          <Outlet/>
        </div>
      </div>
    </React.Fragment>
  );
}
