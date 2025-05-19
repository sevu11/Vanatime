// src/shims-vue.d.ts - TypeScript declarations for Vue files

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
