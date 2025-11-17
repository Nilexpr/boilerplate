/**
 * BuilderStore 使用示例
 *
 * 这个文件展示了如何使用 BuilderStore 来管理项目状态
 */

import { Effect } from "effect";
import { BuilderStore, type NodeData } from "./store";

// 示例：完整的使用流程
export const BuilderStoreExample = Effect.gen(function* () {
  // 1. 获取 BuilderStore 实例
  const store = yield* BuilderStore;

  // 2. 获取当前项目
  const project = yield* store.getProject();
  console.log("Current project:", project);

  // 3. 更新项目名称
  yield* store.updateProjectName("My Awesome Project");

  // 4. 创建一个新节点
  const newNode: NodeData = {
    id: crypto.randomUUID(),
    type: "button",
    componentName: "Button",
    props: {
      label: "Click me",
      variant: "primary",
    },
  };

  // 5. 添加到根级别
  yield* store.addRootNode(newNode);

  // 6. 创建一个容器节点
  const containerNode: NodeData = {
    id: crypto.randomUUID(),
    type: "flex",
    componentName: "Flex",
    props: {
      direction: "column",
      gap: "16",
    },
    children: [], // 空的 children 数组
  };

  yield* store.addRootNode(containerNode);

  // 7. 给容器添加子节点
  const childNode: NodeData = {
    id: crypto.randomUUID(),
    type: "text",
    componentName: "Text",
    props: {
      content: "Hello World",
    },
  };

  yield* store.addChildNode(containerNode.id, childNode);

  // 8. 查找节点
  const foundNode = yield* store.findNode(childNode.id);
  console.log("Found node:", foundNode);

  // 9. 更新节点
  yield* store.updateNode(childNode.id, (node) => ({
    ...node,
    props: {
      ...node.props,
      content: "Updated content",
    },
  }));

  // 10. 删除节点
  // yield* store.deleteNode(childNode.id);

  // 11. 获取最终状态
  const finalProject = yield* store.getProject();
  console.log("Final project:", finalProject);

  return finalProject;
});

// 示例：在 SolidJS 组件中使用
export const exampleSolidJSUsage = `
import { createSignal, onMount, onCleanup } from "solid-js";
import { Effect, Stream } from "effect";
import { BuilderStore, type ProjectData } from "../services/store";
import { RuntimeClient } from "../services/runtimeClient";

export function useBuilderStore() {
  const [project, setProject] = createSignal<ProjectData | null>(null);

  onMount(() => {
    const program = Effect.gen(function* () {
      const store = yield* BuilderStore;

      // 订阅状态变化
      const changesStream = store.state.changes;

      yield* Stream.runForEach(changesStream, (projectData) => {
        setProject(projectData);
        return Effect.succeed(true);
      });
    });

    const runningFiber = RuntimeClient.runFork(program);

    onCleanup(() => {
      Fiber.interruptFork(runningFiber);
    });
  });

  // 提供便捷方法
  const addNode = (node: NodeData) => {
    const program = Effect.gen(function* () {
      const store = yield* BuilderStore;
      yield* store.addRootNode(node);
    });

    RuntimeClient.runPromise(program);
  };

  const updateNode = (nodeId: string, updater: (node: NodeData) => NodeData) => {
    const program = Effect.gen(function* () {
      const store = yield* BuilderStore;
      yield* store.updateNode(nodeId, updater);
    });

    RuntimeClient.runPromise(program);
  };

  const deleteNode = (nodeId: string) => {
    const program = Effect.gen(function* () {
      const store = yield* BuilderStore;
      yield* store.deleteNode(nodeId);
    });

    RuntimeClient.runPromise(program);
  };

  return {
    project,
    addNode,
    updateNode,
    deleteNode,
  };
}
`;

// 示例：树形结构
export const treeExample: NodeData = {
  id: "root",
  type: "container",
  componentName: "Container",
  props: {
    padding: "24",
  },
  children: [
    {
      id: "header",
      type: "flex",
      componentName: "Flex",
      props: {
        direction: "row",
        justifyContent: "space-between",
      },
      children: [
        {
          id: "logo",
          type: "image",
          componentName: "Image",
          props: {
            src: "/logo.png",
            alt: "Logo",
          },
        },
        {
          id: "nav",
          type: "flex",
          componentName: "Flex",
          props: {
            direction: "row",
            gap: "16",
          },
          children: [
            {
              id: "home-link",
              type: "link",
              componentName: "Link",
              props: {
                href: "/",
                text: "Home",
              },
            },
            {
              id: "about-link",
              type: "link",
              componentName: "Link",
              props: {
                href: "/about",
                text: "About",
              },
            },
          ],
        },
      ],
    },
    {
      id: "main",
      type: "flex",
      componentName: "Flex",
      props: {
        direction: "column",
        gap: "24",
      },
      children: [
        {
          id: "title",
          type: "heading",
          componentName: "Heading",
          props: {
            level: "1",
            text: "Welcome",
          },
        },
        {
          id: "content",
          type: "text",
          componentName: "Text",
          props: {
            content: "This is the main content",
          },
        },
      ],
    },
  ],
};
