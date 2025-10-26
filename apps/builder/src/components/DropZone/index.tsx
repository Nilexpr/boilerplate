import {
  createEffect,
  createSignal,
  Show,
  type Component,
  type ParentComponent,
} from "solid-js";
import { effect, Portal } from "solid-js/web";
import { useFrame } from "./hooks/useFrame";
import { useCopyStyle } from "./hooks/useCopyStyle";

export const DropZone: ParentComponent = () => {
  let iframeRef: HTMLIFrameElement | undefined;
  const [loaded, setLoaded] = createSignal(false);
  const { frame, setFrame } = useFrame();
  const [mountTarget, setMountTarget] = createSignal<
    HTMLElement | undefined | null
  >(null);

  const [code, setCode] = createSignal("");

  createEffect(() => {
    if (loaded()) {
      console.log("copying style");
      useCopyStyle({
        document: frame().document,
      });
    }
  });

  return (
    <div class="bg-primary-foreground p-2">
      <input type="text" onInput={(e) => setCode(e.target.value)} />
      <i class="bg-background border-border border shadow-xs">
        <iframe
          class="h-full min-h-0 w-full border-none"
          ref={iframeRef}
          srcdoc='<!DOCTYPE html><html><head></head><body><div id="frame-root"></div></body></html>'
          onLoad={() => {
            setLoaded(true);
            setMountTarget(
              iframeRef?.contentDocument?.getElementById("frame-root"),
            );
            setFrame({
              document: iframeRef?.contentDocument ?? undefined,
              window: iframeRef?.contentWindow ?? undefined,
            });
          }}
        >
          <Show when={loaded()}>
            <Portal mount={mountTarget()!}>
              <div>{code()}</div>
            </Portal>
          </Show>
        </iframe>
      </i>
    </div>
  );
};
