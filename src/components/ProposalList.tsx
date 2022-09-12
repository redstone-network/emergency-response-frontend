import { useEffect, useState } from 'react'
import { Button, Card, Space, Table } from 'antd'
import * as substrate from '../substrate'

const ProposalList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [recipes, setProposals] = useState([])
  const [loading, setLoading] = useState(false)

  const getProposals = async () => {
    // const recipes = await substrate.getProposals() as any

    // setProposals(recipes)
    const data = [
      {
        id: 1,
        detail: 'desc 1',
        expect: 1000,
        status: 'Processing',
      },
      {
        id: 2,
        detail: 'desc 2',
        expect: 2000,
        status: 'Transfering',
      },
      {
        id: 3,
        detail: 'desc 3',
        expect: 3000,
        status: 'AllDone',
      },
    ]
    setProposals(data)
  }

  const agree = async (id: number) => {
    // setLoading(true)
    // const ret = await substrate.recipeTurnOn(id)

    // if (ret) {
    //   setLoading(false)
    //   getProposals()
    // }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      align: 'center',
    },
    {
      title: 'Expect',
      dataIndex: 'expect',
      key: 'expect',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => { agree(record.id) }}>Agree</a>
        </Space>
      ),
    },
  ] as any

  useEffect(() => {
    getProposals()
  }, [])

  return (
    <>
      <Card title="Proposal List" style={{ width: '80%', margin: '10px auto' }}>
        <Table loading={loading} bordered columns={columns} dataSource={recipes} />
      </Card>

    </>
  )
}

export default ProposalList
