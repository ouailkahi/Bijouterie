import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "mdi mdi-view-dashboard-outline",
    subMenu: null,
  },
  {
    title: "Users",
    href: "users",
    icon: "mdi mdi-account-group",
    subMenu: [
      {
        title: "User List",
        href: "/admin/users",
      },
    ],
  },
  {
    title: "Category",
    href: "category",
    icon: "mdi mdi-dns-outline",
    subMenu: [
      {
        title: "Add Category",
        href: "/admin/category",
      },
    ],
  },
  {
    title:"Orders",
    href: "orders",
    icon: "mdi mdi-cart",
    subMenu: [
      {
        title: "Order Overview",
        href: "/admin/orders",
      },
    ],
  }
];
export default function SideBar({showMenu}) {
  const [active, setActive] = useState("");
  const [expand, setExpand] = useState("");
  const location = useLocation();
  useEffect(() => {
    // Set the active state whenever the pathname changes
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div  className={"ec-left-sidebar ec-bg-sidebar" + (showMenu === true ? " your-element": "")}>
        <div id="sidebar" className="sidebar ec-sidebar-footer">
          <div className="ec-brand">
            <Link to={"/admin"} title="Gavilia">
              <img
                className="ec-brand-icon"
                src="/assets/logo.png"
                alt="Gavilia"
                style={{maxWidth:"80px"}}
              />
            </Link>
          </div>

          <div className="ec-navigation" data-simplebar>
            <ul className="nav sidebar-inner" id="sidebar-menu">
              {menu.map((item, index) => (
                <li
                  className={
                    (item.subMenu !== null ? "has-sub" : "") +
                    (item.subMenu !== null && active.split("/")[2] == item.href ? " active" : "") +
                    (item.subMenu === null && active === item.href ? " active" : "") +
                    (expand == item.title ? " expand" : "")
                  }
                  key={index}
                >
                  <Link
                    className="sidenav-item-link"
                    to={item.href}
                    onClick={(e) => {
                      if (item.subMenu !== null) {
                        e.preventDefault();
                        if(expand === item.title){
                           setExpand("");
                        }else{
                            setExpand(item.title);
                        }
                      }
                    }}
                  >
                    <i className={item.icon}></i>
                    <span className="nav-text">{item.title}</span>
                    {item.subMenu !== null && <b className="caret"></b>}
                  </Link>
                  {item.subMenu !== null && (
                    <div className="collapse" style={{display:expand === item.title ? "block": "none"}}>
                      <ul className="sub-menu" data-parent="#sidebar-menu">
                        {item.subMenu.map((itemSub, indexSub) => (
                          <li key={indexSub}>
                            <Link
                              className="sidenav-item-link"
                              to={itemSub.href}
                            >
                              <span className="nav-text">{itemSub.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {index <= 1 && <hr />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
