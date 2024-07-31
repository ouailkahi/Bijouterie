import React from "react";

export default function Header({changeShowMenu}) {
  return (
    <header className="ec-main-header" id="header">
      <nav className="navbar navbar-static-top navbar-expand-lg navbar-display" >
        <button id="sidebar-toggler " onClick={() => changeShowMenu()} className="sidebar-toggle button-toggle"></button>

        <div className="navbar-right">
          <ul className="nav navbar-nav">
            <li className="dropdown user-menu">
              <button
                className="dropdown-toggle nav-link ec-drop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/assets/img/user/user.png"
                  className="user-image"
                  alt="User Image"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu">
                <li className="dropdown-header">
                  <img
                    src="/assets/img/user/user.png"
                    className="img-circle"
                    alt="User Image"
                  />
                  <div className="d-inline-block">
                    John Deo{" "}
                    <small className="pt-1">john.example@gmail.com</small>
                  </div>
                </li>
                <li>
                  <a href="user-profile.html">
                    <i className="mdi mdi-account"></i> My Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-email"></i> Message
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <i className="mdi mdi-diamond-stone"></i> Projects{" "}
                  </a>
                </li>
                <li className="right-sidebar-in">
                  <a href="">
                    {" "}
                    <i className="mdi mdi-settings-outline"></i> Setting{" "}
                  </a>
                </li>
                <li className="dropdown-footer">
                  <a href="index.html">
                    {" "}
                    <i className="mdi mdi-logout"></i> Log Out{" "}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
