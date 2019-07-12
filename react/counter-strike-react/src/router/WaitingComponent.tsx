import * as React from 'react'

const WaitingComponent = (Component: any) =>
  class extends React.PureComponent<any> {
    get convertLocationSearchToQuery() {
      const { location } = this.props
      const search = location.search.substr(1)

      return search.split('&').reduce((result: any, item: string) => {
        const [key, value] = item.split('=')
        const nextResult = result
        nextResult[key] = value
        return result
      }, {})
    }
    public render() {
      const enhanceProps = {
        ...this.props,
        location: {
          ...this.props.location,
          query: this.convertLocationSearchToQuery
        }
      }
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component {...enhanceProps} />
        </React.Suspense>
      )
    }
  }

export default WaitingComponent
