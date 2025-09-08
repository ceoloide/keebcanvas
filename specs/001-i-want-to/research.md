# Research Findings for Visual Keyboard Layout Builder

This document summarizes the research for building the visual keyboard layout builder.

## Phase 0: Outline & Research

### 1. Ergogen Core YAML Structure

Based on the web search, the core of Ergogen's configuration is the YAML file structure. Here are the key takeaways:

*   **`points` (Required)**: This is the most important section. It defines the position and rotation of each key.
    *   Keys are organized into `zones`, which contain `columns` and `rows`.
    *   Properties like `stagger`, `spread`, and `splay` control the key arrangement.
    *   Each point is ultimately defined by `[x, y]` coordinates and a rotation.

*   **`outlines` (Optional)**: This section uses the `points` to generate 2D outlines for the case and plate. This is useful for creating the visual representation of the keyboard.

*   **`cases` (Optional)**: This section extrudes the 2D `outlines` to create 3D models.

*   **`pcbs` (Optional)**: This section generates PCB files for the keyboard.

*   **`units` (Optional)**: Allows defining reusable variables to reduce repetition.

*   **`meta` (Optional)**: Contains metadata about the keyboard, like the author and name.

*   **File Format**: While YAML is the most common, JSON and JavaScript are also supported.

*   **Structure**: The configuration uses nested keys (e.g., `points.zones.matrix.key`) and supports inheritance with `$extends` to reduce redundancy.

This information is sufficient to start designing the data model for our application. The next research tasks will build on this foundation.

### 2. Data Mapping from UI to YAML

Mapping an interactive UI state to a declarative YAML structure requires a clear strategy. The following best practices will be adopted:

*   **Separation of Concerns**:
    *   **UI State (The "What")**: The application's state, managed by Zustand, will be a direct representation of the Ergogen data structure. This ensures that the state is always serializable to a valid Ergogen YAML file.
    *   **Application Logic (The "How")**: React components will be responsible for rendering the UI based on the state and dispatching actions to modify the state. The logic for generating the YAML file will be encapsulated within a dedicated module.

*   **Hierarchical Structure**:
    *   The UI will be composed of components that mirror the hierarchical nature of the Ergogen data model (e.g., `zones`, `points`, `keys`).
    *   This component-based approach will make the UI easier to manage and reason about.

*   **Declarative State Management**:
    *   The Zustand store will hold the entire keyboard layout state.
    *   UI components will subscribe to the store and automatically re-render when the state changes.
    *   The initial state can be loaded from a template or a user-provided file.

*   **Event Handling**:
    *   User interactions (e.g., dragging a key, changing a property) will trigger actions that update the Zustand store.
    *   These actions will be defined in the store and will be the only way to modify the state, ensuring a unidirectional data flow.

*   **YAML Serialization**:
    *   The `js-yaml` library will be used to serialize the Zustand store's state into a YAML string.
    *   A dedicated function will be responsible for this conversion, ensuring that the output is a valid Ergogen configuration.

### 3. Client-Side YAML Generation and Download

The `js-yaml` library is well-suited for this task. The process for generating and downloading the YAML file will be as follows:

1.  **Define Data**: The data to be converted to YAML will be the application's state, which is a JavaScript object.
2.  **Convert to YAML**: The `jsyaml.dump()` method will be used to serialize the JavaScript object into a YAML string.
3.  **Create a Blob**: A `Blob` object will be created from the YAML string with the MIME type `text/yaml`.
4.  **Create Download Link**: `URL.createObjectURL()` will be used to generate a temporary URL for the `Blob`.
5.  **Trigger Download**: A temporary anchor (`<a>`) element will be created with its `href` set to the Blob's URL and the `download` attribute set to the desired filename (e.g., `layout.yaml`). The anchor's `click()` method will be called to trigger the download.
6.  **Cleanup**: The temporary anchor element and the URL will be removed after the download is triggered.

### 4. Zustand State Management for Serialization

For the application state to be cleanly serializable to YAML, the Zustand store must be managed carefully. The following best practices will be followed:

*   **Serializable State**: The state will consist of only plain JavaScript objects, arrays, and primitives. No functions, Promises, `Map`, `Set`, or class instances will be stored in the state.

*   **Separation of Concerns**: 
    *   **State**: The store will hold the data representing the keyboard layout.
    *   **Actions**: The store will also define actions that modify the state. These actions will be functions outside of the state object itself, ensuring that the state remains purely data.

*   **Derived State**: To keep the state minimal, derived data will be computed on the fly using selectors rather than being stored in the state. For example, the final Ergogen YAML output will be generated from the state when needed, not stored in the state itself.

*   **Persistence (Future)**: While not part of the MVP, following these practices will allow for easy integration of persistence middleware like `zustand/middleware/persist` in the future. The `partialize` option can be used to select only the serializable parts of the state for persistence.

### 5. 3D Performance Optimization for @react-three/fiber

To ensure a smooth user experience, especially during 3D view manipulation, the following performance optimization techniques will be considered:

*   **Reduce Draw Calls**:
    *   **Instancing**: For rendering the keycaps, `InstancedMesh` will be used. This will allow all keycaps to be rendered in a single draw call.
    *   **Merging Geometries**: The keyboard case and plate will be static, so their geometries can be merged to reduce draw calls.

*   **Optimize Assets**:
    *   **Reuse Geometries and Materials**: Geometries and materials for the keycaps and other components will be created once and reused.
    *   **Asset Compression**: 3D models will be compressed using `gltfjsx`.

*   **Efficient Rendering**:
    *   **On-Demand Rendering**: The `frameloop` prop of the `<Canvas>` will be set to `"demand"`. This will cause the scene to re-render only when the state changes, which is ideal for a UI-driven application.
    *   **Manual Frame Invalidation**: When direct manipulation of the 3D scene occurs (e.g., camera controls), the `invalidate` function from `useThree` will be called to trigger a re-render.

*   **Performance Monitoring**:
    *   The `r3f-perf` tool will be used during development to monitor performance and identify potential bottlenecks.

