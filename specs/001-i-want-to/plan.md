# Implementation Plan: Visual Keyboard Layout Builder

**Branch**: `001-i-want-to` | **Date**: 2025-09-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-i-want-to/spec.md`

## Summary
This plan outlines the development of a web application for visually building ergonomic mechanical keyboard layouts. The application will serve as an interactive frontend for the **Ergogen** layout engine. Users will manipulate a visual representation of the keyboard, and the application state will be synchronized with an Ergogen-compatible data structure. The primary technical goal is to provide an intuitive UI that generates a valid Ergogen YAML file for users to download and use with offline tooling.

## Technical Context
**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Next.js (React 18+), three.js, @react-three/fiber, zustand, tailwindcss, **js-yaml**
**Core Engine**: **Ergogen** (for layout definition and file generation logic)
**Storage**: N/A (State managed on the client-side)
**Testing**: Jest, React Testing Library
**Target Platform**: Modern Web Browsers
**Project Type**: Web Application (Frontend)
**Performance Goals**: Maintain 60 FPS during 3D view manipulation. UI interactions should be instant.
**Constraints**: The application's internal data model MUST be serializable to an Ergogen-compatible YAML format. The MVP will focus on generating the YAML file, not on running Ergogen within the browser.
**Scale/Scope**: The application should handle layouts up to ~200 keys without performance degradation.

## Constitution Check
*This plan adheres to the principles outlined in `memory/constitution.md`.* 

## Project Structure

### Documentation (this feature)
```
specs/001-i-want-to/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── contracts/           # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)
```
# Frontend Application Structure
src/
├── app/                 # Next.js App Router
├── components/          # Reusable React components
├── store/               # Zustand store
├── lib/                 # Core logic, including Ergogen data mapping
└── styles/              # Global styles

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: A single frontend project based on the Next.js App Router structure.

## Phase 0: Outline & Research
1. **Research Tasks**:
   - **Ergogen Core**: Research Ergogen's YAML configuration structure, focusing on `points`, `outlines`, and `keys`.
   - **Data Mapping**: Investigate best practices for mapping an interactive UI state to a declarative YAML structure like Ergogen's.
   - **YAML Generation**: Research client-side YAML generation and file download in JavaScript using `js-yaml`.
   - **State Management**: Find best practices for Zustand for a state that is both interactive and needs to be cleanly serialized.
   - **3D Performance**: Research performance optimization for `@react-three/fiber` (still relevant for the visual preview).

2. **Consolidate findings** in `research.md`.

**Output**: `research.md` with decisions on the data model structure and serialization strategy.

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Define Data Models** in `data-model.md`:
   - Formalize the data structures in TypeScript, mirroring Ergogen's object model (e.g., `points`, `keys`).
2. **Define Contracts** in `contracts/`:
   - **State Contract**: Define the Zustand store shape and actions, including an action to trigger YAML export.
   - **Component Contracts**: Define props interfaces for major UI components.
3. **Generate Initial Tests**:
   - Write failing unit tests for the Ergogen data transformation logic.
   - Write a failing integration test for the "Download YAML" feature.
4. **Create Quickstart Guide** in `quickstart.md`:
   - Add a validation step to download the YAML file and check its basic structure.

**Output**: `data-model.md`, `contracts/`, `quickstart.md`, and initial failing tests.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do.*

**Task Generation Strategy**:
- A `tasks.md` file will be generated based on the design artifacts.
- **Setup**: Tasks for initializing the project and dependencies.
- **State & Data Model**: Tasks to implement the Ergogen-aligned data model and Zustand store.
- **Ergogen Integration**: Tasks to create the data mapping logic to convert the store's state to a valid Ergogen YAML string.
- **UI Shell & 2D View**: Tasks to build the main UI and 2D layout view.
- **Interactivity**: Tasks for selection, nudging, and rotation, ensuring these actions correctly modify the Ergogen-compatible state.
- **3D Preview**: Tasks to build the `three.js` preview.
- **Core Feature**: Tasks to implement the "Download YAML" functionality.

**Ordering Strategy**: Core Data Model → State Management → 2D View → Interactivity → Ergogen Serialization → 3D Preview.

## Progress Tracking
- [X] Phase 0: Research complete
- [X] Phase 1: Design complete
- [X] Phase 2: Task planning approach defined
- [X] Phase 3: Tasks generated
