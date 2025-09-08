import { Accessor } from "solid-js";

export type PresenceProps = {
  /** Should the component be returned from render? */
  isMounted: Accessor<boolean>;
  /** Should the component have its visible styles applied? */
  isVisible: Accessor<boolean>;
  /** Is the component either entering or exiting currently? */
  isAnimating: Accessor<boolean>;
  /** Is the component entering currently? */
  isEntering: Accessor<boolean>;
  /** Is the component exiting currently? */
  isExiting: Accessor<boolean>;
};

export const createPresence = (present: Accessor<boolean>) => {
  return {
    isAnimating,
    isEntering,
    isExiting,
  };
};
