import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Form, InputNumber, List, Space, Tag } from 'antd'
import * as substrate from '../substrate'
import OrgItem from './OrgItem'

const OrgList = ({ orgs, setOrgs }: any) => {
  const getOrgs = async () => {
    const orgs = await substrate.getOrgs()
    setOrgs(orgs)
  }

  useEffect(() => {
    getOrgs()
  }, [])

  return (
    <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={orgs}
    renderItem={item => (
      <List.Item>
        <OrgItem org={item}></OrgItem>
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
