import {
  createEffect,
  createSignal,
  Show,
  type ParentComponent,
} from "solid-js";
import { Portal } from "solid-js/web";
import { createDroppable } from "@thisbeyond/solid-dnd";

export const DropZone: ParentComponent = () => {
  let iframeRef: HTMLIFrameElement | undefined;
  const [loaded, setLoaded] = createSignal(false);
  const [mountTarget, setMountTarget] = createSignal<
    HTMLElement | undefined | null
  >(null);

  // 创建 droppable 区域
  const droppable = createDroppable("canvas-dropzone");

  return (
    <div class="bg-primary-foreground flex h-full flex-col p-2">
      <div
        use:droppable
        class="bg-background border-border relative flex-1 border shadow-xs"
        classList={{
          "ring-2 ring-primary": droppable.isActiveDroppable,
        }}
      >
        <iframe
          class="pointer-events-none h-full w-full border-none"
          ref={iframeRef}
          srcdoc='<!DOCTYPE html><html><head></head><body><div id="frame-root"></div></body></html>'
          onLoad={() => {
            setLoaded(true);
            setMountTarget(
              iframeRef?.contentDocument?.getElementById("frame-root"),
            );
            const style = document.querySelector("style");
            if (style) {
              iframeRef?.contentDocument?.head.appendChild(
                style.cloneNode(true),
              );
            }
          }}
        >
          <Show when={loaded()}>
            <Portal mount={mountTarget()!}>
              <div></div>
            </Portal>
          </Show>
        </iframe>
      </div>
    </div>
  );
};
