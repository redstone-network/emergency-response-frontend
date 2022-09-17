import { Button, Form, InputNumber, Modal, message } from 'antd'
import type { FC } from 'react'
import React, { useState } from 'react'
import { donate } from '@/substrate'

const DonateModal: FC<{
  button: React.ReactNode
  callBack: () => void
  id: number
}> = (props) => {
  const { button, callBack, id } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    const data = await donate(id, values.amount)
    message.success('success')
    setVisible(false)
    // 成功后回调
    callBack()
  }
  return (
    <>
      <div onClick={() => setVisible(true)}>{button}</div>
      <Modal
        title="Donate Modal"
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
            label="doante amout"
            required
            name="amount"
            rules={[
              {
                required: true,
                message: 'doante amout is required'
              }
            ]}
          >
            <InputNumber
              min={0}
              style={{ display: 'block', width: '300px' }}
            ></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default DonateModal
