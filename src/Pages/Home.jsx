import React, { useState } from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import '../Styles/styles.css';
import VideoCarrusel from "../Components/VideoCarrusel";

const Home = () => {
    const [activeKey, setActiveKey] = useState(null);

    const accordionData = [
        {
            id: '0',
            title: 'Game Lounge Premium',
            description: 'Disfruta la máxima experiencia gamer con tecnología de última generación, comodidad exclusiva y un ambiente diseñado para verdaderos jugadores.',
            image: '/media/salas/premium.avif',
            color: 'bg-dark text-white'
        },
        {
            id: '1',
            title: 'VIP Gaming Zone',
            description: 'Vive el lujo y la adrenalina del gaming en un espacio exclusivo con equipos de alta gama y atención personalizada. ¡Tu lugar para jugar como un verdadero VIP!',
            image: '/media/salas/sala-vip.avif',
            color: 'bg-purple text-white'
        },
        {
            id: '2',
            title: 'Zona Gamer',
            description: 'Sumérgete en la diversión con una experiencia de juego completa, ideal para todos los niveles. ¡Diversión asegurada para todos!',
            image: '/media/salas/sala-normal.jpg',
            color: 'bg-secondary text-white'
        }
    ];

    return (
        <div className="home-container">
            <VideoCarrusel/>

            <h2 className="home-title font-varela">Nuestras Salas de Juego</h2>

            <div className="container mt-5 mb-5">
                <Row>
                    <Col md={6} className="pe-4">
                        <div className="mb-5">
                            <p className="text-light fs-5 font-dosis">Descubre nuestras increíbles salas de videojuegos diseñadas para ofrecerte experiencias únicas. Contamos con opciones para todos los gustos: la Sala Premium, equipada con lo último en tecnología y un ambiente inigualable; la Sala VIP, donde el lujo y la exclusividad te harán sentir como un verdadero jugador élite; y la Sala Normal, perfecta para quienes buscan diversión y comodidad. Cada espacio está pensado para brindarte horas de entretenimiento inolvidable. ¡Ven y encuentra tu lugar en el mundo gamer!</p>
                        </div>
                        <Accordion
                            defaultActiveKey={null}
                            activeKey={activeKey}
                            onSelect={(eventKey) => setActiveKey(eventKey)}
                            className="custom-accordion"
                        >
                            {accordionData.map((item) => (
                                <Accordion.Item
                                    key={item.id}
                                    eventKey={item.id}
                                    className="mb-3 accordion-no-border"
                                >
                                    <Accordion.Header className={`accordion-header ${item.color} font-varela`}>
                                        {item.title}
                                    </Accordion.Header>
                                    <Accordion.Body className={`${item.color} font-dosis`}>
                                        {item.description}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>

                    <Col md={6} className="position-relative image-gallery-container">
                        {activeKey !== null ? (
                            accordionData.map((item) => (
                                <div
                                    key={item.id}
                                    className={`image-container ${activeKey === item.id ? 'visible' : ''}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="img-fluid rounded shadow-lg"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="image-container visible">
                                <img
                                    src="/media/salas/gif.gif"
                                    alt="Gaming GIF"
                                    className="img-fluid rounded"
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </div>

            <Col className="p-0 mt-2 mb-5">
                <div className="video-banner">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-100"
                    >
                        <source src="/media/banner%20video.mp4" type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            </Col>
        </div>
    );
};

export default Home;