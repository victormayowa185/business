// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import News from './pages/News';
import Footer from './components/Footer';  // ← Import Footer
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />  {/* ← Add Footer here */}
    </BrowserRouter>
  );
}

export default App;