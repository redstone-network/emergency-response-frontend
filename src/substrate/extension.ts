import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from '@polkadot/extension-dapp'

import { ApiPromise, WsProvider } from '@polkadot/api'
// import { Keyring } from '@polkadot/keyring'
// import dayjs from 'dayjs'

// // 如没有运行 node-template，也可试连到波卡主网上： `wss://rpc.polkadot.io`.
const provider = new WsProvider('wss://rpc.polkadot.io')
// // const provider = new WsProvider('wss://difttt.dmb.top/ws')
// // const provider = new WsProvider('ws://39.108.194.248:9944')
const api = await ApiPromise.create({ provider })

// returns an array of all the injected sources test
// (this needs to be called first, before other requests)
const extensions = await web3Enable('RedStone')

// returns an array of { address, meta: { name, source } }
// meta.source contains the name of the extension that provides this account
const allAccounts = await web3Accounts()

console.log(extensions, allAccounts)
// the address we use to use for signing, as injected
// const SENDER = '12robJpXXF3tsZo6BZ2RqWJvivXcF2ZfuAaFkSFovWJ4SvQc'

// finds an injector for an address
// const injector = await web3FromAddress(SENDER)

// sign and send our transaction - notice here that the address of the account
// (as retrieved injected) is passed through as the param to the `signAndSend`,
// the API then calls the extension to present to the user and get it signed.
// Once complete, the api sends the tx + signature via the normal process
// const leon = '12robJpXXF3tsZo6BZ2RqWJvivXcF2ZfuAaFkSFovWJ4SvQc'
// const test = '5CftGgKGma8Ddy61gvwrYKjrNuiYbj6omKZbAFgFaWQAnGMc'
// api.tx.balances
//   .transfer(test, 1)
//   .signAndSend(SENDER, { signer: injector.signer }, (status) => {
//     console.log(status)
//   })

export default {
  extensions,
  allAccounts,
}
