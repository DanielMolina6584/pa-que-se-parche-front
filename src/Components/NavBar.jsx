import React, {useState, useEffect, useCallback} from 'react';
import {FaUser, FaWhatsapp, FaBars, FaTimes, FaArrowLeft, FaChevronDown} from 'react-icons/fa';
import '../Styles/styles.css';
import {Link, useNavigate, useLocation} from "react-router-dom";
import verificarTokenRol from "../Helpers/VerificarTokenRol";
import {isMobileOrTablet} from "../Helpers/RequestApi";

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isGestionarDropdownOpen, setIsGestionarDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let lastScrollY = 0;

    useEffect(() => {
        const checkearTipoDispositivo = () => {
            setIsMobile(isMobileOrTablet());
        };

        checkearTipoDispositivo();
        window.addEventListener('resize', checkearTipoDispositivo);

        return () => {
            window.removeEventListener('resize', checkearTipoDispositivo);
        };
    }, []);

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
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleGestionarDropdown = (e) => {
        e.stopPropagation();
        setIsGestionarDropdownOpen(!isGestionarDropdownOpen);
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

    const navbarEscritorio = () => (
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
                    <li className="dropdown-container">
                        <a onClick={toggleGestionarDropdown} className="dropdown-toggle">
                            Gestionar
                        </a>
                        {isGestionarDropdownOpen && (
                            <ul className="dropdown-menu-melo list-unstyled">
                                <li className="e">
                                    <Link
                                        to={"/gestionar/usuarios"}
                                        className="text-decoration-none"
                                        onClick={() => {
                                            verificarUsuario();
                                            setIsMobileMenuOpen(false);
                                            setIsGestionarDropdownOpen(false);
                                        }}
                                    >
                                        Usuarios
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
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
                <a href="https://wa.me/+573001234567" target="_blank">
                    <FaWhatsapp className="icon whatsapp-icon" title="WhatsApp"/>
                </a>
            </div>
        </nav>
    );

    const navbarMovil = () => (
        <nav className={`navbar-melo mobile ${isHidden ? 'hidden' : ''}`}>
            <div className="mobile-navbar-container">
                <button
                    className="mobile-menu-toggle menu-btn"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <FaTimes/> : <FaBars/>}
                </button>

                <div className="mobile-navbar-logo-icons">
                    <Link to={"/"} className="text-decoration-none" onClick={verificarUsuario}>
                        <div className="mobile">
                            <img src="/media/logo/logo.png" alt="Logo" className="logo-image"/>
                        </div>
                    </Link>

                    <div className="mobile-navbar-icons">
                        <a href="https://wa.me/+573001234567" target="_blank" className="pe-0 me-0 text-end">
                            <FaWhatsapp className="icon whatsapp-icon" title="WhatsApp"/>
                        </a>
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
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <button
                        className="mobile-menu-back-btn"
                        onClick={toggleMobileMenu}
                    >
                        <FaArrowLeft/> Menú
                    </button>
                    <ul className="mobile-navbar-menu font-dosis">
                        <li>
                            <Link
                                to={"/"}
                                className="text-decoration-none"
                                onClick={() => {
                                    verificarUsuario();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/"}
                                className="text-decoration-none"
                                onClick={() => {
                                    verificarUsuario();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Nosotros
                            </Link>
                        </li>
                        {isAdmin && (
                            <li className="dropdown-container">
                                <a
                                    onClick={toggleGestionarDropdown}
                                    className="dropdown-toggle"
                                >
                                    Gestionar
                                </a>
                                {isGestionarDropdownOpen && (
                                    <ul className="mobile-dropdown-menu list-unstyled">
                                        <li>
                                            <Link
                                                to={"/gestionar/usuarios"}
                                                className="text-decoration-none"
                                                onClick={() => {
                                                    verificarUsuario();
                                                    setIsMobileMenuOpen(false);
                                                    setIsGestionarDropdownOpen(false);
                                                }}
                                            >
                                                Usuarios
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )}
                        {!isUserVerified && (
                            <li>
                                <Link
                                    to={"/login"}
                                    className="text-decoration-none"
                                    onClick={() => {
                                        verificarUsuario();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Regístrate
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );

    return isMobile ? navbarMovil() : navbarEscritorio();
};

export default Navbar;