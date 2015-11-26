import React from 'react'
import { render } from 'react-dom'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

let App = () =>
  <div>
    <h1>Hello world!</h1>
    <Tabs>
      <TabList>
        <Tab>Foo</Tab>
        <Tab>Bar</Tab>
        <Tab>Baz</Tab>
      </TabList>

      <TabPanel>
        <h2>Hello from Foo</h2>
      </TabPanel>

      <TabPanel>
        <h2>Hello from Bar</h2>
      </TabPanel>
      
      <TabPanel>
        <h2>Hello from Baz</h2>
      </TabPanel>
    </Tabs>
  </div>

render(<App />, document.getElementById('app'))
