import { useEffect, useState } from 'react'
import { Button, Card, Space, Table } from 'antd'
import * as substrate from '../substrate'

const ProposalList = () => {
  const [loading, setLoading] = useState(false)
  const [proposals, setProposals] = useState([])

  const getProposals = async () => {
    const proposals = await substrate.getProposals() as any

    setProposals(proposals)
  }

  const agree = async (idOrg: number, proposalId: number) => {
    const ret = await substrate.submitVote(idOrg, proposalId)

    if (ret)
      getProposals()
  }

  const columns = [
    {
      title: 'OrgID',
      dataIndex: 'orgId',
      key: 'orgId',
      align: 'center',
    },
    {
      title: 'ProposalId',
      dataIndex: 'proposalId',
      key: 'proposalId',
      align: 'center',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      align: 'center',
    },
    {
      title: 'PaymentRequested',
      dataIndex: 'paymentRequested',
      key: 'paymentRequested',
      align: 'center',
    },
    {
      title: 'Statue',
      dataIndex: 'statue',
      key: 'statue',
      align: 'center',
    },
    {
      title: 'Votes',
      dataIndex: 'votes',
      key: 'votes',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => { agree(record.orgId, record.proposalId) }}>Agree</a>
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
        <Table loading={loading} bordered columns={columns} dataSource={proposals} />
      </Card>

    </>
  )
}

export default ProposalList
