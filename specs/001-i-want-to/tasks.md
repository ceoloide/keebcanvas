# Tasks: Visual Keyboard Layout Builder

**Input**: Design documents from `/specs/001-i-want-to/`
**Prerequisites**: plan.md, research.md, data-model.md, quickstart.md

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- Paths shown below assume single project structure (`src/`, `tests/`)

## Phase 3.1: Setup
- [x] T001 Create project structure per implementation plan.
- [x] T002 Initialize Next.js application with dependencies (`@react-three/drei`, `immer`, `js-yaml`, `three`, `zustand`).
- [x] T003 [P] Configure linting and formatting tools (ESLint, Prettier).

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Create a test for the initial view with three options in `tests/integration/initial-view.test.tsx`.
- [x] T005 [P] Create a test for selecting a split keyboard and a Corne layout in `tests/integration/layout-selection.test.tsx`.
- [x] T006 [P] Create a test for key selection and manipulation in `tests/integration/key-manipulation.test.tsx`.
- [x] T007 [P] Create a test for zone selection and manipulation in `tests/integration/zone-manipulation.test.tsx`.
- [x] T008 [P] Create unit tests for `zustand` store state transitions in `tests/unit/store.test.ts`.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T009 [P] Create the data models in `src/lib/types.ts` based on `data-model.md` (`KeyboardLayout`, `KeyZone`, `Key`, `Switch`, `GlobalSettings`).
- [x] T010 [P] Implement the `zustand` store in `src/store/store.ts` for managing the keyboard layout state.
- [x] T011 Implement the initial view with three options in `src/app/page.tsx`.
- [x] T012 Implement the layout selection view in `src/components/LayoutSelectionView.tsx`.
- [x] T013 Implement the main layout view in `src/components/LayoutView.tsx` using `react-three/fiber`.
- [x] T014 Implement the `KeyView` component in `src/components/KeyView.tsx`.
- [x] T015 Implement the `ZoneView` component in `src/components/ZoneView.tsx`.
- [x] T016 Implement the `PropertyEditor` component in `src/components/PropertyEditor.tsx` for manipulating selected keys and zones.

## Phase 3.4: Integration
- [x] T017 Integrate the `PropertyEditor` with the `zustand` store to update the layout state.
- [x] T018 Implement the YAML download functionality in `src/components/YamlDownloadButton.tsx`.

## Phase 3.5: Polish
- [x] T019 [P] Add unit tests for utility functions.
- [ ] T020 [P] Add visual regression tests for the layout view.
- [x] T021 [P] Update `README.md` with instructions on how to run the application.

## Dependencies
- Tests (T004-T008) before implementation (T009-T016)
- T009 blocks T010
- T010 blocks T011, T012, T013, T014, T015, T016, T017
- Implementation before polish (T019-T021)
