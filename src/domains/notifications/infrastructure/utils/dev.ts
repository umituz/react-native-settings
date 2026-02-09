export const isDev = () => {
  try {
    return typeof __DEV__ !== 'undefined' && __DEV__;
  } catch {
    return false;
  }
};

export const devLog = (message: string, ...args: unknown[]) => {
  if (isDev()) {
  }
};

export const devError = (message: string, ...args: unknown[]) => {
  if (isDev()) {
  }
};

export const devWarn = (message: string, ...args: unknown[]) => {
  if (isDev()) {
  }
};