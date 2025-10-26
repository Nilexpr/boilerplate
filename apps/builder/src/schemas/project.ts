import { Effect, Schema } from "effect";
import { Node } from "./node";

class ProjectSerialized extends Schema.Class<ProjectSerialized>(
  "ProjectSerialized",
)({
  id: Schema.String,

  name: Schema.String,

  content: Schema.Array(Node),
}) {}

class ProjectDeserialized extends Schema.Class<ProjectDeserialized>(
  "ProjectDeserialized",
)({
  id: Schema.String,

  name: Schema.String,

  content: Schema.Array(Node),
}) {}

export const Project = Schema.transformOrFail(
  ProjectDeserialized,
  ProjectSerialized,
  {
    decode: (value) => {
      return Effect.succeed(value);
    },
    encode: (value) => {
      return Effect.succeed(value);
    },
  },
);
