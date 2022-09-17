import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Form, InputNumber, List, Space, Tag } from 'antd'
import * as substrate from '../substrate'

const OrgList = ({ org }: any) => {
  const [form] = Form.useForm()
  const [id, setId] = useState(0)
  const [amount, setAmount] = useState(1)

  const onDonate = async () => {
    const org = await substrate.donate(id, amount)
  }

  useEffect(() => {
    setId(org.id)
  }, [])

  return (
    <Card title={org.name} style={{ width: 220 }}>
      <div>
        id:
        <InputNumber defaultValue={org.id} disabled />
      </div>
      <div>memberCount:{org.memberCount}</div>
      <div>totalShares:{org.totalShares}</div>
      <div>
        donate amout:
        <InputNumber min={1} value={amount} onChange={(v) => setAmount(v)} />
      </div>
      <Button type="primary" onClick={onDonate}>
        donate
      </Button>
    </Card>
  )
}

OrgList.propTypes = {
  org: PropTypes.object
}

export default OrgList
