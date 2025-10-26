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
  return (
    <DragDropProvider
      onDragEnd={(e) => {
        console.log(e);
      }}
      onDragMove={(e) => {
        console.log(e);
      }}
    >
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
