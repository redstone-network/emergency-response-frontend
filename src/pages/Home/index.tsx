import { Divider } from 'antd'
import { useState } from 'react'
import Org from '@/components/Org'
import Proposal from '@/components/Proposal'
import OrgList from '@/components/OrgList'
import ProposalList from '@/components/ProposalList'

function Home() {
  const [orgs, setOrgs] = useState([])

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'white' }}>
      Emergency Response System
      </h1>
      <Org />
      <Divider />

      <OrgList actions={orgs} setOrgs={setOrgs} />
      <Divider />
      <ProposalList />
      <Divider />
      <Proposal />
      <Divider />
    </div>
  )
}

export default Home
