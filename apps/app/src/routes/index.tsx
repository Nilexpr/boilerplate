import { createFileRoute } from "@tanstack/solid-router";
import { onMount } from "solid-js";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

const longTask = () => {
  clickTask();
  const container = document.getElementById("container");
  for (let i = 0; i < 100000; i++) {
    const span = document.createElement("span");
    span.textContent = `1`;
    container?.appendChild(span);
  }
};

const performWorkUnit = (container: HTMLElement | null) => {
  const span = document.createElement("span");
  span.textContent = `1`;
  container?.appendChild(span);
};

const taskQueue = Array.from({ length: 100000 }, () => performWorkUnit);

const clickTask = () => {
  const container = document.getElementById("container");
  if (container) {
    container.innerHTML = "";
  }
};

function IndexComponent() {
  const workLoop = () => {
    const container = document.getElementById("container");
    requestIdleCallback(
      (deadline) => {
        let task;
        while (
          (task = taskQueue.pop()) &&
          !deadline.didTimeout &&
          deadline.timeRemaining() > 0
        ) {
          performWorkUnit(container);
        }
        task?.(container);
        workLoop();
      },
      {
        timeout: 1000,
      },
    );
  };
  return (
    <div class="m-4 flex flex-col gap-2 border border-red-500 text-center">
      <button onclick={longTask}>Click me to execute the long task</button>
      <button onclick={workLoop}>Click me to execute the task queue</button>
      <div id="container" class="flex flex-wrap"></div>

      <div></div>
    </div>
  );
}
