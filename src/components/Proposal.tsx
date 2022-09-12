import { Button, Form, Input, InputNumber } from 'antd'

const Proposal = ({ visible, triggers, actions, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
<Form form={form} name="control-hooks" onFinish={onFinish}>
<Form.Item name="id" label="org id" rules={[{ required: true }]}>
  <Input placeholder="input org id"/>
</Form.Item>
<Form.Item name="detail" label="proposal detail" rules={[{ required: true }]}>
  <Input placeholder="input detail"/>
</Form.Item>

<Form.Item name="amount" label="expect amout" rules={[{ required: true }]}>
  <InputNumber placeholder="1"/>
</Form.Item>

<Form.Item>
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
