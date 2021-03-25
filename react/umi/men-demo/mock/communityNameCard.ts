import { proxy } from './utils/proxy';
export default {
  '/garnet/api/v1/projects/:project_code/business_card': proxy(
    'https://fd-test.4009515151.com/garnet/api/v1/projects/44030011/business_card',
  ),
};
