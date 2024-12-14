import React from 'react';
import {Row, Col} from 'react-bootstrap';
import '../Styles/styles.css';
import VideoCarrusel from "../Components/Home/VideoCarrusel";
import ExperienciaInfo from "../Components/Home/ExperienciaInfo";

const Home = () => {
    return (
        <div className="home-container">
            <VideoCarrusel/>

            <div className="container my-5">
                <Row className="d-flex align-items-center g-4">
                    <Col md={6}>
                        <h3 className="font-varela text-light mb-4 fs-2 text-center">Experiencia Gaming Profesional</h3>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src="/media/iconos/icono-tres.jpeg"
                                alt="Gaming Setup"
                                className="img-fluid shadow-lg me-2"
                                style={{width: "120px", height: "120px"}}
                            />
                            <p className="font-dosis text-light m-0 fs-5">Equipos de última generación para una
                                experiencia
                                inmersiva</p>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <p className="font-dosis text-light m-0 fs-5 ms-3">Instalaciones de alto rendimiento con
                                tecnología de
                                punta</p>
                            <img
                                src="/media/iconos/icono-dos.jpeg"
                                alt="Gaming Setup"
                                className="img-fluid shadow-lg ms-3"
                                style={{width: "120px", height: "120px"}}
                            />

                        </div>
                        <div className="d-flex align-items-center">
                            <img
                                src="/media/iconos/icono-uno.jpeg"
                                alt="Gaming Setup"
                                className="img-fluid shadow-lg me-2"
                                style={{width: "120px", height: "120px"}}
                            />
                            <p className="font-dosis text-light m-0 fs-5">Soporte técnico y comunidad gamer dedicada</p>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-center">
                        <img
                            src="/media/salas/sala-gamer.jpeg"
                            alt="Gaming Setup"
                            className="img-fluid shadow-lg img-sala-iconos"
                        />
                    </Col>
                </Row>
            </div>

            <Col className="p-0 mt-2 mb-5 position-relative">
                <div className="img-banner">
                    <img
                        src="/media/logo/despeja-tu-mente-fondo.png"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1900px", height: "300px"}}
                    />
                    <div
                        className="banner-content d-flex flex-column justify-content-center align-items-center text-center h-100 m-0">
                        <div className="text-center">
                            <h1 className="text-light display-5 font-varela mb-2">Explora el Mundo del Gaming</h1>
                            <p className="text-light mb-3 font-dosis fs-4">Conéctate, juega y diviértete como nunca
                                antes</p>
                            <button className="btn-principal mb-4 font-dosis ">Agendate</button>
                        </div>
                        <div className="container">
                            <Row className="d-flex align-items-center text-center g-0">
                                <Col md={4} className="mb-2">
                                    <h5 className="text-light font-varela fs-5">Cosmic Pixels</h5>
                                </Col>
                                <Col md={4} className="mb-2">
                                    <img
                                        src="/media/logo/logo.png"
                                        alt="Central Image"
                                        className="img-fluid"
                                        style={{maxWidth: "100%", height: "70px"}}
                                    />
                                </Col>
                                <Col md={4} className="mb-2">
                                    <h5 className="text-light font-varela fs-5">Contactanos: 3001234567</h5>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Col>

            <ExperienciaInfo/>

            <Col className="p-0 mt-2 mb-5">
                <div className="video-banner">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-100"
                    >
                        <source src="/media/banner%20video.mp4" type="video/mp4"/>
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            </Col>
        </div>
    );
};

export default Home;