import React, { useState, useEffect } from 'react';
import '../../Styles/styles.css';
import { isMobileOrTablet } from "../../Helpers/RequestApi";
import {Col, Row} from "react-bootstrap";

const ExperienciaInfo = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileOrTablet());
    }, []);


    const infoEscritorio = () => (
        <div className="container my-5">
            <Row className="d-flex align-items-center g-0">
                <Col md={6} className="d-flex flex-column justify-content-center pe-5">
                    <h3 className="font-varela text-light mb-4">Experiencia Gaming Única</h3>
                    <p className="font-dosis text-light fs-5">
                        Sumérgete en un mundo de entretenimiento sin límites. Nuestras instalaciones de última
                        generación te ofrecen la mejor experiencia de juego, con equipos de alto rendimiento,
                        ambientes temáticos y una comunidad de jugadores apasionados.
                    </p>
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                    <img
                        src="/media/sala-mela.avif"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1200px", height: "auto"}}
                    />
                </Col>
            </Row>

            <Row className="d-flex align-items-center g-0">
                <Col md={6} className="d-flex justify-content-center">
                    <img
                        src="/media/imagen-uno.jpg"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1200px", height: "auto"}}
                    />
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center ps-2 text-end">
                    <h3 className="font-varela text-light mb-4">Experiencia Gaming Única</h3>
                    <p className="font-dosis text-light fs-5">
                        Sumérgete en un mundo de entretenimiento sin límites. Nuestras instalaciones de última
                        generación te ofrecen la mejor experiencia de juego, con equipos de alto rendimiento,
                        ambientes temáticos y una comunidad de jugadores apasionados.
                    </p>
                </Col>
            </Row>

            <Row className="d-flex align-items-center g-0">
                <Col md={6} className="d-flex flex-column justify-content-center pe-5">
                    <h3 className="font-varela text-light mb-4">Experiencia Gaming Única</h3>
                    <p className="font-dosis text-light fs-5">
                        Sumérgete en un mundo de entretenimiento sin límites. Nuestras instalaciones de última
                        generación te ofrecen la mejor experiencia de juego, con equipos de alto rendimiento,
                        ambientes temáticos y una comunidad de jugadores apasionados.
                    </p>
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                    <img
                        src="/media/salas/premium.avif"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1200px", height: "auto"}}
                    />
                </Col>
            </Row>
        </div>
    )

    const infoMovil = () => (
        <div className="container my-5">
            <Row className="d-flex align-items-center g-0">
                <Col md={12} className="d-flex flex-column justify-content-center pe-5">
                    <h3 className="font-varela text-light mb-4 fs-2 fa-bold">Experiencia Gaming Única</h3>
                    <p className="font-dosis text-light fs-4">
                        Sumérgete en un mundo de entretenimiento sin límites. Nuestras instalaciones de última
                        generación te ofrecen la mejor experiencia de juego, con equipos de alto rendimiento,
                        ambientes temáticos y una comunidad de jugadores apasionados.
                    </p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <img
                        src="/media/sala-mela.avif"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1200px", height: "auto"}}
                    />
                </Col>
            </Row>

            <Row className="d-flex align-items-center g-0 mt-4">
                <Col md={12} className="d-flex flex-column justify-content-center ps-2 text-start">
                    <h3 className="font-varela text-light mb-4 fs-3 fa-bold">Experiencia Gaming Única</h3>
                    <p className="font-dosis text-light fs-4">
                        Sumérgete en un mundo de entretenimiento sin límites. Nuestras instalaciones de última
                        generación te ofrecen la mejor experiencia de juego, con equipos de alto rendimiento,
                        ambientes temáticos y una comunidad de jugadores apasionados.
                    </p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <img
                        src="/media/imagen-uno.jpg"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1200px", height: "auto"}}
                    />
                </Col>

            </Row>

            <Row className="d-flex align-items-center g-0 mt-4">
                <Col md={12} className="d-flex flex-column justify-content-center pe-5">
                    <h3 className="font-varela text-light mb-4 fs-3 fa-bold">Experiencia Gaming Única</h3>
                    <p className="font-dosis text-light fs-4">
                        Sumérgete en un mundo de entretenimiento sin límites. Nuestras instalaciones de última
                        generación te ofrecen la mejor experiencia de juego, con equipos de alto rendimiento,
                        ambientes temáticos y una comunidad de jugadores apasionados.
                    </p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <img
                        src="/media/salas/premium.avif"
                        alt="Gaming Experience"
                        className="img-fluid shadow-lg"
                        style={{width: "1200px", height: "auto"}}
                    />
                </Col>
            </Row>
        </div>
    );
    return isMobile ? infoMovil() : infoEscritorio()
};

export default ExperienciaInfo;