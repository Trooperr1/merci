/**
 * MERCI STUDIO - LIVE INTERACTIVE 3D ANIMATIONS
 * Real-time user-controlled 3D effects
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    initInteractive3DModel();
    initMouseTrailParticles();
    initClickRipples();
    initScrollMorphing();
    init3DFloatingText();
});

/**
 * INTERACTIVE 3D MODEL - Users can rotate with mouse drag
 */
function initInteractive3DModel() {
    const heroVisual = document.getElementById('heroVisual3D');
    if (!heroVisual) return;

    // Clear existing content
    heroVisual.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const size = Math.min(600, window.innerWidth * 0.4);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroVisual.appendChild(renderer.domElement);

    // Create complex interactive 3D object
    const group = new THREE.Group();

    // Main morphing sphere
    const mainGeo = new THREE.IcosahedronGeometry(4, 2);
    const mainMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const mainMesh = new THREE.Mesh(mainGeo, mainMat);
    group.add(mainMesh);

    // Inner rotating core
    const coreGeo = new THREE.OctahedronGeometry(2, 0);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Orbital rings
    for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(3 + i * 0.8, 0.1, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        group.add(ring);
    }

    // Floating particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    scene.add(group);
    camera.position.z = 12;

    // Mouse interaction variables
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    // Mouse events
    renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        renderer.domElement.style.cursor = 'grabbing';
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMouseX;
            const deltaY = e.clientY - previousMouseY;

            rotationVelocityY = deltaX * 0.005;
            rotationVelocityX = deltaY * 0.005;

            previousMouseX = e.clientX;
            previousMouseY = e.clientY;
        }
    });

    renderer.domElement.addEventListener('mouseup', () => {
        isDragging = false;
        renderer.domElement.style.cursor = 'grab';
    });

    renderer.domElement.addEventListener('mouseleave', () => {
        isDragging = false;
        renderer.domElement.style.cursor = 'grab';
    });

    renderer.domElement.style.cursor = 'grab';

    // Touch support for mobile
    renderer.domElement.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
    });

    renderer.domElement.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - previousMouseX;
            const deltaY = e.touches[0].clientY - previousMouseY;

            rotationVelocityY = deltaX * 0.005;
            rotationVelocityX = deltaY * 0.005;

            previousMouseX = e.touches[0].clientX;
            previousMouseY = e.touches[0].clientY;
        }
    });

    renderer.domElement.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Apply rotation with momentum
        group.rotation.y += rotationVelocityY;
        group.rotation.x += rotationVelocityX;

        // Damping (friction)
        rotationVelocityX *= 0.95;
        rotationVelocityY *= 0.95;

        // Auto-rotate when not dragging
        if (!isDragging) {
            group.rotation.y += 0.002;
        }

        // Animate inner elements
        coreMesh.rotation.x += 0.01;
        coreMesh.rotation.y += 0.015;

        particles.rotation.y += 0.001;

        // Morph main sphere
        const time = Date.now() * 0.001;
        mainMesh.rotation.x = Math.sin(time * 0.3) * 0.2;
        mainMesh.rotation.y = Math.cos(time * 0.2) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    // Add instruction text
    const instruction = document.createElement('div');
    instruction.style.cssText = `
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.85rem;
        text-align: center;
        pointer-events: none;
    `;
    instruction.textContent = '← Drag to rotate →';
    heroVisual.appendChild(instruction);
}

/**
 * MOUSE TRAIL PARTICLES - Particles follow cursor
 */
function initMouseTrailParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 50;

    class TrailParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.life = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            this.size *= 0.97;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.5})`;
            ctx.fill();
        }
    }

    document.addEventListener('mousemove', (e) => {
        if (particles.length < maxParticles) {
            particles.push(new TrailParticle(e.clientX, e.clientY));
        }
    });

    function animateTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/**
 * CLICK RIPPLE EFFECTS - Expanding circles on click
 */
function initClickRipples() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ripples = [];

    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 100;
            this.opacity = 1;
        }

        update() {
            this.radius += 3;
            this.opacity -= 0.02;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    document.addEventListener('click', (e) => {
        ripples.push(new Ripple(e.clientX, e.clientY));
    });

    function animateRipples() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].update();
            ripples[i].draw();

            if (ripples[i].opacity <= 0 || ripples[i].radius >= ripples[i].maxRadius) {
                ripples.splice(i, 1);
            }
        }

        requestAnimationFrame(animateRipples);
    }

    animateRipples();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/**
 * SCROLL MORPHING - Shapes transform as you scroll
 */
function initScrollMorphing() {
    const container = document.getElementById('heroBg');
    if (!container) return;

    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        // Find and morph the hero shapes based on scroll
        const canvases = container.querySelectorAll('canvas');
        if (canvases.length > 0) {
            const opacity = Math.max(0.3, 1 - scrollPercent * 2);
            container.style.opacity = opacity;
        }
    });
}

/**
 * 3D FLOATING TEXT - Animated 3D logo
 */
function init3DFloatingText() {
    // Only add on homepage
    if (!document.getElementById('heroBg')) return;

    const heroContent = document.querySelector('.hero-content-wrapper');
    if (!heroContent) return;

    // Create floating 3D effect for the title
    const title = document.querySelector('.hero-title-modern');
    if (!title) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    function animate3DText() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        title.style.transform = `
            perspective(1000px)
            rotateY(${currentX * 0.5}deg)
            rotateX(${-currentY * 0.5}deg)
            translateZ(20px)
        `;

        requestAnimationFrame(animate3DText);
    }

    animate3DText();
}

// Add some visual feedback
console.log('%c🎮 INTERACTIVE 3D LOADED ', 'background: #000; color: #0f0; font-size: 14px; padding: 5px;');
console.log('%c- Drag the 3D model to rotate it', 'color: #999; font-size: 11px;');
console.log('%c- Move mouse to see particle trails', 'color: #999; font-size: 11px;');
console.log('%c- Click anywhere for ripple effects', 'color: #999; font-size: 11px;');
console.log('%c- Scroll to morph the background', 'color: #999; font-size: 11px;');
