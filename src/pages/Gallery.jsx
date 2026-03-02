import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import './Gallery.css';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}gallery/config.json`)
            .then(res => res.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load gallery config:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex-center h-full">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="gallery-container animate-fade-in-up">
            <h1 className="page-title text-gradient">Photo Gallery</h1>
            <p className="page-subtitle">A collection of stunning moments.</p>

            <div className="masonry-grid">
                {images.map((img, index) => (
                    <div key={index} className={`gallery-item delay-\${(index % 3) + 1} animate-fade-in-up`}>
                        <div className="img-wrapper glass-panel">
                            {/* Fallback color if image misses or is loading */}
                            <div className="img-placeholder">
                                <img
                                    src={`${import.meta.env.BASE_URL}gallery/${img.src}`}
                                    alt={img.text}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop';
                                    }}
                                />
                            </div>
                            <div className="img-overlay text-gradient">
                                <p>{img.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {images.length === 0 && (
                    <p className="text-muted">No images found in gallery config.</p>
                )}
            </div>
        </div>
    );
}
