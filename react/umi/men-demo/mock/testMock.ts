import { proxy } from './utils/proxy';

export default {
  '/emerald/api/v1/web/surveys/:id': proxy(
    'https://yapi.bu6.io/mock/338/emerald/api/v1/web/surveys/:survey_id',
  ),
};
