import { Schema } from "effect";
import { Node } from "./node";
import { ComponentMap } from "./map";

export class Project extends Schema.Class<Project>("Project")({
  id: Schema.String,
  // version: Schema.String.pipe(Schema.pattern(/^\d+\.\d+\.\d+$/)),
  componentsMap: Schema.Record({
    key: Schema.String,
    value: ComponentMap,
  }),
  componentsTree: Node,
}) {}
