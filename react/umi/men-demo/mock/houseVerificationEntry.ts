import { proxy } from './utils/proxy';
export default {
  '/garnet/api/v1/relation/house/detail': proxy(
    'https://yapi.bu6.io/mock/671/garnet/api/v1/relation/house/detail',
  ),

  'PUT /garnet/api/v1/relation/house/info': proxy(
    'https://yapi.bu6.io/mock/671/garnet/api/v1/relation/house/info',
    { method: 'PUT' },
  ),
};
