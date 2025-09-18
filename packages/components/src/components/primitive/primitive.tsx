import { mergeProps } from "@zag-js/solid";
import { JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

const NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul",
] as const;

type ElementType = keyof JSX.IntrinsicElements;

type ParentProps<T extends ElementType> = (
  userProps?: JSX.IntrinsicElements[T]
) => JSX.HTMLAttributes<any>;

export type PolymorphicProps<T extends ElementType> = {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   */
  asChild?: (props: ParentProps<T>) => JSX.Element;
};

type PrimitiveComponent<E extends ElementType> = (
  props: JSX.IntrinsicElements[E] & PolymorphicProps<E>
) => JSX.Element;

type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveComponent<E>;
};

/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/

export const Primitive = NODES.reduce((primitive, node) => {
  const Component: PrimitiveComponent<typeof node> = (props) => {
    const [localProps, parentProps] = splitProps(props, ["asChild"]);

    if (localProps.asChild) {
      const propsFn = (userProps) => {
        const [, restProps] = splitProps(parentProps, ["ref"]);
        return mergeProps(restProps, userProps);
      };
      return localProps.asChild(propsFn);
    }
    return <Dynamic component={node} {...parentProps} />;
  };

  return {
    ...primitive,
    [node]: Component,
  };
}, {} as Primitives);
