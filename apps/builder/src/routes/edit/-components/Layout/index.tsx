import type { Component, JSXElement } from "solid-js";

export const Layout: Component<{
  header?: JSXElement;
  main?: JSXElement;
  leftSideBar?: JSXElement;
  rightSideBar?: JSXElement;
}> = (props) => {
  return (
    <section class="grid grid-cols-3 grid-rows-2">
      <header class="col-span-3 row-span-1">{props.header}</header>
      <aside class="col-span-1 row-span-2">{props.leftSideBar}</aside>
      <main class="col-span-1 row-span-2">{props.main}</main>
      <aside class="col-span-1 row-span-2">{props.rightSideBar}</aside>
    </section>
  );
};
