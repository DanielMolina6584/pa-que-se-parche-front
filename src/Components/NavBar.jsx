import React, {useState, useEffect, useCallback} from 'react';
import {FaUser, FaWhatsapp} from 'react-icons/fa';
import '../Styles/styles.css';
import {Link, useNavigate, useLocation} from "react-router-dom";
import verificarTokenRol from "../Helpers/VerificarTokenRol";

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false); // Nuevo estado para controlar el ícono de usuario
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
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

    const verificarUsuario = useCallback(async () => {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');

        if (token && rol) {
            try {
                const response = await verificarTokenRol({token, rol});
                if (response.error === 0) {
                    setIsAdmin(rol === 'admin');
                    setIsUserVerified(true);
                } else {
                    setIsAdmin(false);
                    setIsUserVerified(false);
                }
            } catch (error) {
                setIsAdmin(false);
                setIsUserVerified(false);
            }
        } else {
            setIsAdmin(false);
            setIsUserVerified(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        setIsDropdownOpen(false);
        setIsAdmin(false);
        setIsUserVerified(false);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector('.custom-dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        verificarUsuario();

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname, verificarUsuario]);

    return (
        <nav className={`navbar-melo ${isHidden ? 'hidden' : ''}`}>
            <Link to={"/"} className="text-decoration-none" onClick={verificarUsuario}>
                <div className="navbar-logo">
                    <img src="/media/logo/logo.png" alt="Logo" className="logo-image"/>
                </div>
            </Link>
            <ul className="navbar-menu font-dosis">
                <Link to={"/"} className="text-decoration-none" onClick={verificarUsuario}>
                    <li><a>Inicio</a></li>
                </Link>
                <Link to={"/"} className="text-decoration-none" onClick={verificarUsuario}>
                    <li><a>Nosotros</a></li>
                </Link>
                {isAdmin && (
                    <Link to={"/gestionar"} className="text-decoration-none" onClick={verificarUsuario}>
                        <li><a>Gestionar</a></li>
                    </Link>
                )}
                {!isUserVerified && (
                    <Link to={"/login"} className="text-decoration-none" onClick={verificarUsuario}>
                        <li><a>Regístrate</a></li>
                    </Link>
                )}
            </ul>
            <div className="navbar-icons">
                {isUserVerified && (
                    <div className="dropdown custom-dropdown" data-bs-auto-close="outside">
                        <button
                            className="btn btn-light"
                            type="button"
                            id="userDropdown"
                            onClick={toggleDropdown}
                        >
                            <FaUser className="icon user-icon"/>
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu dropdown-menu-start show">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            verificarUsuario();
                                            navigate('/perfil');
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Editar Perfil
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={handleLogout}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
                <FaWhatsapp className="icon whatsapp-icon" title="WhatsApp"/>
            </div>
        </nav>
    );
};

export default Navbar;
