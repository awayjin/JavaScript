
// import React from 'react';
// import ReactDOM from 'react-dom';
// import LifeCycleImg from './images/lifecycle.png';
// import './search.less';
// import { getStr } from '../../common/index.js';
// import { a } from './tree-shaking.js';
// import LargeNumberAway  from 'large-number-away'

const React = require('react');
const LargeNumberAway = require('large-number-away');
const LifeCycleImg = require('./images/lifecycle.png');
const { a } = require('./tree-shaking.js')
const { getStr } = require('../../common/index.js')
// import './search.less';
const s = require('./search.less')

console.log('search34444');


class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null,
    };
    this.loadComponent = this.loadComponent.bind(this)
  }

  // 动态引入组件
  loadComponent() {
    require('./text.js').then((data) => {
      console.log('data:', data);
      this.setState({
        Text: data.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="search-text">
        <p>LargeNumberAway: { LargeNumberAway(4, 15) } </p>
        <p>
          dynamic:
          {' '}
          { Text ? <Text /> : null }
        </p>
        <p>
          common:
          { getStr() }
          {' '}

        </p>
        <p>
          funcA:
          { a() }
        </p>
        <img src={LifeCycleImg} onClick={ this.loadComponent.bind(this) } alt="11" />
      </div>
    );
  }
}

module.exports = <Search />
// export default <Search />


