/// <reference types="react-native" />

declare global {
  const __DEV__: boolean;
}

export {};

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    testID?: string;
  }
}

export {};