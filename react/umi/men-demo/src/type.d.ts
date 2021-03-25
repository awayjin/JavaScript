/** redux 相关 begin */
interface IAction<T = any> {
  type: T;
}

interface IAnyAction extends IAction {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

type Reducer<S = any, A extends IAction = IAnyAction> = (
  state: S | undefined,
  action: A,
) => S;
/** redux 相关 end */

/** rc-form 相关 begin */
declare module 'rc-form' {
  export const createForm: any;
  export const createFormField: any;
  export const formShape: any;
}
/** rc-form 相关 end */
