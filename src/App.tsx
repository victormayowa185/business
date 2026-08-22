// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Investments from './pages/Investments';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';
import Videos from './pages/Videos';
import {
  PRELOADER_COMPLETE_EVENT,
  PRELOADER_MIN_VISIBLE_MS,
  PRELOADER_TOTAL_MS,
  ANIMATION_DELAY_MS,
} from './utils/appEvents';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, PRELOADER_MIN_VISIBLE_MS);
    const completeTimer = setTimeout(() => {
      (window as any).__preloaderComplete = true;
      window.dispatchEvent(new CustomEvent(PRELOADER_COMPLETE_EVENT));
    }, PRELOADER_TOTAL_MS + ANIMATION_DELAY_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <Preloader hidden={!isLoading} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
} ``

export default App;