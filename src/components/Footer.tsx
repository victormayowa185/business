// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../styles/footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <hr className="footer-divider" />
            <div className="footer-inner">
                {/* ─── LEFT: Logo ─── */}
                <div className="footer-brand">
                    <img src="/logo-dark.png" alt="Logo" className="footer-logo" />
                </div>

                {/* ─── CENTER: Copyright + Designer Link ─── */}
                <div className="footer-center">
                    <p className="footer-copyright">
                        &copy; {currentYear} Designed by{' '}
                        <a
                            href="https://victormayowa.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            VICTOR MAYOWA
                        </a>
                    </p>
                </div>

                {/* ─── RIGHT: Social Icons ─── */}
                <div className="footer-social">
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="footer-social__link"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="footer-social__link"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="footer-social__link"
                    >
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;