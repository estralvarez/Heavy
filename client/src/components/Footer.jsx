import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div>
                <p>Contacto: info@encuestaapp.com</p>
                <p>Síguenos en nuestras redes sociales:</p>
                <ul>
                    <li><a href="https://facebook.com">Facebook</a></li>
                    <li><a href="https://twitter.com">Twitter</a></li>
                    <li><a href="https://instagram.com">Instagram</a></li>
                </ul>
            </div>
            <div>
                <p>&copy; {new Date().getFullYear()} Encuesta App. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;