// src/components/Navbar.tsx
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';
import {
    PRELOADER_COMPLETE_EVENT,
    NAV_ENTRANCE_COMPLETE_EVENT,
} from '../utils/appEvents';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>('');
    const navRef = useRef<HTMLDivElement>(null);
    const navInnerRef = useRef<HTMLDivElement>(null);
    const isHiddenRef = useRef(false);
    const location = useLocation();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // ─── STABLE SCROLL LOGIC ───
    // Instead of trigger refs, we use a simple scroll listener for the visual swap.
    // This prevents the mobile "flicker" caused by IntersectionObserver math.
    useEffect(() => {
        const handleScroll = () => {
            const vh = window.innerHeight;
            const scrollPos = window.scrollY;
            
            // On mobile, the transition usually happens around the end of the hero.
            // We turn the navbar "dark" (scrolled) once we've scrolled past 85% of the hero.
            if (scrollPos > vh * 0.85) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once on mount/route change
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]); // Re-run when page changes

    // ─── HIDE/SHOW NAVBAR ON SCROLL UP/DOWN ───
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

    // ─── LIVE CLOCK (WAT) ───
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-GB', {
                timeZone: 'Africa/Lagos',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // ─── ENTRANCE ANIMATION ───
    useEffect(() => {
        if (!navInnerRef.current) return;
        const el = navInnerRef.current;

        const playBounceDrop = () => {
            gsap.set(el, { y: '-140%', opacity: 0 });
            gsap.to(el, {
                y: '0%',
                opacity: 1,
                duration: 0.9,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    window.dispatchEvent(new CustomEvent(NAV_ENTRANCE_COMPLETE_EVENT));
                },
            });
        };

        window.addEventListener(PRELOADER_COMPLETE_EVENT, playBounceDrop, { once: true });
        return () => window.removeEventListener(PRELOADER_COMPLETE_EVENT, playBounceDrop);
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} ref={navRef}>
                <div className="navbar-inner" ref={navInnerRef}>
                    <div className="navbar-brand">
                        <div className="brand-logo-wrapper">
                            <Link to="/">
                                <img
                                    src={scrolled ? "/logo-dark.webp" : "/logo.webp"}
                                    alt="Logo"
                                    className="brand-logo-img"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="nav-center-glass">
                        <NavLink to="/about" className="glass-link">ABOUT</NavLink>
                        <NavLink to="/investments" className="glass-link">INVESTMENTS</NavLink>
                        <NavLink to="/videos" className="glass-link">VIDEOS</NavLink>
                        <NavLink to="/contact" className="glass-link">CONTACT</NavLink>
                    </div>

                    <div className="nav-clock">
                        <span className="nav-clock__label">WAT</span>
                        <span className="nav-clock__time">{currentTime}</span>
                    </div>

                    <button className="hamburger" onClick={toggleMenu}>
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><NavLink to="/about" onClick={closeMenu}>ABOUT</NavLink></li>
                    <li><NavLink to="/videos" onClick={closeMenu}>VIDEOS</NavLink></li>
                    <li><NavLink to="/investments" onClick={closeMenu}>INVESTMENTS</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeMenu}>CONTACT</NavLink></li>
                </ul>
            </nav>
            {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
        </>
    );
};

export default Navbar;