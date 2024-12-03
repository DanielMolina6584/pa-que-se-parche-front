import React from 'react';
import Slider from 'react-slick';
import '../Styles/VideoCarrusel.css';

const VideoCarrusel = () => {
    const settings = {
        dots: true, // Mostrar los puntos de navegación
        dotsClass: "slick-dots",
        infinite: true, // Carrusel infinito
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Cambia de video cada 3 segundos
        arrows: false,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {/* Video 1 */}
                <div className="carousel-item">
                    <video className="carousel-video" autoPlay loop muted>
                        <source src="/media/carrusel3.mp4" type="video/mp4" />
                    </video>
                    <div className="carousel-overlay">
                        <h2 className="carousel-text font-varela">Video 1: Bienvenido</h2>
                        <p className="carousel-subtext font-dosis">Este es el primer video de nuestro carrusel.</p>
                    </div>
                </div>

                <div className="carousel-item">
                    <video className="carousel-video" autoPlay loop muted>
                        <source src="/media/carrusel2.mp4" type="video/mp4" />
                    </video>
                    <div className="carousel-overlay">
                        <h2 className="carousel-text font-varela">Video 2: Explorando</h2>
                        <p className="carousel-subtext font-dosis">En este video exploramos el mundo.</p>
                    </div>
                </div>

                <div className="carousel-item">
                    <video className="carousel-video" autoPlay loop muted>
                        <source src="/media/video_principal.mp4" type="video/mp4" />
                    </video>
                    <div className="carousel-overlay">
                        <h2 className="carousel-text font-varela">Video 3: ¡Únete a nosotros!</h2>
                        <p className="carousel-subtext font-dosis">El último video para cerrar el carrusel.</p>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default VideoCarrusel;