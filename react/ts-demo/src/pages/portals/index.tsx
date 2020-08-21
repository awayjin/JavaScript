// @ts-nocheck3
import React, {useState, createContext, useContext, Component, useRef, useEffect, PropsWithChildren} from "react";
// https://github.com/CruxF/IMOOC/tree/master/React?1549967840861
import ReactDOM from 'react-dom'
import './index.css'

interface IProps {
  title: string;
  demo: any;
}
// const modalRoot = document.getElementById('modal-root');
// // Portals
// export const Portals: React.FC<IProps> = ({ title, demo }) => {
//   return (
//     ReactDOM.createPortal(
//
//     )
//   )
// }


// These two containers are siblings in the DOM
const appRoot: any = document.getElementById('app-root');
const modalRoot: any = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
// class Modal extends React.Component {
//   constructor(props: any) {
//     super(props);
//     // Create a div that we'll render the modal into. Because each
//     // Modal component has its own element, we can render multiple
//     // modal components into the modal container.
//   }
//   el = document.createElement('div');
//
//   componentDidMount() {
//     // Append the element into the DOM on mount. We'll render
//     // into the modal container element (see the HTML tab).
//     modalRoot.appendChild(this.el);
//   }
//
//   componentWillUnmount() {
//     // Remove the element from the DOM when we unmount
//     modalRoot.removeChild(this.el);
//   }
//
//   render() {
//     // Use a portal to render the children into the element
//     return ReactDOM.createPortal(
//       // Any valid React child: JSX, strings, arrays, etc.
//       this.props.children,
//       // A DOM element
//       this.el,
//     );
//   }
// }

const Modal: React.FC = (props: PropsWithChildren<any>) => {
  const el = document.createElement('div')
  useEffect(() => {
    modalRoot.appendChild(el)
    return () => {
      // modalRoot.removeChild(el)
    }
  }, [])
  return (
    ReactDOM.createPortal(
      props.children,
      el
    )
  )
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
export class Portals extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  state = {
    showModal: false
  }
  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        <h2>{ this.props.title }, { this.props.demo }</h2>
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

