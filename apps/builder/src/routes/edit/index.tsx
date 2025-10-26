import { createFileRoute } from "@tanstack/solid-router";
import { type ParentComponent } from "solid-js";
import { SideBar } from "./-components/SideBar";
import { Header } from "./-components/Header";
import { Layout } from "./-components/Layout";
import { Renderer } from "../../components/Renderer";
import { Comp } from "./-components/Comp";

const Editor: ParentComponent = (props) => {
  return (
    <div>
      <Layout
        header={<Header />}
        leftSideBar={
          <SideBar>
            <Comp />
          </SideBar>
        }
        main={<Renderer />}
        rightSideBar={<SideBar />}
      ></Layout>
    </div>
  );
};

export const Route = createFileRoute("/edit/")({
  component: Editor,
  loader: (props) => {
    // props.
    return {
      message: "Hello, world!",
    };
  },
});
