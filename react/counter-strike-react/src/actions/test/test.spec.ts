import testActions from './index'
import { TEST_DEMO } from './constants'

describe('test action and constants', () => {
  it('constants TEST_DEMO', () => {
    expect(TEST_DEMO).toEqual('TEST_DEMO')
  })

  it('test testAction func', () => {
    expect(testActions.testAction()).toEqual({
      type: TEST_DEMO
    })
  })
})
