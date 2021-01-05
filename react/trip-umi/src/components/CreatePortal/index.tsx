import React from "react";
import ReactDOM from 'react-dom'

export default class CreatePortal extends React.Component<any, any> {
  private body: HTMLBodyElement | null;
  private el: HTMLDivElement;
  constructor(props: any) {
    super(props);
    this.body = document.querySelector('body')
    this.el = document.createElement('div')
  }

  componentDidMount() {
    this.el.setAttribute('id', 'portal-root')
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    if (this.body) this.body.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
