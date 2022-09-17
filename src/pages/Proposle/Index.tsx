import type { FC } from 'react'
import React, { useState } from 'react'
import ProposalList from '../../components/ProposalList'

const Proposle: FC = () => {
  const [orgs, setOrgs] = useState([])
  return (
    <div className="myBox">
      <ProposalList />
    </div>
  )
}
export default Proposle
