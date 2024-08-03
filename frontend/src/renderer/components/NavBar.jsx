import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navbar = [
    {
        title: "Tableau de bord",
        href: "/",
        icon: "mdi mdi-view-dashboard-outline",

        subMenu: []
    },

    {
        title: "Catégories",
        href: "/categories",
        icon: "mdi mdi-bookmark",
        subMenu: []
    },

    {
        title: "Commandes",
        href: null,
        icon: "mdi mdi-cart",
        subMenu: [
            {
                title: "Commandes",
                href: "/orders",
            },
            {
                title: "Ajouter une commande",
                href: "/orders/add",
            }
        ]
    }
];

export default function NavBar({ sidebarOut, handleSideBar }) {
    const [subExpand, setSubExpand] = useState(null);
    const location = useLocation();
    const [url, setUrl] = useState("");
    const [urlSub, setUrlSub] = useState("");

    useEffect(() => {
        setUrl(location.pathname);
        setSubExpand(null); // Ferme tous les sous-menus lorsque la localisation change
    }, [location.pathname]);

    const handleSectionClick = (index) => {
        setSubExpand(index === subExpand ? null : index);
    };

    const toggleSidebar = () => {
        if (sidebarOut) {
            document.body.classList = 'ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light sidebar-minified-out';
        } else {
            document.body.classList = 'ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light sidebar-minified';
        }
        handleSideBar();
    };

    return (
        <React.Fragment>
            <div className="ec-left-sidebar ec-bg-sidebar" style={{ background: 'white', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', zIndex: "1000" }}>
                <div id="sidebar" className="sidebar ec-sidebar-footer">
                    <button id="sidebar-toggler" className="sidebar-toggle button-toggle"></button>
                    <div className="ec-brand">
                        <Link to="/" title="Ekka" onClick={(e) => {
                            e.preventDefault();
                            toggleSidebar();
                        }}>
                            <span className="ec-brand-name text-truncate" style={{ color: "BLACK", fontWeight: 'bold', fontFamily: 'serif' }}>Ktami</span>
                        </Link>
                    </div>
                    <div className="ec-navigation" data-simplebar>
                        <ul className="nav sidebar-inner" id="sidebar-menu" style={{ color: "black" }}>
                            {navbar.map((item, index) => (
                                <li
                                    className={(item.subMenu.length > 0 ? subExpand === index ? "has-sub expand" : "has-sub" : "") + ((url === item.href || urlSub === item.title) ? " active" : "")}
                                    key={index}
                                    style={{ color: "black" }}
                                >
                                    <Link
                                        to={item.href === null ? "#" : item.href}
                                        className="sidenav-item-link"
                                        onClick={(e) => {
                                            setUrlSub("");
                                            if (item.subMenu.length > 0) {
                                                e.preventDefault();
                                                handleSectionClick(index);
                                            }
                                        }}
                                    >
                                        <i className={item.icon} style={{ color: "black" }}></i>             
                                                                   <span className="nav-text" style={{ color: "BLACK", fontWeight: 'bold' }}>{item.title}</span>

                                    </Link>
                                    {item.subMenu.length > 0 && (
                                        <div className={subExpand === index ? "collapse show" : "collapse"}>
                                            <ul className="sub-menu" id={item.title} data-parent="#sidebar-menu" style={{ color: "black" }}>
                                                {item.subMenu.map((sub, indexSub) => (
                                                    <li key={indexSub} className={(url === sub.href ? " active" : "")} style={{ color: "black" }} onClick={() => setUrlSub(item.title)}>
                                                        <Link className="sidenav-item-link" to={sub.href}>
                                                            <span className="nav-text" style={{ color: "black", fontWeight: 'bold' }}>{sub.title}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
