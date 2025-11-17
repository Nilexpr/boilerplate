import { Context, Effect, Layer, Option, SubscriptionRef } from "effect";

// 提取 Node 的类型
export type NodeData = {
  id: string;
  type: string;
  componentName: string;
  props: Record<string, string>;
  children?: NodeData[];
};

// ProjectDeserialized 的类型
export type ProjectData = {
  id: string;
  name: string;
  content: NodeData[];
};

export type BuilderStoreShape = {
  /** 项目状态 */
  state: SubscriptionRef.SubscriptionRef<ProjectData>;

  /** 获取当前项目 */
  readonly getProject: () => Effect.Effect<ProjectData>;

  /** 更新项目名称 */
  readonly updateProjectName: (name: string) => Effect.Effect<ProjectData>;

  /** 根据 ID 查找节点 */
  readonly findNode: (nodeId: string) => Effect.Effect<Option.Option<NodeData>>;

  /** 更新节点（修改） */
  readonly updateNode: (
    nodeId: string,
    updater: (node: NodeData) => NodeData,
  ) => Effect.Effect<ProjectData>;

  /** 删除节点 */
  readonly deleteNode: (nodeId: string) => Effect.Effect<ProjectData>;

  /** 给节点添加子节点 */
  readonly addChildNode: (
    parentId: string,
    child: NodeData,
  ) => Effect.Effect<ProjectData>;

  /** 在根级别添加节点 */
  readonly addRootNode: (node: NodeData) => Effect.Effect<ProjectData>;
};

export class BuilderStore extends Context.Tag("BuilderStore")<
  BuilderStore,
  BuilderStoreShape
>() {
  static readonly Live = Layer.effect(
    this,
    Effect.gen(function* () {
      // 初始化空项目
      const initialProject: ProjectData = {
        id: crypto.randomUUID(),
        name: "Untitled Project",
        content: [],
      };

      const state = yield* SubscriptionRef.make(initialProject);

      // 递归查找节点的辅助函数
      const findNodeInTree = (
        nodes: NodeData[],
        nodeId: string,
      ): Option.Option<NodeData> => {
        for (const node of nodes) {
          if (node.id === nodeId) {
            return Option.some(node);
          }
          // 递归查找子节点
          if (node.children && node.children.length > 0) {
            const found = findNodeInTree(node.children, nodeId);
            if (Option.isSome(found)) {
              return found;
            }
          }
        }
        return Option.none();
      };

      // 递归更新节点的辅助函数
      const updateNodeInTree = (
        nodes: NodeData[],
        nodeId: string,
        updater: (node: NodeData) => NodeData,
      ): NodeData[] => {
        return nodes.map((node) => {
          if (node.id === nodeId) {
            return updater(node);
          }
          // 递归更新子节点
          if (node.children && node.children.length > 0) {
            return {
              ...node,
              children: updateNodeInTree(node.children, nodeId, updater),
            };
          }
          return node;
        });
      };

      // 递归删除节点的辅助函数
      const deleteNodeInTree = (
        nodes: NodeData[],
        nodeId: string,
      ): NodeData[] => {
        return nodes
          .filter((node) => node.id !== nodeId)
          .map((node) => {
            // 递归删除子节点中的目标
            if (node.children && node.children.length > 0) {
              return {
                ...node,
                children: deleteNodeInTree(node.children, nodeId),
              };
            }
            return node;
          });
      };

      // 递归添加子节点的辅助函数
      const addChildToNodeInTree = (
        nodes: NodeData[],
        parentId: string,
        child: NodeData,
      ): NodeData[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            // 找到父节点，添加子节点
            return {
              ...node,
              children: [...(node.children || []), child],
            };
          }
          // 递归查找父节点
          if (node.children && node.children.length > 0) {
            return {
              ...node,
              children: addChildToNodeInTree(node.children, parentId, child),
            };
          }
          return node;
        });
      };

      return {
        state,

        getProject: () => {
          return SubscriptionRef.get(state);
        },

        updateProjectName: (name: string) => {
          return SubscriptionRef.updateAndGet(state, (project) => ({
            ...project,
            name,
          }));
        },

        findNode: (nodeId: string) => {
          return Effect.gen(function* () {
            const project = yield* SubscriptionRef.get(state);
            return findNodeInTree(project.content, nodeId);
          });
        },

        updateNode: (nodeId: string, updater: (node: NodeData) => NodeData) => {
          return SubscriptionRef.updateAndGet(state, (project) => ({
            ...project,
            content: updateNodeInTree(project.content, nodeId, updater),
          }));
        },

        deleteNode: (nodeId: string) => {
          return SubscriptionRef.updateAndGet(state, (project) => ({
            ...project,
            content: deleteNodeInTree(project.content, nodeId),
          }));
        },

        addChildNode: (parentId: string, child: NodeData) => {
          return SubscriptionRef.updateAndGet(state, (project) => ({
            ...project,
            content: addChildToNodeInTree(project.content, parentId, child),
          }));
        },

        addRootNode: (node: NodeData) => {
          return SubscriptionRef.updateAndGet(state, (project) => ({
            ...project,
            content: [...project.content, node],
          }));
        },
      } satisfies BuilderStoreShape;
    }),
  );
}
