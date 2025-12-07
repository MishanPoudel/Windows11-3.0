import React, { useState, useEffect, useRef, useCallback } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";
import { 
  FaHammer, 
  FaBolt, 
  FaBurn, 
  FaBomb,
  FaBug
} from "react-icons/fa";
import { GiAxeSword, GiMachineGun } from "react-icons/gi";

const DesktopDestroyer = ({ 
  isAppOpen, 
  toggleDesktopDestroyer, 
  bounds, 
  isActive = false, 
  bringToFront, 
  isMinimized = false,
  minimizeWindow 
}) => {
  const windowRef = useRef(null);
  const canvasRef = useRef(null);
  const damageCanvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const cursorImageRef = useRef(null);
  const audioRef = useRef(null);
  const lastSoundTimeRef = useRef(0);
  const [tool, setTool] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastToolUseTimeRef = useRef(0);
  const particlesRef = useRef([]);
  const damagesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const termitesRef = useRef([]);

  // Sound effects
  const playSoundEffect = useCallback((toolName, isMouseDown = false) => {
    // Continuous tools: fire, chainsaw, lightning, paintgun, eraser
    const continuousTools = ['fire', 'chainsaw', 'lightning', 'paintgun', 'eraser'];
    
    if (continuousTools.includes(toolName)) {
      // For continuous tools, loop audio while mouse is down
      if (isMouseDown) {
        if (!audioRef.current || audioRef.current.paused) {
          audioRef.current = new Audio(`${process.env.PUBLIC_URL}/audio/destroyer/${toolName}.mp3`);
          audioRef.current.volume = 0.3;
          audioRef.current.loop = true;
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
      } else {
        // Stop audio when mouse is released
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        }
      }
    } else {
      // For tap tools (hammer, termites, gun), play once with debounce
      const now = Date.now();
      if (now - lastSoundTimeRef.current < 100) return; // Prevent multiple plays within 100ms
      lastSoundTimeRef.current = now;
      
      const audio = new Audio(`${process.env.PUBLIC_URL}/audio/destroyer/${toolName}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  }, []);

  useEffect(() => {
    if (isAppOpen && canvasRef.current && damageCanvasRef.current && particleCanvasRef.current) {
      const canvas = canvasRef.current;
      const damageCanvas = damageCanvasRef.current;
      const particleCanvas = particleCanvasRef.current;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      damageCanvas.width = window.innerWidth;
      damageCanvas.height = window.innerHeight;
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
      
      // Start particle animation loop
      let lastTime = performance.now();
      const animate = () => {
        const currentTime = performance.now();
        const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;
        
        const particleCtx = particleCanvas.getContext('2d');
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        // Update and draw particles
        particlesRef.current = particlesRef.current.filter(particle => {
          particle.update(deltaTime);
          if (particle.life > 0) {
            particle.draw(particleCtx);
            return true;
          }
          return false;
        });
        
        // Update and draw termites
        termitesRef.current.forEach(termite => {
          const shouldEat = termite.update(deltaTime);
          if (shouldEat) {
            // Create eaten hole damage
            damagesRef.current.push({
              type: 'eaten',
              x: termite.x,
              y: termite.y,
              size: 3 + Math.random() * 3,
              timestamp: Date.now()
            });
            renderDamages();
          }
          termite.draw(particleCtx);
        });
        
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        // Stop any playing audio
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppOpen]);

  // Stop audio when tool changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, [tool]);

  // Particle class
  const createParticle = useCallback((x, y, vx, vy, options = {}) => {
    return {
      x, y, vx, vy,
      life: options.life || 1,
      maxLife: options.life || 1,
      size: options.size || 5,
      color: options.color || '#fff',
      rotation: options.rotation || 0,
      rotationSpeed: options.rotationSpeed || 0,
      gravity: options.gravity !== undefined ? options.gravity : 0.3,
      friction: options.friction || 0.99,
      alpha: options.alpha || 1,
      fadeRate: options.fadeRate || 0.02,
      shape: options.shape || 'circle',
      bounce: options.bounce || 0,
      ringThickness: options.ringThickness || 2,
      expandRate: options.expandRate || 0,
      
      update(deltaTime) {
        const dt60 = deltaTime * 60;
        
        this.vy += this.gravity * dt60;
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.x += this.vx * dt60;
        this.y += this.vy * dt60;
        
        this.rotation += this.rotationSpeed * dt60;
        this.life -= this.fadeRate;
        this.alpha = this.life / this.maxLife;
        
        // Expand ring effect
        if (this.expandRate > 0) {
          this.size += this.expandRate * dt60;
        }
        
        // Bounce off bottom
        if (this.bounce > 0 && this.y > window.innerHeight - 80) {
          this.y = window.innerHeight - 50;
          this.vy *= -this.bounce;
          this.vx *= 0.8;
        }
      },
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        switch (this.shape) {
          case 'circle':
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'square':
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 'spark':
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(this.size, 0);
            ctx.stroke();
            ctx.shadowBlur = 0;
            break;
          case 'ring':
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.ringThickness;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.stroke();
            break;
          default:
            // Default to circle if shape is unknown
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        
        ctx.restore();
      }
    };
  }, []);
  
  // Particle creators
  const createSawdust = useCallback((x, y, count) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      // Varied wood tones
      const brown = Math.floor(139 + Math.random() * 50);
      const tan = Math.floor(69 + Math.random() * 40);
      
      particlesRef.current.push(createParticle(x, y, vx, vy, {
        size: Math.random() * 5 + 2,
        color: `rgb(${brown}, ${tan}, ${Math.floor(Math.random() * 30 + 19)})`,
        shape: 'square',
        life: Math.random() * 1 + 0.6,
        gravity: 0.25,
        fadeRate: 0.015,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        bounce: 0.1
      }));
    }
  }, [createParticle]);
  
  const createFireParticles = useCallback((x, y, count) => {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9; // Upward with spread
      const speed = Math.random() * 5 + 2.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      // Enhanced flame colors with better gradation
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.25) {
        // Deep red core
        color = `rgb(${255}, ${Math.floor(80 + Math.random() * 40)}, ${Math.floor(Math.random() * 20)})`;
      } else if (colorChoice < 0.5) {
        // Orange flames
        color = `rgb(${255}, ${Math.floor(140 + Math.random() * 60)}, ${Math.floor(Math.random() * 30)})`;
      } else if (colorChoice < 0.75) {
        // Yellow-orange
        color = `rgb(${255}, ${Math.floor(200 + Math.random() * 45)}, ${Math.floor(Math.random() * 60)})`;
      } else {
        // Bright yellow tips
        color = `rgb(${255}, ${Math.floor(230 + Math.random() * 25)}, ${Math.floor(100 + Math.random() * 100)})`;
      }
      
      particlesRef.current.push(createParticle(x, y, vx, vy, {
        size: Math.random() * 14 + 5,
        color: color,
        shape: 'circle',
        life: Math.random() * 0.7 + 0.4,
        gravity: -0.35, // Stronger rise
        fadeRate: 0.025,
        friction: 0.97
      }));
    }
  }, [createParticle]);
  
  const createPaintSplatter = useCallback((x, y, color) => {
    // Create paint spray effect - shoots out and falls
    for (let i = 0; i < 20; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 8 + 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      particlesRef.current.push(createParticle(x, y, vx, vy, {
        size: Math.random() * 5 + 2,
        color: color,
        shape: 'circle',
        life: Math.random() * 1.5 + 1,
        gravity: 0.4,
        fadeRate: 0.008,
        bounce: 0.3,
        friction: 0.98
      }));
    }
    
    // Add paint splat to damage layer
    damagesRef.current.push({
      type: 'paint',
      x: x,
      y: y,
      size: 25 + Math.random() * 20,
      color: color,
      drips: Array.from({ length: 6 }, () => ({
        x: (Math.random() - 0.5) * 50,
        length: Math.random() * 20 + 10
      })),
      splatters: Array.from({ length: 12 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 20 + 5,
        size: Math.random() * 4 + 2
      })),
      timestamp: Date.now()
    });
  }, [createParticle]);
  
  
  
  const createBulletImpact = useCallback((x, y) => {
    // Muzzle flash particles
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      particlesRef.current.push(createParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, {
        size: Math.random() * 3 + 1,
        color: '#FFAA00',
        shape: 'circle',
        life: 0.1,
        gravity: 0,
        fadeRate: 0.05,
        bounce: 0
      }));
    }
    
    // Shell casing particle
    particlesRef.current.push(createParticle(x - 20, y, -3, -2, {
      size: 4,
      color: '#FFD700',
      shape: 'square',
      life: 1,
      gravity: 0.5,
      fadeRate: 0.01,
      bounce: 0.4,
      rotationSpeed: 0.3
    }));
    
    // Smoke particles
    for (let i = 0; i < 5; i++) {
      particlesRef.current.push(createParticle(x, y, (Math.random() - 0.5) * 2, -Math.random() * 2, {
        size: Math.random() * 8 + 4,
        color: `rgba(100, 100, 100, ${0.3 + Math.random() * 0.2})`,
        shape: 'circle',
        life: 0.8,
        gravity: -0.05,
        fadeRate: 0.015,
        bounce: 0
      }));
    }
    
    // Add bullet hole to damage layer
    damagesRef.current.push({
      type: 'bullethole',
      x: x,
      y: y,
      size: 6,
      cracks: Array.from({ length: 8 }, (_, i) => ({
        angle: (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.3,
        length: 8 + Math.random() * 10,
        offset: (Math.random() - 0.5) * 3
      })),
      secondaryCracks: Array.from({ length: 12 }, () => ({
        angle: Math.random() * Math.PI * 2,
        length: 3 + Math.random() * 5
      })),
      residue: Array.from({ length: 6 }, (_, i) => ({
        angle: (Math.PI * 2 * i) / 6,
        dist: 6 + 5 + Math.random() * 8,
        size: 3 + Math.random() * 3
      })),
      debris: Array.from({ length: 4 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: 6 + Math.random() * 6,
        width: 1 + Math.random(),
        height: 1 + Math.random()
      })),
      timestamp: Date.now()
    });
  }, [createParticle]);
  
  // Create termite entity
  const createTermite = useCallback((x, y) => {
    return {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 4,
      color: `rgb(${100 + Math.random() * 40}, ${60 + Math.random() * 20}, ${20 + Math.random() * 10})`,
      eatTimer: 0,
      eatInterval: 0.3 + Math.random() * 0.5, // Time between eating
      
      update(deltaTime) {
        // Random walk movement
        this.vx += (Math.random() - 0.5) * 0.3;
        this.vy += (Math.random() - 0.5) * 0.3;
        
        // Speed limit
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 3) {
          this.vx = (this.vx / speed) * 3;
          this.vy = (this.vy / speed) * 3;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around screen edges
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;
        
        // Eating behavior
        this.eatTimer += deltaTime;
        if (this.eatTimer >= this.eatInterval) {
          this.eatTimer = 0;
          return true; // Signal to create damage
        }
        return false;
      },
      
      draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw antennae
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - 2, this.y - 3);
        ctx.lineTo(this.x - 4, this.y - 6);
        ctx.moveTo(this.x + 2, this.y - 3);
        ctx.lineTo(this.x + 4, this.y - 6);
        ctx.stroke();
        
        ctx.restore();
      }
    };
  }, []);
  
  // Damage rendering
  const renderDamages = useCallback(() => {
    const damageCanvas = damageCanvasRef.current;
    if (!damageCanvas) return;
    
    const ctx = damageCanvas.getContext('2d');
    ctx.clearRect(0, 0, damageCanvas.width, damageCanvas.height);
    
    // Sort damages by timestamp to render older ones first (newer on top)
    const sortedDamages = [...damagesRef.current].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    
    sortedDamages.forEach(damage => {
      switch (damage.type) {
        case 'sawcut':
          ctx.save();
          ctx.translate(damage.x, damage.y);
          ctx.rotate(damage.angle);
          
          ctx.strokeStyle = '#222';
          ctx.lineWidth = damage.width || 10;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-damage.length / 2, 0);
          ctx.lineTo(damage.length / 2, 0);
          ctx.stroke();
          
          ctx.strokeStyle = '#111';
          ctx.lineWidth = (damage.width || 10) * 0.6;
          ctx.beginPath();
          ctx.moveTo(-damage.length / 2, 0);
          ctx.lineTo(damage.length / 2, 0);
          ctx.stroke();
          
          ctx.restore();
          break;
          
        case 'scorch':
          const scorchGradient = ctx.createRadialGradient(
            damage.x, damage.y, 0,
            damage.x, damage.y, damage.size
          );
          scorchGradient.addColorStop(0, `rgba(10, 10, 10, ${damage.intensity})`);
          scorchGradient.addColorStop(0.3, `rgba(30, 25, 20, ${damage.intensity * 0.7})`);
          scorchGradient.addColorStop(0.6, `rgba(50, 40, 30, ${damage.intensity * 0.4})`);
          scorchGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = scorchGradient;
          ctx.beginPath();
          ctx.arc(damage.x, damage.y, damage.size, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'eaten':
          // Termite eaten holes
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.beginPath();
          ctx.arc(damage.x, damage.y, damage.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Eaten edge
          ctx.strokeStyle = 'rgba(139, 69, 19, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
          break;
          
        case 'burn':
          // Black charred burn mark
          const burnGradient = ctx.createRadialGradient(
            damage.x, damage.y, 0,
            damage.x, damage.y, damage.size
          );
          burnGradient.addColorStop(0, `rgba(0, 0, 0, ${damage.intensity})`);
          burnGradient.addColorStop(0.3, `rgba(40, 25, 15, ${damage.intensity * 0.8})`);
          burnGradient.addColorStop(0.6, `rgba(80, 50, 30, ${damage.intensity * 0.5})`);
          burnGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = burnGradient;
          ctx.beginPath();
          ctx.arc(damage.x, damage.y, damage.size, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'paint':
          // Paint splatter with drips and splatter dots
          ctx.fillStyle = damage.color;
          ctx.beginPath();
          ctx.arc(damage.x, damage.y, damage.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Paint drips
          damage.drips.forEach(drip => {
            ctx.fillRect(damage.x + drip.x, damage.y + damage.size, 2, drip.length);
          });
          
          // Splatter dots
          damage.splatters.forEach(splat => {
            ctx.beginPath();
            ctx.arc(
              damage.x + Math.cos(splat.angle) * (damage.size + splat.dist),
              damage.y + Math.sin(splat.angle) * (damage.size + splat.dist),
              splat.size,
              0,
              Math.PI * 2
            );
            ctx.fill();
          });
          break;
          
        case 'bullethole':
          // Bullet hole with impact cracks
          ctx.save();
          
          // Dark impact crater
          const craterGradient = ctx.createRadialGradient(
            damage.x, damage.y, 0,
            damage.x, damage.y, damage.size
          );
          craterGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
          craterGradient.addColorStop(0.6, 'rgba(10, 10, 10, 0.95)');
          craterGradient.addColorStop(1, 'rgba(20, 20, 20, 0.8)');
          ctx.fillStyle = craterGradient;
          ctx.beginPath();
          ctx.arc(damage.x, damage.y, damage.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Impact cracks with varying thickness
          damage.cracks.forEach((crack, i) => {
            ctx.strokeStyle = i % 2 === 0 ? 'rgba(15, 15, 15, 0.9)' : 'rgba(25, 25, 25, 0.7)';
            ctx.lineWidth = i % 2 === 0 ? 2 : 1;
            ctx.beginPath();
            ctx.moveTo(damage.x, damage.y);
            
            // Add jagged effect to cracks
            const midX = damage.x + Math.cos(crack.angle) * crack.length * 0.5;
            const midY = damage.y + Math.sin(crack.angle) * crack.length * 0.5;
            ctx.lineTo(midX + crack.offset, midY + crack.offset);
            
            ctx.lineTo(
              damage.x + Math.cos(crack.angle) * crack.length,
              damage.y + Math.sin(crack.angle) * crack.length
            );
            ctx.stroke();
          });
          
          // Secondary small cracks
          ctx.strokeStyle = 'rgba(30, 30, 30, 0.5)';
          ctx.lineWidth = 0.5;
          damage.secondaryCracks.forEach(crack => {
            ctx.beginPath();
            ctx.moveTo(damage.x, damage.y);
            ctx.lineTo(
              damage.x + Math.cos(crack.angle) * crack.length,
              damage.y + Math.sin(crack.angle) * crack.length
            );
            ctx.stroke();
          });
          
          // Powder residue with irregular pattern
          ctx.fillStyle = 'rgba(35, 35, 35, 0.3)';
          damage.residue.forEach(res => {
            ctx.beginPath();
            ctx.arc(
              damage.x + Math.cos(res.angle) * res.dist,
              damage.y + Math.sin(res.angle) * res.dist,
              res.size,
              0,
              Math.PI * 2
            );
            ctx.fill();
          });
          
          // Metal debris/shrapnel marks
          ctx.fillStyle = 'rgba(40, 40, 40, 0.6)';
          damage.debris.forEach(deb => {
            ctx.fillRect(
              damage.x + Math.cos(deb.angle) * deb.dist,
              damage.y + Math.sin(deb.angle) * deb.dist,
              deb.width,
              deb.height
            );
          });
          
          ctx.restore();
          break;
          
        default:
          // Unknown damage type, skip
          break;
      }
    });
  }, []);

  // Apply effect based on selected tool
  const applyEffect = useCallback((x, y, ctx) => {
    if (!tool) return;
    switch (tool) { 
      case "hammer": {
        // Enhanced glass crack pattern with impact animation
        ctx.save();
        
        // Impact shockwave rings (animated outward)
        const particleCtx = particleCanvasRef.current.getContext('2d');
        for (let ring = 0; ring < 3; ring++) {
          particlesRef.current.push(createParticle(x, y, 0, 0, {
            size: 15 + ring * 10,
            color: 'rgba(255, 255, 255, 0.6)',
            shape: 'ring',
            life: 0.3,
            gravity: 0,
            fadeRate: 0.05,
            friction: 1,
            ringThickness: 2,
            expandRate: 2 + ring * 0.5
          }));
        }
        
        // Create glass shard particles
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 3;
          particlesRef.current.push(createParticle(
            x, y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            {
              size: Math.random() * 4 + 2,
              color: `rgba(${200 + Math.random() * 55}, ${220 + Math.random() * 35}, ${240 + Math.random() * 15}, ${0.7 + Math.random() * 0.3})`,
              shape: 'square',
              life: 0.8 + Math.random() * 0.4,
              gravity: 0.3,
              fadeRate: 0.015,
              friction: 0.96,
              bounce: 0.4,
              rotationSpeed: (Math.random() - 0.5) * 0.3
            }
          ));
        }
        
        // White flash at impact
        particleCtx.save();
        particleCtx.globalAlpha = 0.8;
        particleCtx.shadowBlur = 30;
        particleCtx.shadowColor = '#ffffff';
        particleCtx.fillStyle = '#ffffff';
        particleCtx.beginPath();
        particleCtx.arc(x, y, 18, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
        
        // Main impact crater with gradient
        const impactGradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        impactGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        impactGradient.addColorStop(0.5, 'rgba(200, 200, 200, 0.3)');
        impactGradient.addColorStop(1, 'rgba(150, 150, 150, 0.1)');
        ctx.fillStyle = impactGradient;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced radiating cracks with depth
        const numCracks = 15 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numCracks; i++) {
          const angle = (Math.PI * 2 * i) / numCracks + (Math.random() - 0.5) * 0.3;
          const length = 30 + Math.random() * 50;
          const thickness = i % 3 === 0 ? 2.5 : (i % 2 === 0 ? 1.8 : 1.2);
          
          // Main crack with shadow for depth
          ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
          ctx.lineWidth = thickness;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.beginPath();
          ctx.moveTo(x, y);
          
          let currentX = x;
          let currentY = y;
          const segments = 3 + Math.floor(Math.random() * 2);
          
          for (let j = 0; j < segments; j++) {
            const segLength = length / segments;
            const wobble = (Math.random() - 0.5) * 12;
            const prevX = currentX;
            const prevY = currentY;
            currentX += Math.cos(angle) * segLength + wobble;
            currentY += Math.sin(angle) * segLength + wobble;
            ctx.lineTo(currentX, currentY);
            
            // Add micro-cracks branching off
            if (Math.random() > 0.5 && j < segments - 1) {
              const microAngle = angle + (Math.random() - 0.5) * (Math.PI / 3);
              const microLength = segLength * (0.3 + Math.random() * 0.4);
              ctx.moveTo(prevX, prevY);
              ctx.lineTo(
                prevX + Math.cos(microAngle) * microLength,
                prevY + Math.sin(microAngle) * microLength
              );
              ctx.moveTo(currentX, currentY);
            }
          }
          ctx.stroke();
        }
        
        // Subtle highlight on cracks for glass effect
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        for (let i = 0; i < numCracks; i += 2) {
          const angle = (Math.PI * 2 * i) / numCracks;
          const length = 30 + Math.random() * 50;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(angle) * length,
            y + Math.sin(angle) * length
          );
          ctx.stroke();
        }
        
        ctx.restore();
        break;
      }

      case "chainsaw": {
        // Throttle chainsaw for continuous cutting
        const currentTime = Date.now();
        if (currentTime - lastToolUseTimeRef.current < 10) return;
        lastToolUseTimeRef.current = currentTime;
        
        // Calculate angle from last position for directional cut
        let angle = Math.random() * Math.PI * 2;
        if (lastPosRef.current.x !== null && lastPosRef.current.y !== null) {
          const dx = x - lastPosRef.current.x;
          const dy = y - lastPosRef.current.y;
          if (dx !== 0 || dy !== 0) {
            angle = Math.atan2(dy, dx);
          }
        }
        
        // Add saw cut to damage layer
        damagesRef.current.push({
          type: 'sawcut',
          x: x,
          y: y,
          angle: angle,
          length: 80,
          width: 5,
          timestamp: Date.now()
        });
        
        // Create sawdust particles
        createSawdust(x, y, 12);
        
        // Re-render damage layer
        renderDamages();
        break;
      }

      case "fire": {
        // Create fire particles
        createFireParticles(x, y, 8);
        
        // Add burn mark to damage layer
        damagesRef.current.push({
          type: 'burn',
          x: x,
          y: y,
          size: 20 + Math.random() * 15,
          intensity: 0.6 + Math.random() * 0.3,
          timestamp: Date.now()
        });
        
        // Re-render damage layer
        renderDamages();
        break;
      }

      case "lightning": {
        // Throttle lightning for performance
        const currentTime = Date.now();
        if (currentTime - lastToolUseTimeRef.current < 25) return;
        lastToolUseTimeRef.current = currentTime;
        
        // Draw realistic branching lightning bolts
        const particleCtx = particleCanvasRef.current.getContext('2d');
        
        // Helper function to draw a lightning branch recursively
        const drawLightningBranch = (startX, startY, angle, length, thickness, depth = 0) => {
          if (depth > 4 || length < 8) return;
          
          // Calculate end point with slight randomness
          const wobble = (Math.random() - 0.5) * 0.6;
          const endX = startX + Math.cos(angle + wobble) * length;
          const endY = startY + Math.sin(angle + wobble) * length;
          
          // Draw main bolt with glow
          particleCtx.save();
          particleCtx.shadowBlur = 15;
          particleCtx.shadowColor = '#00e5ff';
          particleCtx.strokeStyle = '#ffffff';
          particleCtx.lineWidth = thickness;
          particleCtx.lineCap = 'round';
          particleCtx.beginPath();
          particleCtx.moveTo(startX, startY);
          particleCtx.lineTo(endX, endY);
          particleCtx.stroke();
          
          // Add outer glow layer
          particleCtx.strokeStyle = '#00d4ff';
          particleCtx.lineWidth = thickness + 2;
          particleCtx.shadowBlur = 25;
          particleCtx.globalAlpha = 0.5;
          particleCtx.beginPath();
          particleCtx.moveTo(startX, startY);
          particleCtx.lineTo(endX, endY);
          particleCtx.stroke();
          
          particleCtx.restore();
          
          // Create spark particles along the bolt
          const sparkCount = Math.floor(length / 15);
          for (let i = 0; i < sparkCount; i++) {
            const t = i / sparkCount;
            const px = startX + (endX - startX) * t;
            const py = startY + (endY - startY) * t;
            const sparkAngle = Math.random() * Math.PI * 2;
            const sparkSpeed = Math.random() * 3 + 1;
            
            particlesRef.current.push(createParticle(
              px, py,
              Math.cos(sparkAngle) * sparkSpeed,
              Math.sin(sparkAngle) * sparkSpeed,
              {
                size: Math.random() * 3 + 1,
                color: Math.random() > 0.5 ? '#ffffff' : '#00e5ff',
                shape: 'spark',
                life: 0.2 + Math.random() * 0.2,
                gravity: 0.05,
                fadeRate: 0.04,
                friction: 0.95
              }
            ));
          }
          
          // Recursive branching with randomness
          const numBranches = depth === 0 ? (2 + Math.floor(Math.random() * 3)) : (Math.random() > 0.4 ? 1 : 2);
          for (let i = 0; i < numBranches; i++) {
            if (Math.random() > 0.3) { // 70% chance of branch
              const branchPoint = 0.3 + Math.random() * 0.5; // Branch partway along
              const branchX = startX + (endX - startX) * branchPoint;
              const branchY = startY + (endY - startY) * branchPoint;
              const branchAngle = angle + (Math.random() - 0.5) * (Math.PI / 2);
              const branchLength = length * (0.5 + Math.random() * 0.4);
              const branchThickness = Math.max(1, thickness - 0.5);
              
              drawLightningBranch(branchX, branchY, branchAngle, branchLength, branchThickness, depth + 1);
            }
          }
          
          // Continue main bolt
          if (depth < 3) {
            drawLightningBranch(endX, endY, angle + (Math.random() - 0.5) * 0.4, length * 0.7, Math.max(1, thickness - 0.5), depth + 1);
          }
        };
        
        // Draw multiple main lightning branches from center
        const mainBranches = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < mainBranches; i++) {
          const angle = (Math.PI * 2 * i) / mainBranches + (Math.random() - 0.5) * 0.8;
          const length = 40 + Math.random() * 50;
          drawLightningBranch(x, y, angle, length, 3, 0);
        }
        
        // Central flash with intense glow
        particleCtx.save();
        particleCtx.shadowBlur = 40;
        particleCtx.shadowColor = '#00e5ff';
        particleCtx.fillStyle = '#ffffff';
        particleCtx.beginPath();
        particleCtx.arc(x, y, 8, 0, Math.PI * 2);
        particleCtx.fill();
        
        // Outer glow ring
        particleCtx.globalAlpha = 0.3;
        particleCtx.shadowBlur = 60;
        particleCtx.fillStyle = '#00d4ff';
        particleCtx.beginPath();
        particleCtx.arc(x, y, 20, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
        
        // Create electric particles radiating outward
        for (let i = 0; i < 25; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 3;
          particlesRef.current.push(createParticle(
            x, y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            {
              size: Math.random() * 4 + 2,
              color: Math.random() > 0.3 ? '#ffffff' : '#00e5ff',
              shape: 'spark',
              life: 0.3 + Math.random() * 0.3,
              gravity: 0.1,
              fadeRate: 0.035,
              friction: 0.94
            }
          ));
        }
        
        // Add electric scorch mark to damage layer
        damagesRef.current.push({
          type: 'scorch',
          x: x,
          y: y,
          size: 25 + Math.random() * 20,
          intensity: 0.85,
          timestamp: Date.now()
        });
        
        // Re-render damage layer
        renderDamages();
        break;
      }

      case "termites": {
        // Spawn a termite that runs around
        termitesRef.current.push(createTermite(x, y));
        break;
      }

      case "eraser": {
        const size = 100;
        const eraserRadius = size / 2;
        
        // Create eraser particles
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 1.5;
          particlesRef.current.push(createParticle(
            x, y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            {
              size: Math.random() * 5 + 2,
              color: 'rgba(255, 255, 255, 0.9)',
              shape: 'square',
              life: 0.6,
              gravity: 0.15,
              fadeRate: 0.02,
              friction: 0.96
            }
          ));
        }
        
        // Remove damages within eraser radius
        const eraserRadiusSq = eraserRadius * eraserRadius;
        damagesRef.current = damagesRef.current.filter(damage => {
          const dx = damage.x - x;
          const dy = damage.y - y;
          return (dx * dx + dy * dy) > eraserRadiusSq;
        });
        
        // Remove termites within eraser radius
        termitesRef.current = termitesRef.current.filter(termite => {
          const dx = termite.x - x;
          const dy = termite.y - y;
          return (dx * dx + dy * dy) > eraserRadiusSq;
        });
        
        // Re-render damage canvas to show erased areas
        renderDamages();
        
        // Erase on base canvas (for hammer cracks)
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.beginPath();
        ctx.arc(x, y, eraserRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw eraser outline indicator on particle canvas
        const particleCtx = particleCanvasRef.current.getContext('2d');
        particleCtx.save();
        particleCtx.strokeStyle = 'rgba(255, 105, 180, 0.7)';
        particleCtx.lineWidth = 3;
        particleCtx.setLineDash([5, 5]);
        particleCtx.beginPath();
        particleCtx.arc(x, y, eraserRadius, 0, Math.PI * 2);
        particleCtx.stroke();
        
        // Inner circle
        particleCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        particleCtx.lineWidth = 2;
        particleCtx.setLineDash([3, 3]);
        particleCtx.beginPath();
        particleCtx.arc(x, y, eraserRadius - 5, 0, Math.PI * 2);
        particleCtx.stroke();
        particleCtx.restore();
        
        break;
      }

      case "paintgun": {
        // Throttle paintgun for continuous painting
        const currentTime = Date.now();
        if (currentTime - lastToolUseTimeRef.current < 20) return;
        lastToolUseTimeRef.current = currentTime;
        
        // Random paint colors
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FF1493'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        createPaintSplatter(x, y, randomColor);
        renderDamages();
        break;
      }

      case "gun": {
        // Single realistic bullet shot
        createBulletImpact(x, y);
        
        // Add yellow shell casings that drop (2/3 chance for random effect)
        if (Math.random() > 0.33) {
          const shellCount = 2 + Math.floor(Math.random() * 3); // 2-4 shells
          for (let i = 0; i < shellCount; i++) {
            const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.6; // Mostly downward
            const speed = Math.random() * 3 + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            particlesRef.current.push(createParticle(
              x - 10 + Math.random() * 5, // Slight offset to the left
              y - 5 + Math.random() * 5,
              vx,
              vy,
              {
                size: Math.random() * 3 + 2,
                color: '#FFD700', // Golden yellow
                shape: 'square',
                life: 1.5 + Math.random() * 0.5,
                gravity: 0.4,
                fadeRate: 0.008,
                bounce: 0.3,
                rotationSpeed: (Math.random() - 0.5) * 0.4
              }
            ));
          }
        }
        
        renderDamages();
        break;
      }

      default:
        break;
    }
  }, [tool, createSawdust, createFireParticles, createPaintSplatter, createBulletImpact, renderDamages, createTermite, createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isAppOpen) return;
    
    const ctx = canvas.getContext("2d");
    
    // Hide default cursor only when a tool is selected
    document.body.style.cursor = tool ? 'none' : 'default';
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (!isMouseDown || !tool) return;
      if (e.target.closest('.destroyer-window')) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Continuous effects for fire, chainsaw, lightning, and paintgun
      if (["fire", "chainsaw", "lightning", "paintgun"].includes(tool)) {
        const dx = x - lastPosRef.current.x;
        const dy = y - lastPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 8) {
          applyEffect(x, y, ctx);
          lastPosRef.current = { x, y };
        }
      }
      
      // Eraser continuous effect
      if (tool === "eraser") {
        applyEffect(x, y, ctx);
      }
    };

    const handleMouseDown = (e) => {
      if (e.target.closest('.destroyer-window') || !tool) return;
      
      setIsMouseDown(true);
      const x = e.clientX;
      const y = e.clientY;
      lastPosRef.current = { x, y };
      applyEffect(x, y, ctx);
      
      // Only play sound if not already playing (prevents double play)
      const continuousTools = ['fire', 'chainsaw', 'lightning', 'paintgun', 'eraser'];
      if (continuousTools.includes(tool)) {
        if (!audioRef.current || audioRef.current.paused) {
          playSoundEffect(tool, true);
        }
      } else {
        playSoundEffect(tool, true);
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      playSoundEffect(tool, false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      // Always restore the default cursor when the effect cleans up (unmount/close)
      document.body.style.cursor = 'default';
    };
  }, [isAppOpen, isMouseDown, tool, applyEffect, playSoundEffect]);

  const clearAll = () => {
    const canvas = canvasRef.current;
    const damageCanvas = damageCanvasRef.current;
    const particleCanvas = particleCanvasRef.current;
    
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (damageCanvas) {
      const ctx = damageCanvas.getContext("2d");
      ctx.clearRect(0, 0, damageCanvas.width, damageCanvas.height);
    }
    if (particleCanvas) {
      const ctx = particleCanvas.getContext("2d");
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    }
    
    // Clear damage and particle arrays
    damagesRef.current = [];
    particlesRef.current = [];
    termitesRef.current = [];
  };

  // Clear canvas when app is closed
  useEffect(() => {
    if (!isAppOpen) {
      clearAll();
    }
  }, [isAppOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isAppOpen) return;

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      const toolMap = {
        '1': 'hammer',
        '2': 'chainsaw',
        '3': 'fire',
        '4': 'lightning',
        '5': 'termites',
        '6': 'eraser',
        '7': 'paintgun',
        '8': 'gun'
      };

      if (toolMap[key]) {
        setTool(toolMap[key]);
        playSoundEffect(toolMap[key]);
      } else if (key === 'c') {
        clearAll();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isAppOpen, playSoundEffect]);

  const tools = [
    { name: "hammer", icon: FaHammer, label: "Hammer", sound: "crack", key: "1" },
    { name: "chainsaw", icon: GiAxeSword, label: "Chainsaw", sound: "chainsaw", key: "2" },
    { name: "fire", icon: FaBurn, label: "Fire", sound: "fire", key: "3" },
    { name: "lightning", icon: FaBolt, label: "Lightning", sound: "zap", key: "4" },
    { name: "termites", icon: FaBug, label: "Termites", sound: "eat", key: "5" },
    { name: "eraser", icon: FaBomb, label: "Eraser", sound: "erase", key: "6" },
    { name: "paintgun", icon: GiMachineGun, label: "Paint Gun", sound: "paint", key: "7" },
    { name: "gun", icon: GiMachineGun, label: "Gun", sound: "shot", key: "8" },
  ];

  return (
    <>
      {/* Canvas overlays - stays visible even when minimized */}
      {isAppOpen && (
        <>
          <canvas
            ref={canvasRef}
            className="fixed inset-0 select-none"
            style={{ zIndex: 50, pointerEvents: 'none', userSelect: 'none' }}
          />
          <canvas
            ref={damageCanvasRef}
            className="fixed inset-0 select-none"
            style={{ zIndex: 50, pointerEvents: 'none', userSelect: 'none' }}
          />
          <canvas
            ref={particleCanvasRef}
            className="fixed inset-0 select-none"
            style={{ zIndex: 50, pointerEvents: 'none', userSelect: 'none' }}
          />
          {/* Custom cursor images */}
          {tool && tool === 'gun' && (
            <img
              ref={cursorImageRef}
              src={`${process.env.PUBLIC_URL}/images/cursors/gun.png`}
              alt=""
              className="fixed pointer-events-none select-none transition-transform duration-75"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: isMouseDown ? 'translate(50%, 30%)' : 'translate(50%, 30%) rotate(-5deg)',
                zIndex: 9999,
                width: '120px'
              }}
            />
          )}
          {tool && tool === 'hammer' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/hammer.png`}
              alt=""
              className="fixed pointer-events-none select-none transition-transform duration-100"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: isMouseDown ? 'translate(-10%, -40%)' : 'translate(-10%, -40%) rotate(20deg)',
                animationDuration: isMouseDown ? '0.1s' : '0.3s',
                zIndex: 9999,
                width: '200px'
              }}
            />
          )}
          {tool && tool === 'chainsaw' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/chainsaw.png`}
              alt=""
              className={`fixed pointer-events-none select-none ${isMouseDown ? 'chainsaw-shake' : ''}`}
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(-10%, -20%)',
                zIndex: 9999,
                width: '120px'
              }}
            />
          )}
          {tool && tool === 'fire' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/fire.png`}
              alt=""
              className="fixed pointer-events-none select-none"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(-90%, 0%)',
                zIndex: 9999,
                width: '90px'
              }}
            />
          )}
          {tool && tool === 'lightning' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/lightning.png`}
              alt=""
              className="fixed pointer-events-none select-none"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                width: '100px'
              }}
            />
          )}
          {tool && tool === 'termites' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/termites.png`}
              alt=""
              className="fixed pointer-events-none select-none"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(-40%, 60%)',
                rotate: '70deg',
                zIndex: 9999,
                width: '80px'
              }}
            />
          )}
          {tool && tool === 'eraser' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/eraser.png`}
              alt=""
              className="fixed pointer-events-none select-none"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                width: '80px'
              }}
            />
          )}
          {tool && tool === 'paintgun' && (
            <img
              src={`${process.env.PUBLIC_URL}/images/cursors/paintgun.png`}
              alt=""
              className="fixed pointer-events-none select-none transition-transform duration-75"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(0%, -40%)',
                zIndex: 9999,
                rotate: isMouseDown ? '10deg' : '0deg',
                width: '100px'
              }}
            />
          )}
        </>
      )}

      {/* Control window */}
      <div
        className={`${
          isAppOpen && !isMinimized ? "" : "hidden"
        } ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none select-none`}
      >
        <Draggable handle=".title-bar" nodeRef={windowRef} bounds={bounds}>
          <div
            ref={windowRef}
            className="destroyer-window window bg-neutral-900 h-[500px] w-96 rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto"
            onMouseDown={bringToFront}
          >
            <div className="title-bar bg-neutral-800 text-white h-9 flex justify-between items-center select-none">
              <div className="ml-4 font-normal">Desktop Destroyer</div>
              <div className="flex">
                <button
                  className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-xl"
                  onClick={minimizeWindow}
                  aria-label="Minimize"
                >
                  <MdMinimize />
                </button>
                <button
                  className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-sm"
                  aria-label="Maximize"
                >
                  <MdCheckBoxOutlineBlank />
                </button>
                <button
                  className="hover:bg-red-700 w-12 h-9 flex justify-center items-center text-xl"
                  onClick={toggleDesktopDestroyer}
                  aria-label="Close"
                >
                  <MdClose />
                </button>
              </div>
            </div>
            <div className="content text-white p-3 select-none overflow-hidden h-[calc(100%-36px)] bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 flex flex-col">
              <div className="text-center mb-2 text-[10px] text-neutral-400 font-medium">
                Press 1-8 to switch tools
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {tools.map(({ name, icon: Icon, label, key }) => (
                  <button
                    key={name}
                    onClick={() => setTool(name)}
                    className={`group relative p-2.5 rounded-lg flex flex-col items-center gap-1.5 transition-all duration-200 border-2 ${
                      tool === name
                        ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-blue-400 shadow-lg shadow-blue-500/40 scale-105"
                        : "bg-neutral-800/80 hover:bg-neutral-750 border-neutral-700/50 hover:border-neutral-600 hover:scale-102"
                    }`}
                  >
                    <div className="absolute top-1 right-1.5 text-[9px] font-bold opacity-50">{key}</div>
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/cursors/${name}.png`} 
                      alt={label}
                      className={`w-8 h-8 object-contain ${tool === name ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`}
                    />
                    <span className="text-[10px] font-semibold tracking-wide">{label}</span>
                    {tool === name && (
                      <div className="absolute inset-0 rounded-lg bg-blue-400/10 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-center text-[9px] text-yellow-400/80 font-medium">
                ⚠️ May cause lag with excessive destruction
              </div>
              <button
                onClick={clearAll}
                className="relative w-full mt-2 p-2.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 rounded-lg font-bold text-xs tracking-wide transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 border-2 border-red-400/50 hover:scale-102 active:scale-98"
              >
                <span className="absolute top-1.5 right-2.5 text-[9px] font-bold opacity-50">C</span>
                🧹 Clear All Destruction
              </button>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
};

export default DesktopDestroyer;
