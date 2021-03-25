import { logger } from 'redux-logger';
import { Middleware } from 'redux';
import { isLocal } from '@/utils/env';

type IMiddlewares = Middleware;

const emptyMiddleware: IMiddlewares = ({
  getState,
  dispatch,
}) => next => action => {
  // do something before dispatch...
  // console.log('before', getState());
  // dispatch(action);
  next(action);
  // console.log('after', getState());
  // do something after dispatch...
};

export const middlewares: IMiddlewares[] = [
  isLocal ? logger : emptyMiddleware,
  emptyMiddleware,
];
