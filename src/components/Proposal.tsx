import { Button, Form, Input, InputNumber, Space } from 'antd'
import * as substrate from '../substrate'

const Proposal = ({ visible, triggers, actions, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log(values)
    const org = await substrate.createProposal(
      values.id,
      values.amount,
      values.detail
    )
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Form
      form={form}
      name="control-hooks"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item name="id" label="org id" rules={[{ required: true }]}>
        <Input placeholder="input org id" />
      </Form.Item>
      <Form.Item
        name="detail"
        label="proposal detail"
        rules={[{ required: true }]}
      >
        <Input placeholder="input detail" />
      </Form.Item>

      <Form.Item
        name="amount"
        label="expect amout"
        rules={[{ required: true }]}
      >
        <InputNumber placeholder="1" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Proposal
