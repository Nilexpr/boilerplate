import { Layer, ManagedRuntime } from "effect";
import { ComponentStore } from "./component";

const MainLayer = Layer.mergeAll(ComponentStore.Live);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
