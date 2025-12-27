import { useEffect, useRef, useState } from 'react';
import { Sparkles, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import './Preview3D.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const Preview3D = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#52C234', '#FF8A65', '#26A69A', '#FBC02D'
  ];

  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          let newSpeedX = particle.speedX;
          let newSpeedY = particle.speedY;

          if (newX <= 0 || newX >= 100) {
            newSpeedX = -particle.speedX;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            newSpeedY = -particle.speedY;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: particle.rotation + particle.rotationSpeed,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handleReset = () => {
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
  };

  return (
    <div className="preview-container">
      <div className="background-gradient"></div>

      <div className="grid-overlay"></div>

      <div className="content-wrapper">
        <header className="header">
          <div className="logo">
            <Zap className="logo-icon" />
            <span className="logo-text">WORKLAB 3D</span>
          </div>

          <div className="controls">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="control-btn"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={handleReset}
              className="control-btn"
              title="Reset"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </header>

        <div className="main-content">
          <div className="title-section">
            <div className="title-badge">
              <Sparkles size={16} />
              <span>AI POWERED</span>
            </div>
            <h1 className="main-title">
              Créations 3D
              <span className="gradient-text"> en Mouvement</span>
            </h1>
            <p className="subtitle">
              Explorez un univers de particules colorées en temps réel avec des effets 3D immersifs
            </p>
          </div>

          <div className="canvas-container" ref={containerRef}>
            <div className="canvas-inner">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="particle"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: `linear-gradient(135deg, ${particle.color}, ${particle.color}dd)`,
                    transform: `rotate(${particle.rotation}deg)`,
                    boxShadow: `0 0 ${particle.size / 2}px ${particle.color}66`,
                  }}
                />
              ))}

              <div className="center-element">
                <div className="rotating-ring ring-1"></div>
                <div className="rotating-ring ring-2"></div>
                <div className="rotating-ring ring-3"></div>
                <div className="center-core"></div>
              </div>
            </div>
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-label">Particules</span>
              <span className="stat-value">{particles.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status</span>
              <span className="stat-value">{isPlaying ? 'Actif' : 'Pause'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Mode</span>
              <span className="stat-value">3D</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">FPS</span>
              <span className="stat-value">60</span>
            </div>
          </div>
        </div>

        <div className="floating-cards">
          <div className="float-card card-1">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>Rendu Real-time</h3>
              <p>60 FPS</p>
            </div>
          </div>
          <div className="float-card card-2">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>Physique Avancée</h3>
              <p>Collision System</p>
            </div>
          </div>
          <div className="float-card card-3">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>Couleurs Dynamiques</h3>
              <p>12+ Palettes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="light-beam beam-1"></div>
      <div className="light-beam beam-2"></div>
      <div className="light-beam beam-3"></div>
    </div>
  );
};

export default Preview3D;
