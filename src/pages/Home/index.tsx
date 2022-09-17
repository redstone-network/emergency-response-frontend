import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  TimePicker
} from 'antd'
import './index.css'
import { useEffect, useState } from 'react'
import extension from '../../substrate/extension'
import * as index from '../../substrate/index'
import Org from '@/components/Org'
import Proposal from '@/components/Proposal'
import DonateModal from '@/components/DonateModal'
import ProposalModal from '@/components/ProposalModal'
import { createOrg, getOrgs } from '../../substrate/index'

// import OrgList from "@/components/OrgList";

function Home() {
  const getChainInfo = async () => {
    const chainInfo = await index.getChainInfo()
    console.log(
      'substrate blockchain connected!!! chain information:',
      chainInfo
    )
  }
  const getUser = async (userName: string) => {
    const user = await index.getUser(userName)
    console.log('address:', user.address)
  }

  // const [orgs, setOrgs] = useState([]);

  console.log(extension.allAccounts, extension.extensions)
  const extensions = extension.extensions
  const allAccounts = extension.allAccounts 
  const [currentExtension, setExtension] = useState('')
  const [currentAccounts, setAccounts] = useState([] as any[])
  const [currentAccount, setAccount] = useState()
  const handleExtensionChange = (value: string) => {
    setExtension(value)
    const accounts =
      allAccounts.filter((account) => account.meta.source === value) || []
    setAccounts(accounts)
  }
  // 展示模块数据
  const [data, setData] = useState([])
  // 顶部form提交
  const onFinish = async (values: any) => {
    const rt = await createOrg(values.name)
    // if (Object.keys(status).includes('status')) {
    if (rt.status.isFinalized) {
      getMyOrgs()
      console.log('### real Success:', values)
      message.success('create success')
    }
  }
  const [form] = Form.useForm()
  const getMyOrgs = async () => {
    const data = await getOrgs()
    setData(data)
  }
  //回调 刷下展示列表
  const callBack = () => {
    console.log('#### 刷新')
    getMyOrgs()
  }
  useEffect(() => {
    getChainInfo()
    getUser('Alice')
    getUser('Bob')
    getMyOrgs()
  }, [])
  return (
    <div className="myBox">
      <div className="content">
        <Form
          form={form}
          onFinish={onFinish}
          name="top"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 24 }}
          layout="inline"
        >
          <Form.Item
            name="name"
            label="treasury name"
            required
            rules={[
              {
                required: true,
                message: 'treasury name is required'
              }
            ]}
          >
            <Input
              placeholder="please input treasury name"
              style={{ width: '500px' }}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {data?.length ? (
          <Space
            style={{ marginTop: '50px', height: '500px', overflow: 'auto' }}
            size="large"
            wrap
          >
            <Row wrap>
              {/* 替换循环数据 */}
              {data.map((item: any, index: number) => {
                return (
                  <Col span={7} key={index} offset={1}>
                    <Card
                      style={{ marginBottom: '50px' }}
                      actions={[
                        <DonateModal
                          key="Donate"
                          callBack={callBack}
                          id={item.id}
                          button={
                            <Button key="Donate" size="large" block>
                              Donate
                            </Button>
                          }
                        />,
                        <ProposalModal
                          key="submit"
                          callBack={callBack}
                          id={item.id}
                          button={
                            <Button
                              key="add1"
                              type="primary"
                              size="large"
                              block
                            >
                              submit proposal
                            </Button>
                          }
                        />
                      ]}
                    >
                      <Descriptions title="">
                        <Descriptions.Item label="treasury" span={3}>
                          {item.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="available" span={3}>
                          {item.available}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Space>
        ) : (
          <Empty description={false} />
        )}
      </div>

      {/* <div className="header">
        <div
          style={{
            position: "absolute",
            right: "20px",
          }}
        >
          <Select
            value={currentExtension}
            style={{
              width: 120,
              marginRight: "20px",
            }}
            onChange={handleExtensionChange}
          >
            {extensions.map((extension) => (
              <Select.Option key={extension.name} value={extension.name}>
                {extension.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            value={currentAccount}
            style={{ width: 120 }}
            onChange={(value) => {
              setAccount(value);
            }}
          >
            {currentAccounts.map((account) => (
              <Select.Option key={account.address} value={account.address}>
                {account.meta.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div> */}

      {/* <div className="content">
        <Org />
        <Divider />

        <div className="center">
          <div>Org List</div>
          <div>
            <OrgList orgs={orgs} setOrgs={setOrgs} />
          </div>
        </div>
        <Divider />
        <Proposal />
        <Divider />
      </div> */}
    </div>
  )
}

export default Home
