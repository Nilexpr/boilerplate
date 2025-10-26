import { Effect, Schema } from "effect";
import { Project } from "../schemas/project";

export const loadProject = () => {
  return Effect.gen(function* () {
    const project = yield* Effect.tryPromise({
      try: () => {
        const project = Schema.decodeUnknownSync(Project)(
          JSON.parse(localStorage.getItem("project") || "{}"),
        );
      },
      catch: (error) => {
        console.error(error);
        return null;
      },
    });
    return project;
  });
};
