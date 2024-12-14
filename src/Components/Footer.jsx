import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-5" style={{ backgroundColor: '#34065F' }}>
            <div className="container">
                <div className="row text-light">
                    <div className="col-12 col-md-4 bordes-footer d-flex flex-column align-items-center justify-content-center text-center">
                        <h3 className="h5 mb-3 font-varela fs-4 fa-bold">Sobre Nosotros</h3>
                        <p className="font-dosis fs-5">
                            Somos una empresa comprometida con la calidad y el servicio al cliente.
                            Nuestra misión es proporcionar soluciones innovadoras que mejoren tu experiencia.
                        </p>
                    </div>

                    <div className="col-12 col-md-4 bordes-footer d-flex flex-column align-items-center justify-content-center text-center mt-sm-3">
                        <h3 className="h5 mb-3 font-varela fs-4 fa-bold">Contacto</h3>
                        <ul className="list-unstyled font-dosis fs-5">
                            <li className="mb-2">Teléfono: +57 300 123 4567</li>
                            <li className="mb-2">Correo: contacto@empresa.com</li>
                            <li>Dirección: Calle 123, Ciudad, País</li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-4 d-flex bordes-footer-1 flex-column align-items-center justify-content-center text-center mt-sm-3">
                        <h3 className="h5 mb-3 font-varela fs-4 fa-bold">Síguenos</h3>
                        <div className="d-flex gap-3 mb-3 mt-4">
                            <a href="#" className="">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="">
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                        <p className="font-dosis fs-5 small">
                            © {currentYear} Cosmic Pixels. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
