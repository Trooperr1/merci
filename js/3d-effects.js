/**
 * MERCI STUDIO - PREMIUM 3D EFFECTS
 * Ultra-modern Three.js animations with stunning visuals
 */

// Wait for DOM and Three.js to load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, skipping 3D effects');
        return;
    }

    // Initialize all 3D backgrounds
    initHero3D();
    initHeroVisual3D();
    initServiceIcons();
    initExpertise3D();
    initContact3D();
    initPageHero3D();
});

/**
 * HERO 3D BACKGROUND - Premium particle nebula with floating shapes
 */
function initHero3D() {
    const container = document.getElementById('heroBg');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // MASSIVE PARTICLE SYSTEM - Stars nebula effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 150;
        posArray[i + 1] = (Math.random() - 0.5) * 150;
        posArray[i + 2] = (Math.random() - 0.5) * 150;

        // Colors - white to light gray gradient
        const brightness = 0.5 + Math.random() * 0.5;
        colorsArray[i] = brightness;
        colorsArray[i + 1] = brightness;
        colorsArray[i + 2] = brightness;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // FLOATING GEOMETRIC SHAPES
    const shapes = [];

    // Wireframe Torus
    const torusGeo = new THREE.TorusGeometry(12, 0.3, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-20, 10, -30);
    shapes.push(torus);
    scene.add(torus);

    // Wireframe Sphere
    const sphereGeo = new THREE.SphereGeometry(8, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(25, -15, -40);
    shapes.push(sphere);
    scene.add(sphere);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(10, 0);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(0, 20, -50);
    shapes.push(icosahedron);
    scene.add(icosahedron);

    camera.position.z = 50;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Rotate particle system
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0003;

        // Animate shapes
        torus.rotation.x += 0.003;
        torus.rotation.y += 0.005;

        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.004;

        icosahedron.rotation.x += 0.004;
        icosahedron.rotation.z += 0.003;

        // Float shapes up and down
        torus.position.y += Math.sin(Date.now() * 0.0005) * 0.02;
        sphere.position.y += Math.cos(Date.now() * 0.0007) * 0.02;
        icosahedron.position.y += Math.sin(Date.now() * 0.0006) * 0.02;

        // Camera movement with mouse
        camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
        camera.position.y += (targetY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/**
 * HERO VISUAL 3D - Right side visual element
 */
function initHeroVisual3D() {
    const container = document.getElementById('heroVisual3D');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const size = Math.min(600, window.innerWidth * 0.4);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create morphing sphere with particles
    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(4, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Particles around sphere
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);

        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.008;

        innerSphere.rotation.x -= 0.003;
        innerSphere.rotation.y -= 0.005;

        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();
}

/**
 * SERVICE ICONS 3D
 */
function initServiceIcons() {
    const icons = [
        { id: 'aiIcon', geometry: 'icosahedron' },
        { id: 'webIcon', geometry: 'octahedron' },
        { id: 'socialIcon', geometry: 'dodecahedron' },
        { id: 'posIcon', geometry: 'tetrahedron' }
    ];

    icons.forEach(icon => {
        const container = document.getElementById(icon.id);
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        const size = 100;
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        let geometry;
        switch (icon.geometry) {
            case 'icosahedron':
                geometry = new THREE.IcosahedronGeometry(1.8, 0);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(1.8, 0);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(1.8, 0);
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(2, 0);
                break;
        }

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.9
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add small particles around
        const pGeo = new THREE.BufferGeometry();
        const pCount = 50;
        const pArray = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) {
            pArray[i] = (Math.random() - 0.5) * 5;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pArray, 3));
        const pMat = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        const pMesh = new THREE.Points(pGeo, pMat);
        scene.add(pMesh);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            pMesh.rotation.y += 0.005;
            renderer.render(scene, camera);
        }

        animate();
    });
}

/**
 * EXPERTISE CARD 3D BACKGROUNDS
 */
function initExpertise3D() {
    const cards = ['expertiseAI', 'expertiseWeb', 'expertiseSocial', 'expertisePOS'];
    const geometries = [
        () => new THREE.IcosahedronGeometry(3, 1),
        () => new THREE.TorusKnotGeometry(2, 0.5, 100, 16),
        () => new THREE.OctahedronGeometry(3, 0),
        () => new THREE.BoxGeometry(3, 3, 3)
    ];

    cards.forEach((cardId, index) => {
        const container = document.getElementById(cardId);
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        const size = 100;
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const geometry = geometries[index]();
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 8;

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.008;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    });
}

/**
 * CONTACT 3D BACKGROUND
 */
function initContact3D() {
    const container = document.getElementById('contactBg3D');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create multiple animated rings
    const rings = [];
    for (let i = 0; i < 8; i++) {
        const ringGeo = new THREE.TorusGeometry(6 + i * 3, 0.15, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.05 + (i * 0.01)
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        rings.push(ring);
        scene.add(ring);
    }

    // Add floating particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    camera.position.z = 40;

    function animate() {
        requestAnimationFrame(animate);

        rings.forEach((ring, index) => {
            ring.rotation.x += 0.001 * (index + 1);
            ring.rotation.y += 0.002 * (index + 1);
        });

        particles.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    resizeObserver.observe(container);
}

/**
 * PAGE HERO 3D - For service/portfolio/about pages
 */
function initPageHero3D() {
    const pageHero = document.querySelector('.page-hero');
    if (!pageHero) return;

    // Create container for 3D if it doesn't exist
    let container = pageHero.querySelector('.page-hero-3d');
    if (!container) {
        container = document.createElement('div');
        container.className = 'page-hero-3d';
        container.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; opacity: 0.3;';
        pageHero.insertBefore(container, pageHero.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight * 0.4);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle field
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Add a rotating shape
    const shapeGeo = new THREE.IcosahedronGeometry(8, 1);
    const shapeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const shape = new THREE.Mesh(shapeGeo, shapeMat);
    scene.add(shape);

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        shape.rotation.x += 0.002;
        shape.rotation.y += 0.003;
        renderer.render(scene, camera);
    }

    animate();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    document.querySelectorAll('canvas').forEach(canvas => {
        canvas.remove();
    });
});
