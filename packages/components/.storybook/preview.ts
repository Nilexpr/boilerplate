import type { Preview } from "storybook-solidjs-vite";
import "../src/tailwind.css"; // replace with the name of your tailwind css file

console.log("preview in ", window);

// if (typeof window !== "undefined") {
//   // TODO 研究一下这里消息怎么传的
//   window.addEventListener("message", (e) => {
//     const d = e.data;
//     console.log("[preview][postMessage]", d, e);
//   });
// }

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    // automatically create action args for all props that start with "on"
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      codePanel: true,
    },
  },
};

export default preview;
