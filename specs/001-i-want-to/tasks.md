# Tasks for Visual Keyboard Layout Builder

This document lists the tasks required to implement the visual keyboard layout builder.

## Phase 3: Implementation

### Setup

- [X] 1. Initialize the Next.js project.
- [X] 2. Install dependencies: `three.js`, `@react-three/fiber`, `@react-three/drei`, `zustand`, `js-yaml`.

### State & Data Model

- [X] 3. Implement the Zustand store based on the `state.ts` contract.
- [X] 4. Implement the data models in `src/lib/types.ts` based on the `data-model.ts` contract.

### Ergogen Integration

- [X] 5. Implement the `generateYaml` function in `src/lib/ergogen.ts` to correctly serialize the layout state to a YAML string.
- [X] 6. Make the `ergogen.test.ts` unit test pass.

### UI Shell & 2D View

- [X] 7. Create the main application layout component (`src/app/page.tsx`).
- [X] 8. Create a 2D view component (`src/components/LayoutView.tsx`) to render the keyboard layout.
- [X] 9. Create a component to render a single key (`src/components/KeyView.tsx`).
- [X] 10. Create a component to render a zone (`src/components/ZoneView.tsx`).

### Interactivity

- [X] 11. Implement key selection.
- [X] 12. Implement key nudging (moving with arrow keys).
- [X] 13. Implement key rotation.
- [X] 14. Implement property editing for selected keys and zones.

### 3D Preview

- [X] 15. Create a 3D preview component (`src/components/PreviewView.tsx`) using `@react-three/fiber`.
- [X] 16. Render the keyboard case and keycaps in the 3D preview.

### Core Feature

- [X] 17. Implement the "Download YAML" functionality in the `YamlDownloadButton` component.
- [X] 18. Make the `download-yaml.test.tsx` integration test pass.
