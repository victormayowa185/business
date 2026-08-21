// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';  // ← import About
import News from './pages/News';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Investments from './pages/Investments';
import './App.css';
import Videos from './pages/Videos';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Preloader hidden={!isLoading} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />  {/* ← Add this */}
        <Route path="/news" element={<News />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;