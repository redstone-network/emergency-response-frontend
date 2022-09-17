import {
  ApiPromise,
  WsProvider,
} from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import dayjs from 'dayjs'

// 如没有运行 node-template，也可试连到波卡主网上： `wss://rpc.polkadot.io`.
const provider = new WsProvider(
  'ws://127.0.0.1:9944',
)
// const provider = new WsProvider(
//   "wss://rpc.polkadot.io"
// );
// const provider = new WsProvider('wss://difttt.dmb.top/ws')
// const provider = new WsProvider('ws://39.108.194.248:9944')
const api = await ApiPromise.create({ provider })

// 获取用户
function getUser(userName: string) {
  const keyring = new Keyring({
    type: 'sr25519',
  })
  const user = keyring.addFromUri(
    `//${userName}`,
  )
  return user
}

// 测试是否能获取用户地址
const Alice = getUser('Alice')
// console.log("Alice's Address is:", Alice.address);
const Bob = getUser('Bob')
// console.log("Bob's Address is:", Bob.address);

async function getChainInfo() {
  // 1. 查看本条链的信息
  const [chain, nodeName, nodeVersion, metadata]
    = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      api.rpc.state.getMetadata(),
    ])

  return {
    metadata,
    chain,
    nodeName,
    nodeVersion,
  }
}

// 获取流动池
async function getLiquidityPool(
  TokenA: string,
  TokenB: string,
) {
  return new Promise((resolve) => {
    api.query.dex.liquidityPool([
      {
        TOKEN: TokenA,
      },
      {
        TOKEN: TokenB,
      },
    ])
  })
}

// getLiquidityPool('AUSD', 'RENBTC')

// 查看某个账户的某个币种的余额
async function getBalance(
  address: string,
  token: string,
) {
  const balance = await api.query.tokens.accounts(
    address,
    token,
  )

  console.log(balance)
}

// getBalance(Alice.address, 'AUSD')

// 使用交易池交换代币

async function swapWithExactSupply(
  tokenA: string,
  tokenB: string,
) {
  const tx = api.tx.dex.swapWithExactSupply(
    tokenA,
    tokenB,
  )
  const hash = tx.signAndSend(Bob.address)
  return hash
}

// swapWithExactSupply('AUSD', 'RENBTC')

// 转账
async function transfer(
  to: string,
  from: any,
  amount: number,
) {
  const tx = api.tx.balances.transfer(to, amount)
  const hash = tx.signAndSend(from)
  return hash
}

async function createTrigger(
  data: any,
  user: any = Bob,
) {
  return new Promise((resolve) => {
    api.tx.diftttModule
      .createTriger(data)
      .signAndSend(
        user,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function getTriggers() {
  const exposures
    = await api.query.diftttModule.trigerOwner.entries(
      Alice.address,
    )

  const triggers = []

  for (const [key] of exposures) {
    const id = +key.args[1]
    const t
      = await api.query.diftttModule.mapTriger(id)
    const trigger = t.toHuman() as any
    const {
      Timer,
      Schedule,
      PriceGT,
      PriceLT,
      Arh999LT,
      TransferProtect,
      OakTimer,
    } = trigger

    const res = {} as any
    if (Timer) {
      res.type = 'Timer'
      res.data = Timer
      res.condition = res.data[1]
    }
    else if (Schedule) {
      res.type = 'Schedule'
      res.data = Schedule
      res.condition = res.data[1]
    }
    else if (PriceGT) {
      res.type = 'PriceGT'
      res.data = PriceGT
      res.condition = res.data[1]
    }
    else if (PriceLT) {
      res.type = 'PriceLT'
      res.data = PriceLT
      res.condition = res.data[1]
    }
    else if (Arh999LT) {
      res.type = 'Arh999LT'
      res.data = Arh999LT
      res.indicator = res.data[1]
      res.seconds = res.data[2]
    }
    else if (TransferProtect) {
      res.type = 'TransferProtect'
      res.data = TransferProtect
      res.maxAmount = res.data[1]
      res.maxCount = res.data[2]
    }
    else if (OakTimer) {
      res.type = 'OakTimer'
      res.data = OakTimer
      res.cycle_seconds = res.data[1]
      res.repeat_times = res.data[2]
    }

    const time = +res.data[0].split(',').join('')
    res.createdTime = dayjs(time).format(
      'YYYY-MM-DD HH:mm:ss',
    )

    triggers.push({
      ...res,
      key: id,
      id,
    })
  }

  return triggers
}

async function createAction(
  data: any,
  user: any = Bob,
) {
  return new Promise((resolve) => {
    api.tx.diftttModule
      .createAction(data)
      .signAndSend(
        user,
        ({ events = [], status }) => {
          if (status.isFinalized) { resolve({ events, status }) }
          else {
            console.log(
              `Status of transfer: ${status.type}`,
            )
          }

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function getActions() {
  const exposures
    = await api.query.diftttModule.actionOwner.entries(
      Alice.address,
    )

  const actions = []

  for (const [key] of exposures) {
    const id = +key.args[1]
    const t
      = await api.query.diftttModule.mapAction(id)
    const action = t.toHuman() as any
    const {
      MailWithToken,
      Oracle,
      BuyToken,
      Slack,
    } = action

    if (MailWithToken) {
      action.type = 'MailWithAsset'
      action.url = MailWithToken[0]
      action.token = MailWithToken[1]
      action.receiver = MailWithToken[2]
      action.title = [3]
      action.body = MailWithToken[4]
    }
    else if (Oracle) {
      action.type = 'Oracle'
      action.url = Oracle[0]
      action.token = Oracle[1]
    }
    else if (BuyToken) {
      console.log(BuyToken)
      action.type = 'BuyToken'
      action.address = BuyToken[0]
      action.sellTokenName = BuyToken[1]
      action.amount = BuyToken[2]
      action.buyTokenName = BuyToken[3]
      action.receiver = BuyToken[4]
    }
    else if (Slack) {
      action.type = 'Slack'
      action.slack_hook_url = Slack[0]
      action.message = Slack[1]
    }

    actions.push({
      ...action,
      key: id,
      id,
    })
  }

  return actions
}

async function createRecipe(
  actionId = 0,
  triggerId = 0,
) {
  return new Promise((resolve) => {
    api.tx.diftttModule
      .createRecipe(actionId, triggerId)
      .signAndSend(
        Bob,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function getRecipes() {
  const exposures
    = await api.query.diftttModule.recipeOwner.entries(
      Alice.address,
    )

  const recipes = []

  for (const [key] of exposures) {
    const id = +key.args[1]
    const t
      = await api.query.diftttModule.mapRecipe(id)
    const recipe = t.toHuman() as object
    recipes.push({
      ...recipe,
      key: id,
      id,
    })
  }

  return recipes
}

async function recipeTurnOn(id: number) {
  return new Promise((resolve) => {
    api.tx.diftttModule
      .turnOnRecipe(id)
      .signAndSend(
        Alice,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function recipeTurnOff(id: number) {
  return new Promise((resolve) => {
    api.tx.diftttModule
      .turnOffRecipe(id)
      .signAndSend(
        Alice,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function getOrgs() {
  const exposures
    = await api.query.donateModule.mapOrg.entries()

  const orgs = []

  for (const [key] of exposures) {
    const id = +key.args[0]
    const t
      = await api.query.donateModule.mapOrg(id)
    const org = t.toHuman() as object
    let balance = await api.query.system.account(org.treasuryId);
    orgs.push({
      ...org,
      available: balance.data.free.toString(),
      key: id,
      id,
    })
  }

  return orgs
}

async function createOrg(
  name: string,
  user: any = Bob,
) {
  return new Promise((resolve) => {
    api.tx.donateModule
      .summon(name, '300000000000000')
      .signAndSend(
        user,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function donate(
  orgId: number,
  amount: number,
  user: any = Bob,
) {
  return new Promise((resolve) => {
    api.tx.donateModule
      .donate(orgId, amount)
      .signAndSend(
        user,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function createProposal(
  orgId: number,
  paymentRequested: number,
  detail: string,
  user: any = Bob,
) {
  return new Promise((resolve) => {
    api.tx.donateModule
      .submitProposal(orgId, paymentRequested/12, detail)
      .signAndSend(
        user,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function submitVote(
  orgId: number,
  proposalId: number,
  vote_unit: number,
  user: any = Bob,
) {
  return new Promise((resolve) => {
    api.tx.donateModule
      .submitVote(orgId, proposalId, vote_unit)
      .signAndSend(
        user,
        ({ events = [], status }) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

async function getProposals() {
  const exposures
    = await api.query.donateModule.proposals.entries()

  const proposals = []

  for (const [key] of exposures) {
    const orgId = +key.args[0]
    const proposalId = +key.args[1]

    const t
      = await api.query.donateModule.proposals(orgId, proposalId)
    const proposal = t.toHuman() as object
    proposals.push({
      ...proposal,
      key,
      id: key,
      proposalId,
    })
  }

  return proposals
}

export {
  getBalance,
  getUser,
  getChainInfo,
  transfer,
  createTrigger,
  getTriggers,
  createAction,
  getActions,
  createRecipe,
  getRecipes,
  recipeTurnOn,
  recipeTurnOff,
  getOrgs,
  createOrg,
  donate,
  createProposal,
  submitVote,
  getProposals,
}
