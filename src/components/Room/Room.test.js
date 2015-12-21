import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Room from './Room'

describe(`<Room />`, () => {
  it(`should exist`, () => {
    let wrapper = shallow(
      <Room
        room = {{ id: `` }}
      />
    )

    expect(wrapper).to.exist
  })
})
