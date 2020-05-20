const shouldBehaveLikeERC20Detailed = require('./behaviors/ERC20Detailed.behavior')
const shouldBehaveLikeERC20 = require('./behaviors/ERC20.behavior')

const LegacyToken = artifacts.require('LegacyToken')

contract('LegacyToken', function ([_, owner, recipient, anotherAccount]) {
  const initialSupply = new web3.utils.BN(web3.utils.toWei('10000', 'ether'))

  beforeEach('deploying token', async function () {
    this.token = await LegacyToken.new({ from: owner })
  })

  shouldBehaveLikeERC20([owner, recipient, anotherAccount], initialSupply)
  shouldBehaveLikeERC20Detailed('My Legacy Token', 'MLT', web3.utils.toBN('18'), web3.utils.toBN(initialSupply))
})
