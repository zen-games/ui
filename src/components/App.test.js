import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from './App'

describe(`<App />`, () => {
  it(`should exist`, () => {
    let wrapper = shallow(
      <App

      />
    )

    expect(wrapper).to.exist
  })
})
