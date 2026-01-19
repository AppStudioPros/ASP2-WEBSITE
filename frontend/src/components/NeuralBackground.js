import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function NeuralBackground() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Cyber blue and purple colors
    const color1 = new THREE.Color(0x667eea); // Blue
    const color2 = new THREE.Color(0x764ba2); // Purple
    const color3 = new THREE.Color(0x00ffff); // Cyan

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Positions
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      // Colors - mix of cyber blue and purple
      const mixColor = Math.random();
      let color;
      if (mixColor < 0.33) {
        color = color1;
      } else if (mixColor < 0.66) {
        color = color2;
      } else {
        color = color3;
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    // Create connections (lines between nearby particles)
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8a2be2,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (particlesRef.current) {
        // Rotate particles
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;

        // Mouse influence
        const positions = particlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Subtle wave motion
          positions[i3 + 1] += Math.sin(Date.now() * 0.001 + i * 0.1) * 0.01;
          
          // Mouse attraction
          const dx = mouseRef.current.x * 50 - positions[i3];
          const dy = mouseRef.current.y * 50 - positions[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 20) {
            positions[i3] += dx * 0.001;
            positions[i3 + 1] += dy * 0.001;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;

        // Update connections
        const linePositions = [];
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const x1 = positions[i3];
          const y1 = positions[i3 + 1];
          const z1 = positions[i3 + 2];

          // Check nearby particles
          for (let j = i + 1; j < Math.min(i + 5, particleCount); j++) {
            const j3 = j * 3;
            const x2 = positions[j3];
            const y2 = positions[j3 + 1];
            const z2 = positions[j3 + 2];

            const dx = x2 - x1;
            const dy = y2 - y1;
            const dz = z2 - z1;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 8) {
              linePositions.push(x1, y1, z1, x2, y2, z2);
            }
          }
        }

        lines.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(linePositions, 3)
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-background" />;
}

export default NeuralBackground;
