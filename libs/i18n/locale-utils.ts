export const localePathBuilder = (path: string[]): string => path.reduce((acc, curr) => `${acc}.${curr}`);

export const authLocalePathBuilder = (key: string): string => `${localePathBuilder(["auth"])}.${key}`;
