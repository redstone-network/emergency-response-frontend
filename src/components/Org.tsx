import { Button, Form, Input } from 'antd'
import * as substrate from '../substrate'

const Org = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const org = await substrate.createOrg(values.name)
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
<Form form={form} name="control-hooks"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
>
<Form.Item name="name" label="Org name" rules={[{ required: true }]}>
  <Input placeholder="input org name"/>
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

export default Org
