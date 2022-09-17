import { Tabs } from 'antd'
import React, { FC } from 'React'
import Home from './Home'
import Proposle from './Proposle/Index'
const Index: FC = () => {
  return (
    <Tabs type="card">
      <Tabs.TabPane tab="Home" key="1">
        <Home />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Proposals" key="2">
        <Proposle />
      </Tabs.TabPane>
    </Tabs>
  )
}
export default Index
