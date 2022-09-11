import { Button, Form, Input } from 'antd'

const Org = ({ visible, triggers, actions, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
<Form form={form} name="control-hooks" onFinish={onFinish}>
<Form.Item name="name" label="Org name" rules={[{ required: true }]}>
  <Input placeholder="input org name"/>
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

export default Org
