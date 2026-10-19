import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Terminal, RefreshCw, Activity, Zap, Maximize2, CheckCircle2 } from 'lucide-react';

interface CyberMatrixCanvasProps {
  onExploreClick?: () => void;
}

export const CyberMatrixCanvas: React.FC<CyberMatrixCanvasProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // View mode: '3d-core' or 'terminal'
  const [activeMode, setActiveMode] = useState<'core' | 'terminal'>('core');
  const [canvasSupported, setCanvasSupported] = useState(true);
  const [fps, setFps] = useState(120);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeNode, setActiveNode] = useState<string>('0x7F4A');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] MONIX Cyber-Engine v4.19.2 initialized',
    '[CORE] Neural Polyhedral Matrix loaded: 60 nodes, 120 edges',
    '[SEC] Zero-Trust Perimeter Check: 100% PASSED (0 CVEs)',
    '[NET] TLS 1.3 / HTTP/3 QUIC Edge Gateway active at 285+ PoPs',
    '[ACCEL] Hardware GPU WebGL rasterizer locked at 120 FPS target',
    '[STATUS] Ready for enterprise mission-critical workloads.'
  ]);

  // Terminal streaming simulation
  useEffect(() => {
    if (activeMode !== 'terminal') return;
    const interval = setInterval(() => {
      const extraLogs = [
        `[HEALTH] Real-time neural sync: ${(99.98 + Math.random() * 0.019).toFixed(3)}% integrity`,
        `[AUDIT] Cryptographic token rotation: SHA-384 / Ed25519 validated`,
        `[BENCH] Latency to closest edge: ${(2.1 + Math.random() * 1.5).toFixed(1)}ms`,
        `[DEFENSE] DDoS mitigation shield active: 0 unauthorized packets drop`,
        `[MEM] Zero-leak buffer allocation: 14.2 MB / VRAM pool OK`
      ];
      const randomLog = extraLogs[Math.floor(Math.random() * extraLogs.length)];
      setTerminalLogs(prev => [...prev.slice(-8), `${new Date().toLocaleTimeString()} ${randomLog}`]);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeMode]);

  // 3D Canvas Engine Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasSupported(false);
      setActiveMode('terminal');
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 540);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 540);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Math & Polyhedral Geometry Generation
    // Golden ratio for icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1,  phi, 0],
      [ 1,  phi, 0],
      [-1, -phi, 0],
      [ 1, -phi, 0],
      [0, -1,  phi],
      [0,  1,  phi],
      [0, -1, -phi],
      [0,  1, -phi],
      [ phi, 0, -1],
      [ phi, 0,  1],
      [-phi, 0, -1],
      [-phi, 0,  1],
    ];

    // Normalize and scale vertices to sphere radius
    const radius = Math.min(width, height) * 0.28;
    const vertices = rawVertices.map(v => {
      const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [
        (v[0] / len) * radius,
        (v[1] / len) * radius,
        (v[2] / len) * radius,
      ] as [number, number, number];
    });

    // Edges between icosahedron vertices
    const edges: [number, number][] = [];
    const edgeDist = (radius * 2) / Math.sqrt(phi * Math.sqrt(5));
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - edgeDist) < radius * 0.45) {
          edges.push([i, j]);
        }
      }
    }

    // Midpoint nodes on edges to create a truncated neural polyhedral density
    const subNodes: [number, number, number][] = [];
    edges.forEach(([i, j]) => {
      const mx = (vertices[i][0] + vertices[j][0]) * 0.52;
      const my = (vertices[i][1] + vertices[j][1]) * 0.52;
      const mz = (vertices[i][2] + vertices[j][2]) * 0.52;
      subNodes.push([mx, my, mz]);
    });

    // Neural Particle Cloud orbiting in 3D
    const particleCount = 110;
    const particles: {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      orbitRadius: number;
      theta: number;
      phi: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = radius * (1.15 + Math.random() * 0.65);
      const theta = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      particles.push({
        x: r * Math.sin(p) * Math.cos(theta),
        y: r * Math.sin(p) * Math.sin(theta),
        z: r * Math.cos(p),
        size: Math.random() * 2.2 + 0.8,
        color: i % 3 === 0 ? '#00F2FE' : i % 3 === 1 ? '#6366F1' : '#F8FAFC',
        speed: (Math.random() - 0.5) * 0.015,
        orbitRadius: r,
        theta,
        phi: p
      });
    }

    // Rotation angles and interactive physics
    let rotX = 0.4;
    let rotY = 0.5;
    let targetRotX = 0.4;
    let targetRotY = 0.5;
    let autoSpeedX = 0.0035;
    let autoSpeedY = 0.0065;

    // Track frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsUpdateTime = lastTime;

    // Projection constants
    const focalLength = 650;

    // 3D point transformation helper
    const project = (x: number, y: number, z: number, rX: number, rY: number) => {
      // Rotation around Y
      const cosY = Math.cos(rY);
      const sinY = Math.sin(rY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotation around X
      const cosX = Math.cos(rX);
      const sinX = Math.sin(rX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective projection
      const distance = focalLength + z2;
      const scale = distance > 10 ? focalLength / distance : 0.001;
      const projX = width / 2 + x1 * scale;
      const projY = height / 2 + y2 * scale;

      return { x: projX, y: projY, z: z2, scale };
    };

    // Render loop
    const render = (time: number) => {
      frameCount++;
      if (time - fpsUpdateTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsUpdateTime)));
        frameCount = 0;
        fpsUpdateTime = time;
      }
      lastTime = time;

      // Apply target mouse tilt physics with damping lerp
      rotX += (targetRotX - rotX) * 0.06 + autoSpeedX;
      rotY += (targetRotY - rotY) * 0.06 + autoSpeedY;

      ctx.clearRect(0, 0, width, height);

      // Cyber Matrix Background Glow behind the core
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, radius * 0.2,
        width / 2, height / 2, radius * 1.6
      );
      bgGrad.addColorStop(0, 'rgba(0, 242, 254, 0.12)');
      bgGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
      bgGrad.addColorStop(1, 'rgba(7, 9, 14, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Outer Matrix Concentric Gimbal Rings
      const ringCount = 3;
      for (let r = 0; r < ringCount; r++) {
        const ringRadius = radius * (1.28 + r * 0.16);
        const ringTiltX = rotX * (0.8 - r * 0.2) + (r * Math.PI) / 3;
        const ringTiltY = rotY * (0.9 + r * 0.15) + (r * Math.PI) / 4;
        
        ctx.save();
        ctx.beginPath();
        const segments = 64;
        let first = true;
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const rx = ringRadius * Math.cos(angle);
          const rz = ringRadius * Math.sin(angle);
          const p = project(rx, 0, rz, ringTiltX, ringTiltY);
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = r === 0 ? 'rgba(0, 242, 254, 0.28)' : r === 1 ? 'rgba(99, 102, 241, 0.24)' : 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth = r === 0 ? 1.5 : 1;
        ctx.setLineDash(r === 1 ? [6, 10] : r === 2 ? [3, 14] : []);
        ctx.stroke();

        // Little cyber tick satellite on the primary ring
        const satAngle = time * 0.0012 * (r + 1);
        const satX = ringRadius * Math.cos(satAngle);
        const satZ = ringRadius * Math.sin(satAngle);
        const satP = project(satX, 0, satZ, ringTiltX, ringTiltY);
        ctx.beginPath();
        ctx.arc(satP.x, satP.y, 2.5 + r, 0, Math.PI * 2);
        ctx.fillStyle = r === 0 ? '#00F2FE' : '#818CF8';
        ctx.shadowColor = '#00F2FE';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // Draw Edges of 3D Encrypted Core
      const projectedVertices = vertices.map(v => project(v[0], v[1], v[2], rotX, rotY));
      const projectedSubNodes = subNodes.map(v => project(v[0], v[1], v[2], rotX, rotY));

      // Sort edges by average depth Z for accurate depth rendering
      const sortedEdges = edges.map(([i, j]) => {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[j];
        const avgZ = (p1.z + p2.z) / 2;
        return { i, j, p1, p2, avgZ };
      }).sort((a, b) => a.avgZ - b.avgZ);

      sortedEdges.forEach(({ p1, p2, avgZ }) => {
        const depthAlpha = Math.max(0.12, Math.min(0.9, (avgZ + radius) / (radius * 2)));
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(0, 242, 254, ${depthAlpha * 0.85})`);
        grad.addColorStop(1, `rgba(99, 102, 241, ${depthAlpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2 * p1.scale;
        ctx.stroke();
      });

      // Draw Sub-Nodes along edges with pulsing signal
      projectedSubNodes.forEach((node, idx) => {
        const pulse = Math.sin(time * 0.004 + idx) * 0.5 + 0.5;
        const nodeAlpha = Math.max(0.1, (node.z + radius) / (radius * 2));
        ctx.beginPath();
        ctx.arc(node.x, node.y, (1.8 + pulse * 1.5) * node.scale, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? `rgba(0, 242, 254, ${nodeAlpha})` : `rgba(129, 140, 248, ${nodeAlpha})`;
        ctx.fill();
      });

      // Draw Primary Vertices with Glowing Halos and Encrypted Hex Labels
      projectedVertices.forEach((v, idx) => {
        const depthAlpha = Math.max(0.25, Math.min(1, (v.z + radius) / (radius * 2)));
        const nodeSize = (4.5 + Math.sin(time * 0.003 + idx) * 1.2) * v.scale;

        // Outer glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(v.x, v.y, nodeSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${depthAlpha * 0.25})`;
        ctx.shadowColor = '#00F2FE';
        ctx.shadowBlur = 14 * depthAlpha;
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(v.x, v.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = depthAlpha > 0.6 ? '#FFFFFF' : '#00F2FE';
        ctx.fill();

        // Draw micro cyber hex tag on frontmost vertices
        if (v.z > radius * 0.15 && depthAlpha > 0.65) {
          ctx.fillStyle = 'rgba(0, 242, 254, 0.85)';
          ctx.font = '9px monospace';
          ctx.fillText(`0x${(idx * 7 + 16).toString(16).toUpperCase()}`, v.x + 8, v.y - 6);
        }
        ctx.restore();
      });

      // Update and Draw Floating 3D Particle Cloud
      particles.forEach((p, idx) => {
        p.theta += p.speed;
        const px = p.orbitRadius * Math.sin(p.phi) * Math.cos(p.theta);
        const py = p.orbitRadius * Math.sin(p.phi) * Math.sin(p.theta);
        const pz = p.orbitRadius * Math.cos(p.phi);

        const proj = project(px, py, pz, rotX, rotY);
        const alpha = Math.max(0.15, Math.min(0.85, (proj.z + p.orbitRadius) / (p.orbitRadius * 2)));

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Connect nearest particles with faint quantum filaments
        if (idx % 8 === 0 && particles[idx + 1]) {
          const next = project(
            particles[idx + 1].orbitRadius * Math.sin(particles[idx + 1].phi) * Math.cos(particles[idx + 1].theta),
            particles[idx + 1].orbitRadius * Math.sin(particles[idx + 1].phi) * Math.sin(particles[idx + 1].theta),
            particles[idx + 1].orbitRadius * Math.cos(particles[idx + 1].phi),
            rotX, rotY
          );
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      // Inner Quantum Holographic Core (Pulsing Center)
      const corePulse = Math.sin(time * 0.005) * 6 + radius * 0.35;
      const coreGrad = ctx.createRadialGradient(
        width / 2, height / 2, 2,
        width / 2, height / 2, corePulse
      );
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      coreGrad.addColorStop(0.3, 'rgba(0, 242, 254, 0.7)');
      coreGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.35)');
      coreGrad.addColorStop(1, 'rgba(7, 9, 14, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, corePulse, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Mouse tilt & drag coordinates handler
    const container = containerRef.current;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (!container) return;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((clientY - rect.top) / rect.height) * 2 - 1;

      setMousePos({
        x: Math.round(clientX - rect.left),
        y: Math.round(clientY - rect.top),
        normalizedX: Number(normX.toFixed(2)),
        normalizedY: Number(normY.toFixed(2))
      });

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else {
        // Mild tilt on hover
        targetRotX = 0.4 + normY * 0.45;
        targetRotY = 0.5 + normX * 0.65;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    if (container) {
      container.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      container.addEventListener('touchstart', handlePointerDown, { passive: true });
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousedown', handlePointerDown);
        container.removeEventListener('touchstart', handlePointerDown);
      }
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[560px] aspect-square mx-auto flex items-center justify-center select-none"
    >
      {/* Ambient Cyber Neon Backplate & Radial Ring Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#00F2FE]/10 via-[#6366F1]/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#00F2FE]/20 via-[#6366F1]/20 to-[#00F2FE]/20 opacity-40 blur-sm pointer-events-none" />

      {/* Main Glass Centerpiece Container */}
      <div className="relative w-full h-full rounded-[1.75rem] bg-[#07090E]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col">
        
        {/* Top Cyber Telemetry Bar */}
        <div className="h-11 px-4 border-b border-white/10 bg-[#0B0F19]/90 flex items-center justify-between text-[11px] font-mono tracking-wider z-20">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold tracking-widest uppercase">
              NEURAL CORE ONLINE
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">AES-256-GCM</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveMode('core')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-semibold transition-all ${
                activeMode === 'core'
                  ? 'bg-gradient-to-r from-[#00F2FE]/20 to-[#6366F1]/20 text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D MATRIX
            </button>
            <button
              onClick={() => setActiveMode('terminal')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-semibold transition-all flex items-center space-x-1 ${
                activeMode === 'terminal'
                  ? 'bg-gradient-to-r from-[#00F2FE]/20 to-[#6366F1]/20 text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>TERMINAL</span>
            </button>
          </div>
        </div>

        {/* Center Area: 3D Canvas OR Glassmorphic Terminal */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {activeMode === 'core' && canvasSupported ? (
              <motion.div
                key="canvas-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative cursor-grab active:cursor-grabbing"
              >
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full block" 
                />

                {/* Floating Micro-Telemetry HUD Chips */}
                <div className="absolute top-3 left-4 pointer-events-none font-mono text-[10px] text-slate-400 flex flex-col space-y-0.5 bg-[#07090E]/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5">
                  <div className="text-[#00F2FE] font-bold">SPHERICAL LATTICE</div>
                  <div className="text-white/60">POLYHEDRON: ICOSA-60</div>
                  <div className="text-emerald-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 inline" />
                    <span>{fps} FPS HARDWARE SYNC</span>
                  </div>
                </div>

                <div className="absolute top-3 right-4 pointer-events-none font-mono text-[10px] text-slate-400 text-right bg-[#07090E]/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5">
                  <div className="text-indigo-400 font-bold">CURSOR VECTOR</div>
                  <div className="text-white/70">X: {mousePos.normalizedX} | Y: {mousePos.normalizedY}</div>
                  <div className="text-slate-400">TILT-PHYSICS: ACTIVE</div>
                </div>

                {/* Center Core Hint Pill */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none font-mono text-[10px] text-slate-400 tracking-wider bg-[#0B0F19]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse"></span>
                  <span>DRAG TO TILT 3D MATRIX CORE</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="terminal-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full p-4 sm:p-5 font-mono text-xs flex flex-col justify-between bg-[#07090E]/95 overflow-hidden"
              >
                <div>
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-slate-400 text-[11px] ml-2">monix-runtime@edge:~# zero-trust-verify</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      SECURE
                    </span>
                  </div>

                  {/* Terminal Logs */}
                  <div className="space-y-1.5 text-slate-300">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed flex items-start space-x-2">
                        <span className="text-[#00F2FE] select-none">›</span>
                        <span className={log.includes('PASSED') ? 'text-emerald-400 font-semibold' : log.includes('INIT') ? 'text-[#00F2FE]' : ''}>
                          {log}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2 text-emerald-400 pt-1">
                      <span className="text-[#00F2FE]">›</span>
                      <span>Execution daemon standing by for new requests...</span>
                      <span className="inline-block w-2 h-4 bg-[#00F2FE] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Benchmark Strip Inside Terminal */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-slate-400">FRAME LATENCY</div>
                    <div className="text-[#00F2FE] font-bold text-xs mt-0.5">8.3 ms (120 FPS)</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-slate-400">ZERO-TRUST</div>
                    <div className="text-emerald-400 font-bold text-xs mt-0.5">100% VERIFIED</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-slate-400">EDGE AVAILABILITY</div>
                    <div className="text-indigo-400 font-bold text-xs mt-0.5">99.999% SLA</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Status Bar */}
        <div className="h-10 px-4 border-t border-white/10 bg-[#0B0F19]/90 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span className="text-white/80">CORE: 120 FPS NATIVE ENGINE</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SOC-2 TYPE II READY</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
