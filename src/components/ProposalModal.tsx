import { Button, Form, Input, InputNumber, message, Modal } from 'antd'
import React, { useState, FC } from 'react'
import { createProposal } from '@/substrate'

const ProposalModal: FC<{
  button: React.ReactNode
  callBack: () => void
  id: number
}> = (props) => {
  const { button, callBack, id } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    createProposal(id, values.paymentRequested, values.detail)
    message.success('success')
    setVisible(false)
    // 成功后回调
    callBack()
  }
  return (
    <>
      <div onClick={() => setVisible(true)}>{button}</div>
      <Modal
        title="proposal Modal"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            close
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              // 执行提交事件
              form.submit()
            }}
            htmlType="submit"
          >
            submit
          </Button>
        ]}
      >
        <Form form={form} name="a" labelCol={{ span: 8 }} onFinish={onFinish}>
          <Form.Item
            label="proposal detail"
            required
            name="detail"
            rules={[
              {
                required: true,
                message: 'proposal detail is required'
              }
            ]}
          >
            <Input
              placeholder="please input proposal detail"
              style={{ display: 'block', width: '300px' }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="requested amout"
            required
            name="paymentRequested"
            rules={[
              {
                required: true,
                message: 'requested amout is required'
              }
            ]}
          >
            <InputNumber
              min={0}
              placeholder="please input requested amout"
              style={{ display: 'block', width: '300px' }}
            ></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default ProposalModal
