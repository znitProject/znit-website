declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    lerp?: number;
    [key: string]: any;
  }

  interface LocomotiveScrollInstance {
    scroll: {
      instance: {
        scroll: {
          y: number;
        };
      };
    };
    scrollTo: (target: string | number | HTMLElement, options?: object) => void;
    on: (event: string, callback: () => void) => void;
    destroy: () => void;
    update: () => void;
  }

  class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    scroll: LocomotiveScrollInstance['scroll'];
    scrollTo: LocomotiveScrollInstance['scrollTo'];
    on: LocomotiveScrollInstance['on'];
    destroy: LocomotiveScrollInstance['destroy'];
    update: LocomotiveScrollInstance['update'];
  }

  export default LocomotiveScroll;
} 