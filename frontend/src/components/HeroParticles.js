import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const HeroParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // ASP brand colors: cyan/blue with some fire accents
  const options = useMemo(() => ({
    background: { color: 'transparent' },
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { 
        value: 80, 
        density: { enable: true, area: 900 } 
      },
      color: { value: ['#00E5FF', '#2196F3', '#00B8D4', '#FF6A00'] },
      opacity: { 
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1
        }
      },
      size: { 
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1
        }
      },
      move: { 
        enable: true, 
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' }
      },
      links: { enable: false },
      shape: { type: 'circle' }
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.3,
            color: '#00E5FF'
          }
        }
      }
    }
  }), []);

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0" 
      aria-hidden="true" 
      data-testid="hero-particles-canvas"
    >
      <Particles 
        id="hero-particles" 
        options={options} 
        init={particlesInit}
        className="w-full h-full"
      />
    </div>
  );
};

export default HeroParticles;
