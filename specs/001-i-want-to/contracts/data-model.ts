export interface KeebLayout {
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

export interface KeyCommon {
  stagger?: number;
  spread?: number;
  splay?: number;
  rotate?: number;
  shift?: [number, number];
  // and other ergogen properties
}

export interface Key extends KeyCommon {
  // Individual key properties, can override zone properties
}

export interface Zone extends KeyCommon {
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

export interface Outline {
  type: 'line' | 'arc' | 'polygon';
  // other properties depending on the type
}

export interface Case {
  // Properties of a case, e.g., height, wall thickness
}

export interface PCB {
  // Properties of a PCB, e.g., controller, diodes
}
