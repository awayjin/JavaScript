'use strict';

// import React from 'react';
// import largeNumber from 'large-number';
// import logo from './images/logo.png';
// import './search.less';
const React = require('react');
// const largeNumber = require('large-number-away');
const largeNumber = require('large-number');
const logo = require('./images/lifecycle.png');
const s = require('./search.less');


function Demo () {
  return (<div>Demo 3</div>)
}
class Search extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    };
  }

  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }

  render() {
    const { Text } = this.state;
    const addResult = largeNumber('999', '1');
    return <div className="search-text">
      {
        Text ? <Text /> : '-null'
      }
      <Demo onClick={ this.loadComponent.bind(this)} />
      addResult: { addResult } <br/>
      搜索文字的内容<img src={ logo } onClick={ this.loadComponent.bind(this) } />
    </div>;
  }
}

module.exports = <Search />;