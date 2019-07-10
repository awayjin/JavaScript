import test from './test'

import PersistReducers from 'src/libs/persistReducer.ts'

const TEST_BLACK_LIST = ['name']

export default {
  test: PersistReducers({
    key: 'test',
    reducerName: test,
    blacklist: TEST_BLACK_LIST
  })
}
