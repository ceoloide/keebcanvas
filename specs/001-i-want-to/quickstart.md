# Quickstart Guide

**Date**: 2025-09-08

This guide provides a step-by-step walkthrough of the core features, based on the user stories and acceptance criteria in the feature specification.

## 1. Create a new Split Keyboard Layout

1.  Load the application.
2.  You are presented with three options: "Split Keyboard", "Unibody", and "Custom".
3.  Click on **"Split Keyboard"**.
4.  You are presented with a list of layout options. Select **"Corne (crkbd)"**.
5.  The application displays a default Corne layout, with two symmetrical halves.
6.  The layout view is now visible, with each key represented as a selectable rectangle.

## 2. Manipulate Keys and Zones

1.  In the layout view, click on a single key to select it.
2.  Use the properties editor to find the "nudge right" control and click it.
3.  **Verification**: The selected key should move to the right in the layout view.
4.  Click on a group of keys to select a "zone" (e.g., the thumb cluster).
5.  Use the properties editor to find the rotation control.
6.  **Verification**: The entire zone should rotate around its central point.

## 3. Handling Edge Cases

### Key Overlap

1.  Select a key.
2.  Use the "nudge" controls to move it until it overlaps with an adjacent key.
3.  **Verification**: The overlapping keys are flagged with a visual warning (e.g., a red outline).

### Key Count Limits

1.  This is a passive verification. As you add keys to the layout, if the count exceeds the defined limits (60 for a split half, 120 for a monoblock), a warning should be displayed.