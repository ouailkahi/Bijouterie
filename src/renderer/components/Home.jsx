import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Home() {
  const [showMenu,setShowMenu] = useState(false);
  const changeShowMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <React.Fragment>
      <SideBar showMenu={showMenu} changeShowMenu={changeShowMenu}/>
      <div className="ec-page-wrapper" onClick={() => {
        if(showMenu){
          changeShowMenu()
        }
      }}>
        <Header changeShowMenu={changeShowMenu}/>
        <Outlet />
      </div>
    </React.Fragment>
  );
}
