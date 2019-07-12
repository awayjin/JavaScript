

# how to run ?

```shell
 yarn
 yarn start
```

# how to write react redux in ts project

[React & Redux in TypeScript - Static Typing Guide](https://github.com/piotrwitek/react-redux-typescript-guide)

#ENV 使用

NODE_ENV:node.js 的环境变量，属于 node.js 模块，用来设置不同环境的配置；
process.env.NODE_ENV：默认值（development'，也可以自行设置）;

* 项目中使用到了三个 ENV
  * development;(开发环境)
  * production;(生产环境)
  * test;(测试环境)

# #DEV

* `启动`

  * git clone https://git.vankeservice.com/CS/front/counter-strike-react
  * npm install or yarn (需装上 node 和 npm or yarn)
    _ npm start or yarn start
    _ localhost:3000

* `proxy` src/setupProxy.js file

  ```javascript
  "/api": {
      "target": "https://blackpearltest.4009515151.com",
      "secure": false,
      "changeOrigin": true,
      "preserveHeaderKeyCase": true,
      "hostRewrite": true,
      "autoRewrite": true,
      "protocolRewrite": "https",
      "cookieDomainRewrite": {
        "*": "localhost"
      }
    }
  ```

# #Prettier

* 格式化目录："src/ \*_ / _ .{js,jsx,json}"
* --single-quote(单引号):true
* --no-semi(语句末尾分号):false

* 使用默认值
  * --no-bracket-spacing(对象括号间加空格):true
    _ --tab-width(缩进空格数):2
    _ --trailing-comma(多行时加逗号) :none \* --jsx-bracket-same-line(将标签的>放在末尾，而不是下一行) :none

# Unit Test

## react test tools

* mac: brew install watchman
* Jest Enzyme

## how to play unit test

[This is TDD tutorial](https://hackernoon.com/a-guide-to-tdd-a-react-redux-todolist-app-part-1-b8a200bb7091)

## how to run

* yarn test(npm run test)
* yarn coverage(You will see detail Test coverage in coverage folder)

# Shallow Rendering

```javascript
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import MyComponent from './MyComponent'
import Foo from './Foo'

describe('<MyComponent />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />)
    expect(wrapper.find(Foo)).to.have.length(3)
  })

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />)
    expect(wrapper.find('.icon-star')).to.have.length(1)
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    )
    expect(wrapper.contains(<div className="unique" />)).to.equal(true)
  })

  it('simulates click events', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick).to.have.property('callCount', 1)
  })
})
```

#Full DOM Rendering

```javascript
import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Foo from './Foo'

describe('<Foo />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />)
    expect(wrapper.props().bar).to.equal('baz')
    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).to.equal('foo')
  })

  it('simulates click events', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<Foo onButtonClick={onButtonClick} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick).to.have.property('callCount', 1)
  })

  it('calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount')
    const wrapper = mount(<Foo />)
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1)
    Foo.prototype.componentDidMount.restore()
  })
})
```

## Static Rendered Markup

```javascript
import React from 'react'
import { expect } from 'chai'
import { render } from 'enzyme'

import Foo from './Foo'

describe('<Foo />', () => {
  it('renders three `.foo-bar`s', () => {
    const wrapper = render(<Foo />)
    expect(wrapper.find('.foo-bar').length).to.equal(3)
  })

  it('renders the title', () => {
    const wrapper = render(<Foo title="unique" />)
    expect(wrapper.text()).to.contain('unique')
  })
})
```

# Commit guild
 * npm install commitizen -g

## Option Running Commitizen on git commit:
  + This example shows how to incorporate Commitizen into the existing git commit workflow by using git hooks and the --hook command-line option. This is useful for project maintainers who wish to ensure the proper commit format is enforced on contributions from those unfamiliar with Commitizen.

+ Once either of these methods is implemented, users running git commit will be presented with an interactive Commitizen session that helps them write useful commit messages.

# Traditional git hooks(if you create new project, you need add following code in .git)
  Update .git/hooks/prepare-commit-msg with the following code:
  ```shell
    #!/bin/bash
    exec < /dev/tty
    node_modules/.bin/git-cz --hook
  ```

# absolute path
 * src/**

# Persist Store

+ [persist doc](https://github.com/rt2zz/redux-persist)

 ## if you want to persist your store, you should add following codes

 + such as:

 ```javascript
  test: PersistReducers({
    key: 'customer',
    reducerName: test,
    blacklist: TEST_BLACK_LIST
  })
 ```

 # analyze 
 analyze use source-map-explorer lib
 + yarn build
 + yarn analyze(write the file name , you want to analyze)