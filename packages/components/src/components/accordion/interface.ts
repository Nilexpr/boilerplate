import { ItemProps, Props } from "@zag-js/accordion";
import { JSX, ValidComponent } from "solid-js";
import { PolymorphicProps } from "../../lib/polymorphic";

export type AccordionProps = {
  items: ({
    content: JSX.Element;
    trigger: JSX.Element;
  } & ItemProps)[];
} & Props;

// export type AccordionItemProps<T extends ValidComponent = "div"> =
//   PolymorphicProps<T, ItemProps>;
