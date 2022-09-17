import { useEffect, useState } from 'react'
import { Button, Card, Space, Table } from 'antd'
import { object } from 'prop-types'
import * as substrate from '../substrate'

const ProposalList = () => {
  const [loading, setLoading] = useState(true)
  const [proposals, setProposals] = useState<any>([])

  const getProposals = async () => {
    const proposals = await substrate.getProposals()
    setProposals(proposals)
    setLoading(false)
  }

  const agree = async (idOrg: number, proposalId: number, vote_unit: 0 | 1) => {
    const rt = await substrate.submitVote(idOrg, proposalId, vote_unit)
    if (rt.status.isFinalized) {
      getProposals()
    }
  }

  const columns = [
    {
      title: 'Treasury Id',
      dataIndex: 'orgId',
      key: 'orgId',
      align: 'center'
    },
    {
      title: 'Proposal Id',
      dataIndex: 'proposalId',
      key: 'proposalId',
      align: 'center'
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      align: 'center'
    },
    {
      title: 'Application Funding',
      dataIndex: 'paymentRequested',
      key: 'paymentRequested',
      align: 'center'
    },
    {
      title: 'Payment Frequency',
      dataIndex: 'paymentFrequency',
      key: 'paymentFrequency',
      align: 'center'
    },
    {
      title: 'State',
      dataIndex: 'statue',
      key: 'statue',
      align: 'center'
    },
    {
      title: 'Approve votes',
      dataIndex: 'approveVotes',
      key: 'approveVotes',
      align: 'center'
    },
    {
      title: 'Deny voted',
      dataIndex: 'denyVotes',
      key: 'denyVotes',
      align: 'center'
    },
    {
      title: 'Total votes',
      dataIndex: 'votes',
      key: 'votes',
      align: 'center'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              agree(record.orgId, record.proposalId, 0)
            }}
          >
            approve
          </a>
          <a
            onClick={() => {
              agree(record.orgId, record.proposalId, 1)
            }}
          >
            deny
          </a>
        </Space>
      )
    }
  ] as any

  useEffect(() => {
    getProposals()
  }, [])

  return (
    <Card title="Proposal List" style={{ width: '80%', margin: '10px auto' }}>
      <Table
        loading={loading}
        bordered
        columns={columns}
        dataSource={proposals}
      />
    </Card>
  )
}

export default ProposalList
