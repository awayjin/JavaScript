import React from "react";

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      flag: false
    }
  }
  static getDerivedStateFromError (error: React.ErrorInfo) {
    console.log('getDerivedStateFromError error:', error)
    return { flag: true }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    return <div>
      { this.state.flag ? <h1>发生错误, 请稍后再试!</h1> : this.props.children }
    </div>;
  }
}
