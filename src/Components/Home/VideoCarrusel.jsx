import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../../Styles/VideoCarrusel.css';
import { isMobileOrTablet } from "../../Helpers/RequestApi";

const VideoCarrusel = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileOrTablet());

        const handleResize = () => {
            setIsMobile(isMobileOrTablet());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: true, // Remove dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false, // Show arrows
        swipeToSlide: true,
        touchThreshold: 10,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className={`carousel-container ${isMobile ? 'mobile-carousel' : ''}`}>
            <Slider {...settings}>
                {/* Video 1 */}
                <div className="carousel-item">
                    <div className="carousel-video-wrapper">
                        <video
                            className="carousel-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/media/carrusel3.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="carousel-overlay">
                        <h2 className="carousel-text font-varela">Video 1: Bienvenido</h2>
                        <p className="carousel-subtext font-dosis">Este es el primer video de nuestro carrusel.</p>
                    </div>
                </div>

                {/* Video 2 */}
                <div className="carousel-item">
                    <div className="carousel-video-wrapper">
                        <video
                            className="carousel-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/media/carrusel2.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="carousel-overlay">
                        <h2 className="carousel-text font-varela">Video 2: Explorando</h2>
                        <p className="carousel-subtext font-dosis">En este video exploramos el mundo.</p>
                    </div>
                </div>

                {/* Video 3 */}
                <div className="carousel-item">
                    <div className="carousel-video-wrapper">
                        <video
                            className="carousel-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/media/video_principal.mp4" type="video/mp4" />
                        </video>
                    </div>
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