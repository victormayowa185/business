// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import News from './pages/News';
import './App.css';   // ← make sure you have this file (or change to index.css)

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Home />
      <News />
    </BrowserRouter>
  );
}

export default App;