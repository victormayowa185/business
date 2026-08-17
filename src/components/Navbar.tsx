// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false); // 👈 NEW STATE
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

    // ─── ✨ NEW: Scroll listener for text color change ───
    useEffect(() => {
        const handleScroll = () => {
            // Hero is 100vh, so when we scroll past ~80% of viewport height,
            // we switch to dark text. Adjust threshold as needed.
            const scrollY = window.scrollY;
            const threshold = window.innerHeight * 0.8; // 80% of viewport height
            setScrolled(scrollY > threshold);
        };

        // Initial check on mount
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        // Also re-check on resize (viewport height may change)
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
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
                    {/* ─── LEFT: Logo ─── */}
                    <div className="navbar-brand">
                        <div className="brand-logo-wrapper">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="brand-logo-img"
                            />
                        </div>
                    </div>

                    {/* ─── CENTER: Glassy pill with 4 links ─── */}
                    <div className="nav-center-glass">
                        <NavLink to="/about" className="glass-link">About</NavLink>
                        <NavLink to="/investments" className="glass-link">Investments</NavLink>
                        <NavLink to="/videos" className="glass-link">Videos</NavLink>
                        <NavLink to="/contact" className="glass-link">Contact</NavLink>
                        <NavLink to="/news" className="glass-link">News & Articles</NavLink>
                    </div>

                    {/* ─── RIGHT: News & Articles (outside glass) ─── */}
                    <div className="nav-right-news">
                        {/* If you want a separate link outside the glass, put it here */}
                    </div>

                    {/* ─── Hamburger (mobile) ─── */}
                    <button className="hamburger" onClick={toggleMenu}>
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* ─── Mobile Drawer ─── */}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                    <li><NavLink to="/videos" onClick={closeMenu}>Videos</NavLink></li>
                    <li><NavLink to="/investments" onClick={closeMenu}>Investments</NavLink></li>
                    <li><NavLink to="/news" onClick={closeMenu}>News & Articles</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
                </ul>
            </nav>

            {/* Overlay for mobile menu */}
            {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
        </>
    );
};

export default Navbar;