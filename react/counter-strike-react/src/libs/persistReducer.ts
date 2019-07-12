import { Reducer } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import storageSession from 'redux-persist/es/storage/session'
import createEncryptor from 'redux-persist-transform-encrypt'
/**
 *
 * @param {*string} key persist:key
 * @param {*number} version version number
 * @param {*boolean} DEBUG is debug ?
 * @param {*function} reducerName reducer name
 * @param {*array} blacklist blacklist name
 */

interface IPersistReducers {
  key?: string
  storageType?: string
  version?: number
  DEBUG?: boolean
  reducerName: Reducer
  blacklist?: Array<string>
}

const asyncEncryptor = createEncryptor({
  secretKey: 'project-secret-key',
  onError: error => {
    // handle errors
  }
})

const PersistReducers = ({
  key = 'app',
  storageType,
  version = 1,
  DEBUG = false,
  reducerName,
  blacklist = []
}: IPersistReducers) =>
  persistReducer(
    {
      key,
      storage: storageType === 'session' ? storageSession : storage,
      version: version,
      debug: DEBUG,
      blacklist: blacklist,
      transforms: [asyncEncryptor]
    },
    reducerName
  )

export default PersistReducers
