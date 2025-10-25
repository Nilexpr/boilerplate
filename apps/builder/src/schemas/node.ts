import { Schema } from "effect";

export class Node extends Schema.Class<Node>("Node")({
  id: Schema.String,
  name: Schema.String,
  componentName: Schema.String,
  props: Schema.Record({
    key: Schema.String,
    value: Schema.String,
  }),
}) {}
