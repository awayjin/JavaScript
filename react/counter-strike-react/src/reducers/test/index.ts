import { Action } from 'redux'
import * as ACTIONS_TYPE from 'src/actions/test/constants.ts'

interface InitState {
  id?: number
  name: string
}

const initState = {
  id: 1,
  name: 'test'
}

function test(state: InitState = initState, action: Action): object {
  switch (action.type) {
    case ACTIONS_TYPE.TEST_DEMO:
      return {
        ...state,
        name: 'hi'
      }

    default:
      return state
  }
}

export default test
