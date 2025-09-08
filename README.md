# Keeb Canvas

Keeb Canvas is a web application for visually building ergonomic mechanical keyboard layouts. The application serves as an interactive frontend for the **Ergogen** layout engine. Users can manipulate a visual representation of the keyboard, and the application state is synchronized with an Ergogen-compatible data structure. The primary technical goal is to provide an intuitive UI that generates a valid Ergogen YAML file for users to download and use with offline tooling.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
   npm run dev
   ```

## Features

- View a 2D representation of a keyboard layout.
- Select, nudge, and rotate keys.
- Edit key properties.
- View a 3D preview of the keyboard.
- Download the layout as an Ergogen-compatible YAML file.

## Tech Stack

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [three.js](https://threejs.org/)
* [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
* [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
* [js-yaml](https://github.com/nodeca/js-yaml)
* [Tailwind CSS](https://tailwindcss.com/)
