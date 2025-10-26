import { createStore } from "solid-js/store";
import type { Project } from "../schemas/project";

export const Store = createStore<{
  project: typeof Project;
}>({
  project: {},
});
