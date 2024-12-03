import React, { useState, useEffect } from 'react';
import { FaUser, FaWhatsapp } from 'react-icons/fa';
import '../Styles/styles.css';

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false);
    let lastScrollY = 0;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        lastScrollY = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar-melo ${isHidden ? 'hidden' : ''}`}>
            <div className="navbar-logo">
                <img src="/media/logo/logo.png" alt="Logo" className="logo-image" />
            </div>
            <ul className="navbar-menu font-dosis">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#agendate">Agéndate</a></li>
                <li><a href="#agendate">Registrate</a></li>
            </ul>
            <div className="navbar-icons">
                <FaUser className="icon user-icon" title="Iniciar Sesión / Registrarse" />
                <FaWhatsapp className="icon whatsapp-icon" title="WhatsApp" />
            </div>
        </nav>
    );
};

export default Navbar;