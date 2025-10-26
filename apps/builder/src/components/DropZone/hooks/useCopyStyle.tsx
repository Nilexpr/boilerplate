import { onMount } from "solid-js";

export const useCopyStyle = (props: {
  document?: Document;
  window?: Window;
}) => {
  onMount(() => {
    const style = document.querySelector("style");
    if (style) {
      props.document?.head.appendChild(style.cloneNode(true));
    }
  });
};
