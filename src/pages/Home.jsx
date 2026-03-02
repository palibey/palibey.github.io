import { useNavigate } from 'react-router-dom';
import { Image, Gamepad2, ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container animate-fade-in-up">
            <header className="hero-section text-center">
                <h1 className="hero-title text-gradient delay-1">Welcome to Lumina</h1>
                <p className="hero-subtitle delay-2">Explore the infinite possibilities of visual art and interactive challenges.</p>
            </header>

            <div className="features-grid delay-3">
                <div className="feature-card glass-panel group" onClick={() => navigate('/gallery')}>
                    <div className="icon-wrapper bg-primary/20">
                        <Image size={48} className="text-primary" />
                    </div>
                    <h2>Photo Gallery</h2>
                    <p>Browse through a curated collection of stunning imagery with dynamic layouts.</p>
                    <button className="btn-secondary mt-4">
                        View Gallery <ArrowRight size={18} />
                    </button>
                </div>

                <div className="feature-card glass-panel group" onClick={() => navigate('/game')}>
                    <div className="icon-wrapper bg-secondary/20">
                        <Gamepad2 size={48} className="text-secondary" />
                    </div>
                    <h2>Infinite Quiz</h2>
                    <p>Test your knowledge with an infinitely expanding dataset of questions.</p>
                    <button className="btn-secondary mt-4">
                        Play Game <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
