import { createFileRoute } from "@tanstack/solid-router";
import { type ParentComponent, Show } from "solid-js";
import { SideBar } from "./-components/SideBar";
import { Header } from "./-components/Header";
import { Layout } from "./-components/Layout";
import { Comp } from "./-components/Comp";
import { DropZone } from "../../components/DropZone";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";

const Editor: ParentComponent = () => {
  const handleDragEnd = (event: any) => {
    console.log("Drag ended:", event);

    // 检查是否放置到了 canvas-dropzone
    if (event.droppable?.id === "canvas-dropzone") {
      const componentType = event.draggable.data.type;
      console.log(`Component ${componentType} dropped on canvas!`);

      // TODO: 在这里添加组件到画布的逻辑
      // 例如：添加到状态、渲染到 iframe 内部等
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <DragDropSensors />
      <div>
        <Layout
          header={<Header />}
          leftSideBar={
            <SideBar>
              <Comp />
            </SideBar>
          }
          main={<DropZone />}
          rightSideBar={<SideBar />}
        ></Layout>
      </div>
      <DragOverlay>
        <DragOverlayContent />
      </DragOverlay>
    </DragDropProvider>
  );
};

const DragOverlayContent = () => {
  const context = useDragDropContext();

  if (!context) return null;

  const [state] = context;

  return (
    <Show when={state.active.draggable}>
      <div class="bg-primary text-primary-foreground m-2 max-w-32 cursor-grabbing rounded-md p-2 opacity-90 shadow-lg">
        {state.active.draggable?.data.type}
      </div>
    </Show>
  );
};

export const Route = createFileRoute("/edit/")({
  component: Editor,
  loader: () => {
    return {
      message: "Hello, world!",
    };
  },
});
