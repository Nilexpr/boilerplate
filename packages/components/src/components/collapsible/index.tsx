import * as collapsible from "@zag-js/collapsible";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId } from "solid-js";

const CollapsibleRoot = () => {
  return <div>123</div>;
};

const CollapsibleTrigger = () => {
  return <div>234</div>;
};

const CollapsibleContent = () => {
  return <div>345</div>;
};

export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
