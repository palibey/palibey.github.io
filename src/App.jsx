import { Routes, Route, NavLink } from 'react-router-dom';
import { Sparkles, Image, Gamepad2 } from 'lucide-react';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Game from './pages/Game';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand text-gradient">
          <Sparkles className="brand-icon" size={28} />
          <span>Lumina</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Gallery
          </NavLink>
          <NavLink to="/game" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Game
          </NavLink>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
