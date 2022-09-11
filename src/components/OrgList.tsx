import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, InputNumber, List, Space, Tag } from 'antd'
import * as substrate from '../substrate'

const data = [
  {
    title: 'org 1',
  },
  {
    title: 'org 2',
  },
  {
    title: 'org 3',
  },
  {
    title: 'org 4',
  },
]

const OrgList = ({ actions, setOrgs }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const getOrgs = async () => {
    // const actions = await substrate.getOrgs()
    // setOrgs(actions)
  }

  useEffect(() => {
    // getOrgs()
  }, [])

  return (
    <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Card title={item.title}>org content</Card>
        <InputNumber placeholder="1"/>
        <Button>donate</Button>
      </List.Item>
    )}
  />
  )
}

OrgList.propTypes = {
  orgs: PropTypes.array,
  setOrgs: PropTypes.func,
}

export default OrgList
