# MERCI STUDIO - Premium Website

A premium black & white branded website featuring 3D interactive elements, smooth animations, and cutting-edge design.

## Features

- **Black & White Branding** - Elegant, minimalist color scheme
- **3D Interactive Elements** - Three.js powered animations for each section
- **Premium UI/UX** - Smooth transitions, parallax effects, and micro-interactions
- **Fully Responsive** - Optimized for all devices and screen sizes
- **Performance Optimized** - Lazy loading, debounced events, and efficient rendering
- **Modern Tech Stack** - HTML5, CSS3, JavaScript ES6+, Three.js

## Services Showcased

1. **Artificial Intelligence** - ML models, NLP, computer vision, and AI automation
2. **Web Development** - Full-stack solutions, e-commerce, PWAs, and APIs
3. **Social Media Management** - Content strategy, community management, and paid advertising
4. **POS Systems** - Cloud-based point-of-sale with inventory and analytics

## Quick Start

### Option 1: Direct Browser Access
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The website will be available at `http://localhost:3000`

### Option 3: Python Server
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

## Project Structure

```
merci/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Premium styling
├── js/
│   ├── main.js           # Main JavaScript interactions
│   └── 3d-effects.js     # Three.js 3D animations
├── assets/
│   └── images/           # Image assets
├── package.json          # Project dependencies
└── README.md            # This file
```

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --color-black: #000000;
    --color-white: #FFFFFF;
    /* Add your custom colors */
}
```

### Content
Update text content directly in `index.html`

### 3D Effects
Modify 3D animations in `js/3d-effects.js`

### Contact Form
The contact form currently simulates submission. To connect to a backend:
1. Open `js/main.js`
2. Find the `initFormHandling()` function
3. Replace the simulated submission with your API endpoint

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- Optimized 3D rendering with visibility detection
- Debounced scroll and resize events
- Lazy loading for off-screen elements
- Efficient particle systems
- Responsive images ready

## Features in Detail

### 3D Elements
- **Hero Section**: Animated particle system with rotating torus
- **Service Icons**: Unique 3D geometry for each service
- **Detail Sections**: Large-scale 3D backgrounds
- **Contact Section**: Rotating ring system

### Animations
- Fade-in on scroll
- Parallax effects
- Card tilt on hover
- Custom cursor follower
- Smooth page transitions

### Interactive Elements
- Smooth scroll navigation
- Mobile-friendly menu
- Form validation
- Hover effects
- Mouse movement interactions

## Contact Information

- **Email**: hello@mercistudio.com
- **Phone**: +1 (234) 567-890
- **Location**: Global Remote Studio

## License

MIT License - Feel free to use this template for your projects

## Credits

- **Design & Development**: MERCI Studio
- **3D Library**: Three.js
- **Fonts**: Google Fonts (Inter, Space Grotesk)

---

Built with ❤️ by MERCI Studio
