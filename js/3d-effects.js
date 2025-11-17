/**
 * MERCI STUDIO - 3D EFFECTS
 * Premium Three.js animations for each section
 */

// Wait for DOM and Three.js to load
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, skipping 3D effects');
        return;
    }

    // Hero 3D Background
    initHero3D();

    // Service Icons 3D
    initServiceIcons();

    // Detail Section 3D
    initDetailSections();

    // Contact 3D Background
    initContact3D();
});

/**
 * Hero 3D Background - Animated particles and geometry
 */
function initHero3D() {
    const container = document.getElementById('hero3d');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create rotating torus
    const torusGeometry = new THREE.TorusGeometry(10, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    camera.position.z = 30;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Rotate torus
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.01;

        // Mouse interaction
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/**
 * Service Icons 3D - Animated 3D icons for each service
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

        const size = 80;
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create geometry based on type
        let geometry;
        switch (icon.geometry) {
            case 'icosahedron':
                geometry = new THREE.IcosahedronGeometry(1.5, 0);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(1.5, 0);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(1.5, 0);
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(1.5, 0);
                break;
            default:
                geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        }

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 4;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();

        // Hover effect
        const card = container.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                mesh.rotation.speed = 0.03;
            });
            card.addEventListener('mouseleave', () => {
                mesh.rotation.speed = 0.01;
            });
        }
    });
}

/**
 * Detail Sections 3D - Animated backgrounds for service detail sections
 */
function initDetailSections() {
    const sections = ['ai3d', 'web3d', 'social3d', 'pos3d'];

    sections.forEach((sectionId, index) => {
        const container = document.getElementById(sectionId);
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create unique geometry for each section
        const geometries = [
            new THREE.IcosahedronGeometry(8, 1),
            new THREE.TorusKnotGeometry(5, 1.5, 100, 16),
            new THREE.SphereGeometry(7, 32, 32),
            new THREE.BoxGeometry(10, 10, 10)
        ];

        const geometry = geometries[index];
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 20;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.003;
            mesh.rotation.y += 0.005;
            renderer.render(scene, camera);
        }

        animate();

        // Handle section resize
        const resizeObserver = new ResizeObserver(() => {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        });

        resizeObserver.observe(container);

        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    renderer.domElement.style.display = 'block';
                } else {
                    renderer.domElement.style.display = 'none';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);
    });
}

/**
 * Contact 3D Background
 */
function initContact3D() {
    const container = document.getElementById('contact3d');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create multiple rotating rings
    const rings = [];
    for (let i = 0; i < 5; i++) {
        const ringGeometry = new THREE.TorusGeometry(5 + i * 2, 0.2, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        rings.push(ring);
        scene.add(ring);
    }

    camera.position.z = 25;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        rings.forEach((ring, index) => {
            ring.rotation.x += 0.002 * (index + 1);
            ring.rotation.y += 0.003 * (index + 1);
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle section resize
    const resizeObserver = new ResizeObserver(() => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    resizeObserver.observe(container);
}

// Cleanup function for memory management
window.addEventListener('beforeunload', () => {
    // Dispose of Three.js resources
    document.querySelectorAll('canvas').forEach(canvas => {
        canvas.remove();
    });
});
