import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from "../contexts/AuthContext"; 

const links = [
    {endpoint: "/", title: "Rooms"},
    {endpoint: "/profile", title: "Profile"},
]

const Header = () => {
    const location = useLocation()
    const { user } = useAuth();
    return user ? <ul className="nav justify-content-end header bg-dark">
        {links.map(link => <li key={link.endpoint} className="nav-item">
            <Link to={link.endpoint} className={`nav-link text-${location.pathname === link.endpoint ? "white" : "light"}${location.pathname === link.endpoint ? " bg-secondary" : ""}`}>{link.title}</Link>
        </li>)}
    </ul> : null
}

export default Header;