import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface PetalData {
  mesh: THREE.Mesh;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  vrx: number;
  vry: number;
  vrz: number;
  swaySpeed: number;
  swayAmount: number;
  phase: number;
  scale: number;
  baseVrx: number;
  baseVry: number;
  baseVrz: number;
}

export default function FloatingPetalsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup - Perspective
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xffeede, 1.0, 20);
    pointLight.position.set(-4, -2, 5);
    scene.add(pointLight);

    // Procedural Petal Geometry Generator
    // Bends a standard 2D shape in 3D to create realistic organic flower petals
    const createPetalGeometry = (type: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);

      if (type === 0) {
        // Broad oval rose-like petal
        shape.quadraticCurveTo(0.6, 0.4, 0.4, 0.9);
        shape.quadraticCurveTo(0.0, 1.2, -0.4, 0.9);
        shape.quadraticCurveTo(-0.6, 0.4, 0, 0);
      } else if (type === 1) {
        // Slender pointed lily/jasmine petal
        shape.quadraticCurveTo(0.3, 0.5, 0.2, 1.2);
        shape.quadraticCurveTo(0.0, 1.6, -0.2, 1.2);
        shape.quadraticCurveTo(-0.3, 0.5, 0, 0);
      } else {
        // Heart-shaped curved petal
        shape.bezierCurveTo(0.5, 0.2, 0.6, 0.8, 0.2, 1.1);
        shape.bezierCurveTo(0.0, 1.2, 0.0, 1.2, -0.2, 1.1);
        shape.bezierCurveTo(-0.6, 0.8, -0.5, 0.2, 0, 0);
      }

      const geom = new THREE.ShapeGeometry(shape, 16);

      // Distort geometry vertices along Z-axis to curve the petal organically
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        
        // Curving formula: bend backward as Y increases, and cup inwards on X edges
        const z = -0.22 * (y * y) + 0.15 * (x * x);
        pos.setZ(i, z);
      }

      geom.computeVertexNormals();
      // Center the geometry so rotation anchor is in the middle of the petal
      geom.center();
      return geom;
    };

    const geometries = [
      createPetalGeometry(0),
      createPetalGeometry(1),
      createPetalGeometry(2)
    ];

    // Colors and Materials configurations
    const materials = [
      // 1. Soft Rose Red
      new THREE.MeshStandardMaterial({
        color: 0xe04a5e,
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.DoubleSide
      }),
      // 2. Shiny Chrome/Silver (Luxury Tech Accent)
      new THREE.MeshStandardMaterial({
        color: 0xdedede,
        roughness: 0.15,
        metalness: 0.95,
        side: THREE.DoubleSide
      }),
      // 3. Polished Brass/Gold (Luxury Tech Accent)
      new THREE.MeshStandardMaterial({
        color: 0xe6bd65,
        roughness: 0.2,
        metalness: 0.9,
        side: THREE.DoubleSide
      }),
      // 4. Delicate Blossom Pink
      new THREE.MeshStandardMaterial({
        color: 0xfbcfe8,
        roughness: 0.7,
        metalness: 0.0,
        side: THREE.DoubleSide
      }),
      // 5. Warm Butter Yellow
      new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.6,
        metalness: 0.1,
        side: THREE.DoubleSide
      }),
      // 6. Deep Crimson
      new THREE.MeshStandardMaterial({
        color: 0x991b1b,
        roughness: 0.7,
        metalness: 0.05,
        side: THREE.DoubleSide
      }),
      // 7. Soft Sage Leaf (Green)
      new THREE.MeshStandardMaterial({
        color: 0xa7c0a6,
        roughness: 0.5,
        metalness: 0.0,
        side: THREE.DoubleSide
      })
    ];

    // Spawn settings
    const count = 75;
    const petals: PetalData[] = [];

    for (let i = 0; i < count; i++) {
      const geom = geometries[Math.floor(Math.random() * geometries.length)];
      const mat = materials[Math.floor(Math.random() * materials.length)];
      
      const mesh = new THREE.Mesh(geom, mat);

      // Random position spanning viewport boundaries
      // Camera is at z=12, petals will float between z=-2 and z=5
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 7 + 1.5;

      const scale = Math.random() * 0.45 + 0.25;
      mesh.scale.set(scale, scale, scale);

      // Initial rotations
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      scene.add(mesh);

      // Motion velocities
      const baseVrx = (Math.random() - 0.5) * 0.012;
      const baseVry = (Math.random() - 0.5) * 0.015;
      const baseVrz = (Math.random() - 0.5) * 0.012;

      petals.push({
        mesh,
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.008,
        vy: -(Math.random() * 0.018 + 0.006), // Falling speed downwards
        vz: (Math.random() - 0.5) * 0.005,
        rx: mesh.rotation.x,
        ry: mesh.rotation.y,
        rz: mesh.rotation.z,
        vrx: baseVrx,
        vry: baseVry,
        vrz: baseVrz,
        baseVrx,
        baseVry,
        baseVrz,
        swaySpeed: Math.random() * 1.5 + 0.5,
        swayAmount: Math.random() * 0.012 + 0.004,
        phase: Math.random() * Math.PI * 2,
        scale
      });
    }

    // Capture mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates: -1 to 1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Capture scroll to disperse/speed up petals
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const time = clock.getElapsedTime();
      const scrollY = scrollRef.current;
      const scrollFactor = Math.min(scrollY / window.innerHeight, 1);

      // Project mouse into 3D coords roughly at z = 2
      // z is 12, so z_dist is 10
      const targetMouseX = mouseRef.current.x * 7.5;
      const targetMouseY = mouseRef.current.y * 5.5;

      petals.forEach((p) => {
        // 1. Position update: Fall downwards.
        // As user scrolls, gravity increases, blowing petals faster
        const fallSpeedMultiplier = 1.0 + scrollFactor * 3.5;
        p.y += p.vy * fallSpeedMultiplier;

        // 2. Horizontal sway (wind simulation)
        const windX = Math.sin(time * p.swaySpeed + p.phase) * p.swayAmount;
        p.x += p.vx + windX;
        p.z += p.vz;

        // 3. Mouse Interaction (Attraction/Repulsion physics)
        // Distance between petal and projected mouse cursor
        const dx = targetMouseX - p.x;
        const dy = targetMouseY - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 9.0) { // Hover radius of ~3 units
          const dist = Math.sqrt(distSq);
          const force = (3.0 - dist) / 3.0; // Stronger force closer to mouse

          // Push petals away from cursor
          p.x -= (dx / dist) * force * 0.08;
          p.y -= (dy / dist) * force * 0.08;

          // Increase spin/flutter rate under mouse influence
          p.vrx += (Math.random() * 0.04 - 0.02) * force;
          p.vry += (Math.random() * 0.05 - 0.025) * force;
          p.vrz += (Math.random() * 0.04 - 0.02) * force;
        } else {
          // Decay spin speed back to base rotational speed
          p.vrx += (p.baseVrx - p.vrx) * 0.05;
          p.vry += (p.baseVry - p.vry) * 0.05;
          p.vrz += (p.baseVrz - p.vrz) * 0.05;
        }

        // Apply rotations
        p.rx += p.vrx;
        p.ry += p.vry;
        p.rz += p.vrz;

        p.mesh.position.set(p.x, p.y, p.z);
        p.mesh.rotation.set(p.rx, p.ry, p.rz);

        // 4. Edge wrapping boundary check
        // If petal falls below screen bottom, wrap it to the top
        if (p.y < -9.5) {
          p.y = 9.5;
          p.x = (Math.random() - 0.5) * 18;
          p.z = (Math.random() - 0.5) * 7 + 1.5;
          p.vrx = p.baseVrx;
          p.vry = p.baseVry;
          p.vrz = p.baseVrz;
        }
        // Wrapping horizontal edges
        if (p.x < -11) p.x = 11;
        if (p.x > 11) p.x = -11;
      });

      // Render scene
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up WebGL resources
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'auto'
        }}
      />
    </div>
  );
}
