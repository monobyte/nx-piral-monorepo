// CSS Modules type declarations
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Extend the shell types for this pilet
declare module '@proj/shell' {
  export interface PiletApi {
    registerPage(route: string, component: React.ComponentType): void;
    registerMenu(component: React.ComponentType): void;
    registerTile(
      component: React.ComponentType,
      options?: { initialColumns?: number; initialRows?: number }
    ): void;
  }
}
