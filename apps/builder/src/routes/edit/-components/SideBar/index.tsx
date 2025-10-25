import { type ParentComponent } from "solid-js";

export const SideBar: ParentComponent<{
  title?: string;
}> = (props) => {
  return (
    <div class="bg-muted/50 overflow-hidden border transition-all duration-300 ease-in-out">
      <h2>{props.title ?? "SideBar"}</h2>
      <aside>
        <div class="flex h-full flex-col gap-1">{props.children}</div>
      </aside>
    </div>
  );
};
