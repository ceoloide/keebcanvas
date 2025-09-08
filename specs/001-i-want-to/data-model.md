# Data Model for Visual Keyboard Layout Builder

This document defines the TypeScript data structures that will be used to represent the keyboard layout in the application. These structures are designed to be compatible with Ergogen's YAML format.

## Core Data Structures

The entire keyboard layout can be represented by the `KeebLayout` interface.

```typescript
interface KeebLayout {
  meta?: {
    name?: string;
    author?: string;
  };
  units?: {
    [unitName: string]: any;
  };
  points: {
    zones: {
      [zoneName: string]: Zone;
    };
  };
  outlines?: {
    [outlineName: string]: Outline;
  };
  cases?: {
    [caseName: string]: Case;
  };
  pcbs?: {
    [pcbName: string]: PCB;
  };
}

## Points and Keys

The `points` section is the most critical part of the layout. It defines the position, rotation, and other properties of each key. The `keys` are defined within the `points` section.

```typescript
interface KeyCommon {
  stagger?: number;
  spread?: number;
  splay?: number;
  rotate?: number;
  shift?: [number, number];
  // and other ergogen properties
}

interface Key extends KeyCommon {
  // Individual key properties, can override zone properties
}

interface Zone extends KeyCommon {
  rows?: {
    [rowName: string]: KeyCommon;
  };
  columns?: {
    [columnName: string]: KeyCommon;
  };
  keys: {
    [keyName: string]: Key;
  };
}
```

## Outlines

The `outlines` section defines the shape of the keyboard case and plate.

```typescript
interface Outline {
  type: 'line' | 'arc' | 'polygon';
  // other properties depending on the type
}
```

```

## Points

The `points` section is the core of the layout. It defines the position of each key.

```typescript
interface Point {
  x: number;
  y: number;
  r: number; // Rotation
}

interface Key {
  // Properties of a key, e.g., size, type
}

interface Zone {
  points: Point[];
  keys: Key[];
}
```

## Outlines

The `outlines` section defines the shape of the keyboard case and plate.

```typescript
interface Outline {
  // Properties of an outline, e.g., path, thickness
}
```

## Cases

The `cases` section defines the 3D printable case.

```typescript
interface Case {
  // Properties of a case, e.g., height, wall thickness
}
```

## PCBs

The `pcbs` section defines the printed circuit board.

```typescript
interface PCB {
  // Properties of a PCB, e.g., controller, diodes
}
```
