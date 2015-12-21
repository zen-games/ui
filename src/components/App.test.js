import React from 'react'
import { shallow, mount, describeWithDOM } from 'enzyme'
import { expect } from 'chai'
import App from './App'

/*
 *  Shallow
 */

describe(`<App />`, () => {
  it(`should exist`, () => {
    let app = shallow(<App />)
    expect(app).to.exist
  })

  it(`should have an empty username in state by default`, () => {
    let app = shallow(<App />)
    expect(app.state(`username`)).to.be.null
  })

  it(`should have an empty rooms array in state by default`, () => {
    let app = shallow(<App />)
    expect(app.state(`rooms`)).to.be.empty
  })
})

/*
 *  With DOM
 */

describeWithDOM(`<App />`, () => {
  it(`should render a form element`, () => {
    let app = mount(<App />)
    expect(app.find(`form`)).to.have.length(1)
  })
})
