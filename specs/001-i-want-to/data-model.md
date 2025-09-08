# Data Model

**Date**: 2025-09-08

This document defines the core data entities for the keyboard layout builder, based on the feature specification.

## Entities

### `KeyboardLayout`

Represents the entire keyboard design.

| Property | Type | Description |
|---|---|---|
| `type` | `"split"` or `"monoblock"` | The type of keyboard layout. |
| `zones` | `KeyZone[]` | A collection of key zones that make up the layout. |

### `KeyZone`

A group of keys, which can be a logical grouping like a thumb cluster or a main key matrix.

| Property | Type | Description |
|---|---|---|
| `id` | `string` | A unique identifier for the zone. |
| `name` | `string` | A user-friendly name for the zone (e.g., "Left Thumb Cluster"). |
| `keys` | `Key[]` | The keys belonging to this zone. |

### `Key`

Represents a single key on the keyboard.

| Property | Type | Description |
|---|---|---|
| `id` | `string` | A unique identifier for the key. |
| `x` | `number` | The x-coordinate of the key's center point. |
| `y` | `number` | The y-coordinate of the key's center point. |
| `rotation` | `number` | The rotation of the key in degrees. |
| `switch` | `Switch` | The switch type for this key. |

### `Switch`

Represents the type of mechanical switch, which determines the physical dimensions of the key.

| Property | Type | Description |
|---|---|---|
| `name` | `string` | The name of the switch (e.g., "Choc v2"). |
| `footprint` | `{ width: number; height: number; }` | The physical dimensions of the switch. |

### `GlobalSettings`

Represents user-configurable settings that affect the entire layout.

| Property | Type | Description |
|---|---|---|
| `unit` | `"mm"` or `"U"` | The preferred display unit for measurements. |
| `uValue` | `number` | The value of `1U` in millimeters (e.g., 19.05). |