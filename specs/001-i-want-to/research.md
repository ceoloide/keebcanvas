# Research: Frontend Technologies

**Date**: 2025-09-08

## Summary

This research phase focused on establishing best practices for the core frontend technologies selected for the project: `react-three/fiber` for 3D visualization and `zustand` for state management. The findings below will guide the implementation to ensure a performant, maintainable, and scalable application.

## `react-three/fiber` Best Practices

`react-three/fiber` (R3F) is a powerful renderer for building 3D scenes in React. The key to using it effectively is to blend React's component model with Three.js's performance considerations.

### Core Principles

- **Declarative Structure**: Scenes should be built using small, reusable React components. This is more maintainable than imperative Three.js code.
- **Embrace the Ecosystem**: `@react-three/drei` is an essential toolkit that provides pre-built components, helpers, and abstractions (e.g., camera controls, shaders, performance monitors). It should be considered a standard dependency.

### Performance Optimization

- **On-Demand Rendering**: For static scenes, use `<Canvas frameloop="demand">` to prevent the 60fps render loop, saving significant GPU resources. Re-renders will only happen when props change or an interaction (like camera movement) occurs.
- **Reuse Geometries and Materials**: Avoid creating geometries and materials inside component render functions. Define them once outside the component or memoize them with `useMemo` to prevent re-creation on every render.
- **Instancing**: For rendering many identical objects, use `InstancedMesh` to render them all in a single draw call.
- **Asset Optimization**: Use `gltfjsx` to convert GLTF models into compressed JSX components, which drastically reduces file sizes.

### State and Animations

- **Use `useFrame` for Animations**: For high-frequency updates like animations, get a `ref` to the object and mutate its properties directly inside the `useFrame` hook. This bypasses React's render cycle and is highly performant. **Do not** use `useState` for state that changes every frame.
- **Separate State Concerns**: Use a dedicated state management library like `zustand` for low-frequency "app state" (e.g., UI visibility, selected model) and use `useFrame` for high-frequency "animation state".

## `zustand` Best Practices

`zustand` is a minimalistic state management library. Its simplicity requires adherence to a few core principles to maximize performance.

### Core Principles

- **Small, Focused Stores**: Instead of a single monolithic store, create multiple smaller stores for different concerns (e.g., `useLayoutStore`, `useUISettingsStore`). This improves modularity and makes the app easier to reason about.
- **Atomic Selectors**: Components should only subscribe to the smallest possible slice of state they need. This prevents unnecessary re-renders.

    - **DO**: `const bears = useStore(state => state.bears);`
    - **DON'T**: `const state = useStore(state => state);`

- **Use `useShallow` for Multiple Properties**: If a component needs multiple properties from a store, use the `shallow` equality checker to prevent re-renders when other parts of the state change.

    ```javascript
    import { shallow } from 'zustand/shallow'
    const { todos, isSubscribed } = useStore(
      (state) => ({ todos: state.todos, isSubsecreted: state.isSubscribed }),
      shallow
    );
    ```

### State and Actions

- **Separate State from Actions**: Keep state and the actions that modify it co-located in the store, but defined separately. This improves organization.
- **Business Logic in Actions**: Encapsulate state-related business logic within the store's actions rather than in components. This makes components cleaner and logic more reusable and testable.
- **Export Custom Hooks**: Avoid exporting the main `useStore` hook. Instead, export custom selector hooks (e.g., `export const useBears = () => useBearStore(state => state.bears);`). This enforces the use of atomic selectors.

### Middleware

- **`devtools`**: Integrates with Redux DevTools for easier debugging.
- **`persist`**: For persisting state to `localStorage` or `sessionStorage`.
- **`immer`**: Simplifies immutable updates, especially for complex, nested state.