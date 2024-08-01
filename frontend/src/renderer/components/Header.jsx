import React from "react";

export default function Header({changeShowMenu}) {
  return (
    <header className="ec-main-header" id="header">
      <nav className="navbar navbar-static-top navbar-expand-lg navbar-display" >
        <button id="sidebar-toggler " onClick={() => changeShowMenu()} className="sidebar-toggle button-toggle"></button>

      </nav>
    </header>
  );
}
