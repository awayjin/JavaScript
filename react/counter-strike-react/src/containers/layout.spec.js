import React from 'react'
import { shallow } from 'enzyme'
import { Switch, Route } from 'react-router-dom'
import Layout from './Layout'

describe('Layout component render test', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Layout />)
  })

  it('test render class', () => {
    expect(wrapper.find('.layout').exists()).toBeTruthy()
    expect(wrapper.find('.layout').text()).toEqual('layout<Switch />')
  })
  it('test render Switch and Route', () => {
    expect(wrapper.find(Switch)).toBeTruthy()
    expect(wrapper.find(Route).length).toBe(1)
  })
})
