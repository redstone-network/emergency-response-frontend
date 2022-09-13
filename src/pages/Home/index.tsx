import {
  Button,
  Divider,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  TimePicker,
} from 'antd'
import { useState } from 'react'
import extension from '../../substrate/extension'
import * as index from '../../substrate/index'
import Org from '@/components/Org'
import Proposal from '@/components/Proposal'
import OrgList from '@/components/OrgList'
import ProposalList from '@/components/ProposalList'

async function getChainInfo() {
  const chainInfo = await index.getChainInfo()
  console.log(
    'substrate blockchain connected!!! chain information:',
    chainInfo,
  )
}

getChainInfo()

async function getUser(userName: string) {
  const user = await index.getUser(userName)
  console.log('address:', user.address)
}

getUser('Alice')
getUser('Bob')

function Home() {
  const [orgs, setOrgs] = useState([])

  console.log(
    extension.allAccounts,
    extension.extensions,
  )
  const extensions = extension.extensions
  const allAccounts = extension.allAccounts

  const [currentExtension, setExtension]
    = useState('')
  const [currentAccounts, setAccounts] = useState(
    [] as any[],
  )
  const [currentAccount, setAccount] = useState()
  const handleExtensionChange = (
    value: string,
  ) => {
    setExtension(value)
    const accounts
      = allAccounts.filter(
        account => account.meta.source === value,
      ) || []
    setAccounts(accounts)
  }

  return (
    <div>
      <div className="header">
        <h1>Red Stone Emergency Response System</h1>
        <div
          style={{
            position: 'absolute',
            right: '20px',
          }}
        >
          <Select
            value={currentExtension}
            style={{
              width: 120,
              marginRight: '20px',
            }}
            onChange={handleExtensionChange}
          >
            {extensions.map(extension => (
              <Select.Option
                key={extension.name}
                value={extension.name}
              >
                {extension.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            value={currentAccount}
            style={{ width: 120 }}
            onChange={(value) => {
              setAccount(value)
            }}
          >
            {currentAccounts.map(account => (
              <Select.Option
                key={account.address}
                value={account.address}
              >
                {account.meta.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div></div>
      <Divider />
      <Divider />

      <div className="content">
        <Org />
        <Divider />

        <div className="center">
          <div>Org List</div>
          <div><OrgList orgs={orgs} setOrgs={setOrgs} /></div>
        </div>
        <Divider />
        <ProposalList />
        <Divider />
        <Proposal />
        <Divider />
      </div>
    </div>
  )
}

export default Home
