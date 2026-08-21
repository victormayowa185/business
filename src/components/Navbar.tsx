// src/components/Navbar.tsx
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>('');
    const navRef = useRef<HTMLDivElement>(null);
    const navInnerRef = useRef<HTMLDivElement>(null);
    const isHiddenRef = useRef(false);
    const hasPlayedEntrance = useRef(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    // Click outside to close
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // Hide/show navbar on scroll (via custom event)
    useEffect(() => {
        const handleVisibility = (e: Event) => {
            const { hidden } = (e as CustomEvent).detail;
            if (hidden === isHiddenRef.current) return;
            isHiddenRef.current = hidden;
            gsap.to(navRef.current, {
                y: hidden ? '-130%' : '0%',
                opacity: hidden ? 0 : 1,
                duration: 0.35,
                ease: 'power2.out',
            });
        };
        window.addEventListener('navbar-visibility', handleVisibility);
        return () => window.removeEventListener('navbar-visibility', handleVisibility);
    }, []);

    // ─── Scroll listener for text color + logo change ───
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = window.innerHeight * 0.8;
            setScrolled(scrollY > threshold);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // ─── Live Clock: Nigerian Time (WAT) ───
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-GB', {
                timeZone: 'Africa/Lagos',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            setCurrentTime(timeString);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    // Entrance animation – plays automatically on mount
    useEffect(() => {
        if (hasPlayedEntrance.current || !navInnerRef.current) return;
        hasPlayedEntrance.current = true;

        gsap.set(navInnerRef.current, { y: '-120%', opacity: 0 });

        gsap.to(navInnerRef.current, {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
        });
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} ref={navRef}>
                <div className="navbar-inner" ref={navInnerRef}>
                    {/* ─── LEFT: Logo (clickable → home) ─── */}
                    <div className="navbar-brand">
                        <div className="brand-logo-wrapper">
                            <Link to="/">
                                <img
                                    src={scrolled ? "/logo-dark.png" : "/logo.png"}
                                    alt="Logo"
                                    className="brand-logo-img"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* ─── CENTER: Glassy pill with 5 links ─── */}
                    <div className="nav-center-glass">
                        <NavLink to="/about" className="glass-link">ABOUT</NavLink>
                        <NavLink to="/investments" className="glass-link">INVESTMENTS</NavLink>
                        <NavLink to="/videos" className="glass-link">VIDEOS</NavLink>
                        <NavLink to="/contact" className="glass-link">CONTACT</NavLink>

                    </div>

                    {/* ─── RIGHT: Live Clock (WAT) ─── */}
                    <div className="nav-clock">
                        <span className="nav-clock__label">WAT</span>
                        <span className="nav-clock__time">{currentTime}</span>
                    </div>

                    {/* ─── Hamburger (mobile) ─── */}
                    <button className="hamburger" onClick={toggleMenu}>
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* ─── Mobile Drawer ─── */}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><NavLink to="/about" onClick={closeMenu}>ABOUT</NavLink></li>
                    <li><NavLink to="/videos" onClick={closeMenu}>VIDEOS</NavLink></li>
                    <li><NavLink to="/investments" onClick={closeMenu}>INVESTMENTS</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeMenu}>CONTACT</NavLink></li>
                </ul>
            </nav>

            {/* Overlay for mobile menu */}
            {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
        </>
    );
};

export default Navbar;