import React, {useState} from 'react';
import "../Styles/styles.css";
import requestApi from '../Helpers/RequestApi';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import {notificarUsuario} from "../Helpers/Validaciones";

const LoginRegistration = () => {
    const navigate = useNavigate()
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [loginData, setLoginData] = useState({
        name: '', email: '', contrasena: '', celular: ''
    });


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginData(prev => ({
            ...prev, [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            nombre: loginData.nombre,
            email: loginData.email,
            contrasena: loginData.contrasena,
            celular: loginData.celular
        };
        const response = await requestApi('autenticacion/registrar', 'POST', data);
        if (response.error === 0) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('rol', response.data.rol);
            localStorage.setItem('id', response.data.id);

            notificarUsuario('Registro Exitoso', false, false, () => navigate('/'));
        } else {
            notificarUsuario(response.mensaje, true);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email: loginData.email, contrasena: loginData.contrasena
        };
        const response = await requestApi('autenticacion/login', 'POST', data);
        if (response.error === 0) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('rol', response.data.rol);
            localStorage.setItem('id', response.data.id);

            notificarUsuario('Registro Exitoso', false, false, () => navigate('/'));
        } else {
            notificarUsuario(response.mensaje, true);
        }
    };

    return (<div className="login-cont font-dosis" id="container">
        <video
            className="video-background"
            autoPlay
            loop
            muted
            playsInline
        >
            <source src="/media/login.mp4" type="video/mp4"/>
            Tu navegador no soporta videos en HTML5.
        </video>
        <div className={`container-login ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleRegister}>
                    <h1 className="font-varela fw-bold">Crea tu Cuenta</h1>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={loginData.nombre}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        placeholder="Correo"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="contrasena"
                        value={loginData.contrasena}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        placeholder="Numero de Celular"
                        name="celular"
                        value={loginData.celular}
                        onChange={handleInputChange}
                    />
                    <button id="lila" className="font-varela fw-bold fs-6 mt-3">Registrar</button>
                </form>
            </div>

            <div className="form-container sign-in-container">
                <form onSubmit={handleLogin}>
                    <h1 className="font-varela fw-bold">Iniciar Sesión</h1>
                    <input
                        type="email"
                        placeholder="Correo"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="contrasena"
                        value={loginData.contrasena}
                        onChange={handleInputChange}
                    />
                    <a href="#" className="dosis fw-bold fs-6 mt-3 text-decoration-none mb-2">Olvidaste tu
                        contraseña?</a>
                    <button className="font-varela fw-bold fs-6">Iniciar sesión</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="font-varela fw-bold">¡Bienvenido!</h1>
                        <p className="font-dosis fs-5 fw-bold">Inicia sesión con tu cuenta</p>
                        <button
                            className="ghost font-dosis fs-5 fw-bold"
                            id="signIn"
                            onClick={() => setIsRightPanelActive(false)}
                        >
                            Inicia sesión
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="font-varela fw-bold">Hola!!!</h1>
                        <p className="font-dosis fs-5 fw-bold">Crea tu cuenta</p>
                        <button
                            className="ghost font-dosis fs-5 fw-bold"
                            id="signUp"
                            onClick={() => setIsRightPanelActive(true)}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default LoginRegistration;