import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ShaderImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShaderImage({ src, alt = '', className = '', style = {} }: ShaderImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  // Keep references to animate hover states smoothly
  const hoverValue = useRef<number>(0);
  const targetHoverValue = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get exact dimension bounds
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 450;

    // Initialize Three.js scene, camera, renderer
    const scene = new THREE.Scene();

    // Use orthographic camera for exact 2D projection fitting the container
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      1, 1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(src, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
    });

    // Custom Vertex & Fragment Shaders for exact fluid wave distortion on hover
    const uniforms = {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) }
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uHover;
      uniform vec2 uResolution;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        // Fluid wave ripple calculation based on hover factor
        float wave = sin(uv.x * 8.0 + uTime * 3.0) * 0.03 * uHover;
        float waveY = cos(uv.y * 8.0 + uTime * 3.0) * 0.03 * uHover;
        
        // Offset texture coordinates
        vec2 distortedUv = vec2(uv.x + waveY, uv.y + wave);
        
        // Fit cover calculation inside shader (like object-fit: cover)
        vec4 color = texture2D(uTexture, distortedUv);
        
        // Soft vignette overlay on hover
        float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y);
        vignette = clamp(pow(vignette * 16.0, 0.25), 0.0, 1.0);
        
        gl_FragColor = mix(color, color * 0.9, (1.0 - vignette) * uHover);
      }
    `;

    // Create PlaneGeometry matching container size
    const geometry = new THREE.PlaneGeometry(width, height, 16, 16);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, camera.right > 0 ? material : material);
    scene.add(mesh);

    // Setup mouse events on container
    const handleMouseEnter = () => {
      targetHoverValue.current = 1.0;
    };

    const handleMouseLeave = () => {
      targetHoverValue.current = 0.0;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Interpolate hover values for smooth elastic physics transitions
      hoverValue.current += (targetHoverValue.current - hoverValue.current) * 0.08;
      
      // Update shader uniforms
      uniforms.uTime.value = elapsedTime;
      uniforms.uHover.value = hoverValue.current;

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      renderer.setSize(w, h);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();

      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up WebGL resources to prevent GPU memory leaks
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
