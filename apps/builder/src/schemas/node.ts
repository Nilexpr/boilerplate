import { Schema } from "effect";

// 定义递归的 Node 类型
export class Node extends Schema.Class<Node>("Node")({
  id: Schema.String,

  type: Schema.String,
  componentName: Schema.String,

  props: Schema.Record({
    key: Schema.String,
    value: Schema.String,
  }),

  // 支持嵌套子节点
  children: Schema.optional(Schema.Array(Schema.suspend(() => Node))),
}) {}
