import { Schema } from "effect";

export class ComponentMap extends Schema.Class<ComponentMap>("ComponentMap")({
  packageName: Schema.String,
  version: Schema.String.pipe(Schema.pattern(/^\d+\.\d+\.\d+$/)),
  main: Schema.String,
  componentName: Schema.String,
}) {}
