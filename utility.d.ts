/// <reference types='codeceptjs' />
type utility = typeof import("./utility.js");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<utility> {}
  namespace Translation {
    interface Actions {}
  }
}
