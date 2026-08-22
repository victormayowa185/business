// src/components/Navbar.tsx
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';
import {
    PRELOADER_COMPLETE_EVENT,
    NAV_ENTRANCE_COMPLETE_EVENT,
} from '../utils/appEvents';

// Module-level flag (persists for the whole app session, resets on a
// real page reload since the module re-evaluates then) — lets any
// component check synchronously whether the one-time entrance
// sequence has already played, without needing React context.
declare global {
    interface Window {
        __navEntranceComplete?: boolean;
    }
}

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

    // ─── Scroll listener using Intersection Observer ───
    useEffect(() => {
        const handleScroll = (e: Event) => {
            const { isVisible } = (e as CustomEvent).detail;
            setScrolled(!isVisible); // When hero is NOT visible, set scrolled to true
        };

        // Initialize: assume hero is visible on page load (white/normal navbar)
        setScrolled(false);

        window.addEventListener('hero-visibility', handleScroll);
        return () => window.removeEventListener('hero-visibility', handleScroll);
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

    // ─── Entrance animation — bounce-drop, gated behind the preloader ───
    useEffect(() => {
        if (hasPlayedEntrance.current || !navInnerRef.current) return;
        hasPlayedEntrance.current = true;

        const el = navInnerRef.current;

        const playBounceDrop = () => {
            gsap.set(el, { y: '-140%', opacity: 0 });

            gsap.to(el, {
                y: '0%',
                opacity: 1,
                duration: 0.9,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    window.__navEntranceComplete = true;
                    window.dispatchEvent(new CustomEvent(NAV_ENTRANCE_COMPLETE_EVENT));
                },
            });
        };

        if (window.__navEntranceComplete) {
            gsap.set(el, { y: '0%', opacity: 1 });
            return;
        }

        window.addEventListener(PRELOADER_COMPLETE_EVENT, playBounceDrop, {
            once: true,
        });

        return () => {
            window.removeEventListener(PRELOADER_COMPLETE_EVENT, playBounceDrop);
        };
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