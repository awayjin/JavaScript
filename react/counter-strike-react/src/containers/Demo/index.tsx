import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Actions from 'src/actions'

interface IDemoProps {
  dispatch: Dispatch
  Test: () => void
  test: object
}

interface IReduxState {
  test: object
}

const getState = (state: IReduxState) => ({
  test: state.test
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    Test: (): void => {
      dispatch(Actions.testActions.testAction())
    }
  }
}

@(connect(
  getState,
  mapDispatchToProps
) as any)
export default class Demo extends React.Component<IDemoProps, any> {
  public componentDidMount() {
    this.props.Test()
  }
  public render() {
    return (
      <div>
        <h2>demo</h2>
      </div>
    )
  }
}
