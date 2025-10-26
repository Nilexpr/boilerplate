import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggable: boolean;
      droppable: boolean;
      sortable?: boolean;
    }
  }
}

// 这个 export 很重要，让 TypeScript 把这个文件当作模块
export {};
