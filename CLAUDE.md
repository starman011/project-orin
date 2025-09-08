# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Create React App project. Common commands:

- `npm start` - Start development server on http://localhost:3000
- `npm run build` - Build for production 
- `npm test` - Run tests in interactive watch mode
- `npm run eject` - Eject from Create React App (irreversible)

## Architecture Overview

This is a React-based single-page application featuring a custom full-screen scrolling experience with WebGL animations.

### Core Structure

- **App.js** - Main component managing scroll behavior and section navigation
- **Components** - Modular React components for each section (Hero, Mission, Founders, Pricing, Newsletter, Footer)
- **Prism Component** - Advanced WebGL component using OGL library for 3D prism animations

### Key Technologies

- **React 18** - Main framework
- **OGL** - WebGL library for 3D graphics (used in Prism component)
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

### Scrolling System

The application implements custom scroll behavior:
- Desktop: Full-screen snapping between sections with smooth transitions
- Mobile: Standard scrolling behavior
- Sections: home, mission, founders, pricing, newsletter
- Navigation dots on desktop for direct section access
- Touch and wheel event handling for smooth transitions

### Component Architecture

Components follow a consistent pattern:
- Each major section has its own component and CSS file
- Component files use `.jsx` extension
- CSS files are co-located with components
- Global styles in `src/styles/globals.css`

### WebGL Integration

The Prism component provides a complex WebGL background animation:
- Custom vertex and fragment shaders
- Multiple animation modes: hover, 3drotate, static
- Configurable parameters for visual effects
- Performance optimizations with RAF and intersection observers

### File Structure

```
src/
├── App.js                 # Main application component
├── components/            # React components
│   ├── Hero.jsx/css      # Landing section
│   ├── Mission.jsx/css   # Mission section  
│   ├── Founders.jsx/css  # Founders section
│   ├── Pricing.jsx/css   # Pricing section
│   ├── Newsletter.jsx/css # Newsletter signup
│   ├── Footer.jsx/css    # Footer
│   ├── Navbar.jsx/css    # Navigation bar
│   └── Prism.jsx/css     # WebGL prism animation
└── styles/
    └── globals.css       # Global styles
```

### Development Notes

- Component styling uses CSS modules pattern with separate CSS files
- The application is responsive with different behavior for mobile vs desktop
- WebGL animations are performance-optimized with conditional rendering
- Scroll behavior is completely custom-implemented for desktop experience