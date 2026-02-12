# Interactive Presentation Design Workflow

> [!IMPORTANT]
> **DAZZLE MANDATE**: Never generate basic HTML. Always use the "Beyond Apex" modules.
> **STABILITY MANDATE**: Prioritize content legibility. Ensure backgrounds provide high contrast for text and motion is never jarring.

// turbo-all
Follow these steps to generate a premium interactive interface.

### 1. Configuration Phase (MANDATORY)

Before writing any code, define the following variables with the user or based on the context:

- **Theme**: Select from `Quantum`, `Organic`, `Ethereal`, or `Void` (see `design_system.md`).
- **Shapes**: Specific 3D shapes for the background (e.g., "Floating DNA strands", "Crystalline Cubes", "Smooth Spheres").
- **Content**: The chapters/sections of the presentation.
- **Tone**: Academic, Futuristic, Luxury, etc.

### 2. Scaffold Generation

Create the base HTML structure. Link Three.js, GSAP, and ScrollTrigger.
Implement the CSS variables based on the chosen **Theme**.

```css
:root {
    --primary: [From Theme Matrix];
    --secondary: [From Theme Matrix];
    --bg: #030308;
}
```

### 3. Core Components Implementation

Implement the following standard modules (see `design_system.md` for snippets):

- **Loader**: A themed preloader.
- **Custom Cursor**: Smoothed ring + dot.
- **3D World**: Three.js scene with **Shapes** defined in Phase 1. Add mouse parallax.
- **Scrollytelling Layout**: Fixed sidebar navigation + sections with `.reveal`.

### 4. Cinematic Pass (The World-Class Secret)

To achieve "Dazzling" results, implement the following (see `design_system.md` for Apex snippets):

- **EffectComposer**: Add active `UnrealBloomPass` and `FilmPass` (grain).
- **Custom Shaders**: Replace standard wireframes with GLSL aura/noise materials for the hero shapes.
- **Kinetic Type**: Animate all headers using staggered GSAP reveals (`y: 100` -> `0`).

### 5. Advanced Interactive Layer

- **Camera Splines**: Define a 3D path and move the camera along it based on scroll.
- **Magnetic Interactions**: Add JS logic to make buttons attract the cursor.
- **GSAP Orchestration**: Link the 3D world's evolution (morphing shapes) to specific scrollytelling sections.

### 6. Deployment & Verification

- Use `write_to_file` to save the final `index.html`.
- Verify the "Cinematic feel" (Bloom intensity, grain visibility).
- Ensure the 3D performance remains smooth (60fps) during post-processing.
