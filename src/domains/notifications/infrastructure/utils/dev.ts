export const isDev = () => {
  try {
    return typeof __DEV__ !== 'undefined' && __DEV__;
  } catch {
    return false;
  }
};

export const devLog = (_message: string, ..._args: unknown[]) => {
  if (isDev()) {
  }
};

export const devError = (_message: string, ..._args: unknown[]) => {
  if (isDev()) {
  }
};

export const devWarn = (_message: string, ..._args: unknown[]) => {
  if (isDev()) {
  }
};