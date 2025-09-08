# Feature Specification: Visual Keyboard Layout Builder

**Feature Branch**: `001-i-want-to`  
**Created**: 2025-09-08  
**Status**: Draft  
**Input**: User description: "I want to build a web app that allows a user to visually and interactively build an ergonomic mechanical keyboard, i.e. a keyboard either "split" or "monoblock" with ortholinear key stagger. The web app acts as a wizard or offers guided creation, offering common starting points for defaults, while letting users fully customize their layout. The user can switch from layout definition to visualizing the PCB and a 3D preview of the assembled case with switches and keycaps. I want you to take strong inspiration from Cosmos (https://github.com/rianadon/Cosmos-Keyboards), which offers an intuitive experience and a great 3D preview that is interactive. I want the user to define "zones", i.e. groups of keys organized in rows and columns, or in the limit case of a single key. The user can start from either a "split" or "monoblock", then a known and common layout (e.g. Corne 6 columns, Corne 5 columns, Lily58) or manually define the number of rows and columns for the main matrix, and rows and columns for the thumb cluster. Once that is set the user then selects the type of switch they want to use, since that determines the physical constraints. For the MVP it's enough to allow a single switch type: Choc v2, since that's the one I personally prefer and use, but then we can offer support for regular MX and Choc v1. The user can alternate between "Layout" view, which is a top down view of the key layout. Here the user can select a key "zone" (aka group), a single column, a single row, and a single key. Once a selection is done, the GUI offers the ability to make changes to its properties. At a minimum it should offer the ability to "nudge" (move) the selection left/right and top/down, and rotate based on a center of rotation. The MVP should focus on the layout feature."

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
A user wants to design a custom ergonomic mechanical keyboard layout. They can start from scratch or use a popular template. They can arrange keys, group them, and make fine adjustments to their position and rotation. The user can see a live 3D preview of their design.

### Initial User Workflow

When the page is first loaded, the user is presented with three options to start their keyboard design:

1.  **Split Keyboard:** Start with a pre-defined split keyboard layout.
    *   When selected, the user is presented with a list of popular layouts.
    *   For the first iteration, the only option is "Corne (crkbd)".
    *   The "Corne (crkbd)" layout is pre-defined with 2 zones: a 6x3 matrix and a 3x1 thumbfan.
    *   It's assumed the halves are fully symmetrical.
    *   Once the selection is made, the page displays the layout view, where each key is visible as a rectangle and selectable.
2.  **Unibody:** (Dummy option for now) Start with a pre-defined unibody keyboard layout.
3.  **Custom:** (Dummy option for now) Start from a blank canvas to create a custom layout.

### Acceptance Scenarios
1. **Given** a user wants to create a new keyboard layout, **When** they select the "split" type and the "Corne" preset, **Then** the system should display a default Corne layout split into two halves.
2. **Given** a user has a layout open, **When** they select a single key and use the "nudge right" control, **Then** the key's position should update in the layout and the 3D preview.
3. **Given** a user is designing a layout, **When** they select a group of keys (a "zone"), **Then** they can rotate the entire zone around a central point.

### Edge Cases
    - **Key Overlap**: If a user's action causes keys to overlap, the system will allow the action to complete. It will then clearly flag the overlapping keys (e.g., with a red outline and a warning icon). The UI should inform the user that overlapping keys will likely make the keyboard impossible to fabricate.
    - **Key Count Limits**: The system will not enforce a hard limit on the number of keys for the MVP. Instead, it will provide warnings if the key count exceeds common microcontroller limits. This allows for user freedom while providing practical feedback for eventual fabrication. An absolute maximum may be defined in the future.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST allow users to choose between "split" and "monoblock" keyboard types.
- **FR-002**: System MUST provide a list of common layout presets (e.g., Corne, Lily58).
- **FR-003**: Users MUST be able to define custom layouts by specifying the number of rows and columns for the main matrix and thumb clusters.
- **FR-004**: Users MUST be able to group keys into "zones".
- **FR-005**: System MUST allow users to select a switch type, with "Choc v2" being the only option for the MVP.
- **FR-006**: System MUST provide a top-down "Layout" view of the keyboard.
- **FR-007**: Users MUST be able to select individual keys, rows, columns, and zones.
- **FR-008**: Users MUST be able to move ("nudge") selected components horizontally and vertically.
- **FR-009**: Users MUST be able to rotate selected components.
- **FR-010**: System MUST display a 3D preview of the keyboard, including switches and keycaps.
- **FR-011**: The user interface design SHOULD be inspired by the Cosmos Keyboard editor.
- **FR-012**: System MUST allow actions that result in overlapping keys but MUST clearly flag these keys with a visual warning.
- **FR-013**: The system MUST allow users to switch between and input measurements in both millimeters (`mm`) and units (`U`).
- **FR-014**: The system MUST provide a global settings area for advanced configuration.
- **FR-015**: Within global settings, users MUST be able to define the value of `1U` in millimeters to customize the grid unit size (e.g., 19.05mm vs 19mm).
- **FR-016**: System MUST issue a warning if the number of keys on a single half of a "split" layout exceeds 60.
- **FR-017**: System MUST issue a warning if the number of keys on a "monoblock" layout exceeds 120.

### Key Entities *(include if feature involves data)*
- **KeyboardLayout**: Represents the entire keyboard design. Contains properties like `type` ("split" or "monoblock") and a collection of `KeyZones`.
- **KeyZone**: A group of keys. Can be a single key, a row, a column, or a custom collection.
- **Key**: Represents a single key with properties for position (x, y), rotation, and switch type.
- **Switch**: Represents the type of mechanical switch, determining physical dimensions. Initially, only "Choc v2" is supported.
- **GlobalSettings**: Represents user-configurable settings, such as the definition of `1U` in `mm` and the preferred display unit.

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [X] No implementation details (languages, frameworks, APIs)
- [X] Focused on user value and business needs
- [X] Written for non-technical stakeholders
- [X] All mandatory sections completed

### Requirement Completeness
- [X] No [NEEDS CLARIFICATION] markers remain
- [X] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [X] Scope is clearly bounded
- [X] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [X] User description parsed
- [X] Key concepts extracted
- [ ] Ambiguities marked
- [X] User scenarios defined
- [X] Requirements generated
- [X] Entities identified
- [ ] Review checklist passed

---