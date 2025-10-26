import type { Component } from "solid-js";
import type { Field } from "./fields";

export type BuilderContext = {
  isEditing: boolean;
  editMode?: boolean;
};

export interface BuildableComponent<Props extends Record<string, any>>
  extends Component<
    Props & {
      ctx: BuilderContext;
    }
  > {}

export interface ComponentConfig<RenderProps extends Record<string, any>> {
  type: string;

  componentName: string;

  defaultProps: Record<string, any>;

  fields: Record<string, Field>;

  render: BuildableComponent<RenderProps>;
}
