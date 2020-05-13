const { assertRevert } = require('@openzeppelin/test-helpers')
const { encodeCall } = require('@openzeppelin/upgrades')
const shouldBehaveLikeERC20 = require('./behaviors/ERC20.behavior')
const shouldBehaveLikeERC20Detailed = require('./behaviors/ERC20Detailed.behavior')

const MyLegacyToken = artifacts.require('MyLegacyToken')
const MyUpgradeableToken = artifacts.require('MyUpgradeableToken')
const ERC20Migrator = artifacts.require('ERC20Migrator')

contract('ERC20Migrator', function ([_, owner, recipient, anotherAccount]) {
  const name = 'My Legacy Token'
  const symbol = 'MLT'
  const decimals = 18

  beforeEach('deploying legacy and upgradeable tokens', async function () {
    this.legacyToken = await MyLegacyToken.new({ from: owner })
    
    console.log('Creating migrator')
    this.migrator = await ERC20Migrator.new()
    console.log('Initializing migrator')
    console.log(this.legacyToken.address)
    console.log(owner)
    const migratorData = encodeCall('initialize', ['address', 'address'], [this.legacyToken.address, owner])
    console.log('Sending transaction')
    await this.migrator.sendTransaction({ data: migratorData })
    
    console.log('Initializing token')
    this.upgradeableToken = await MyUpgradeableToken.new()
    const upgradeableTokenData = encodeCall('initialize', ['address', 'address'], [this.legacyToken.address, this.migrator.address])
    await this.upgradeableToken.sendTransaction({ data: upgradeableTokenData })

    console.log('Beginning migration')
    await this.migrator.beginMigration(this.upgradeableToken.address);
  })

  describe('ERC20 token behavior', function () {
    const initialSupply = new web3.utils.BN(web3.utils.toWei('10000', 'ether'))
    const transferred = initialSupply.div(web3.utils.toBN('2'))

    beforeEach('migrating balance to new token', async function () {
      await this.legacyToken.approve(this.migrator.address, transferred, { from: owner })
      await this.legacyToken.approve(anotherAccount, transferred, { from: owner })

      await this.migrator.migrate(owner, transferred)
      await this.legacyToken.transfer(anotherAccount, transferred)

      this.token = this.upgradeableToken
    })

    shouldBehaveLikeERC20([owner, recipient, anotherAccount], transferred)
    shouldBehaveLikeERC20Detailed(name, symbol, decimals)
  })

  // describe('migrate admin', function () {
  //   beforeEach('approving 50 tokens to the new contract', async function () {
  //     await this.legacyToken.approve(this.migrator.address, 50, { from: owner })
  //   })

  //   describe('when the amount is lower or equal to the one approved', function () {
  //     const amount = 50

  //     it('mints that amount of the new token', async function () {
  //       await this.migrator.migrate(owner, amount)

  //       const currentBalance = await this.upgradeableToken.balanceOf(owner)
  //       assert(currentBalance.eq(amount))
  //     })

  //     it('transfers given amount of old tokens to the migrator', async function () {
  //       await this.migrator.migrate(owner, amount)

  //       const currentMigratorBalance = await this.legacyToken.balanceOf(this.migrator.address)
  //       assert(currentMigratorBalance.eq(amount))
  //     })

  //     it('updates the total supply', async function () {
  //       await this.migrator.migrate(owner, amount)

  //       const currentSupply = await this.upgradeableToken.totalSupply()
  //       assert(currentSupply.eq(amount))
  //     })
  //   })

  //   describe('migrate other account', function () {
  //     beforeEach('approving 50 tokens to the new contract', async function () {
  //       await this.legacyToken.approve(this.migrator.address, 50, { from: owner })
  //     })
  
  //     describe('when the amount is lower or equal to the one approved', function () {
  //       const amount = 50
  
  //       it('mints that amount of the new token', async function () {
  //         await this.migrator.migrate(owner, amount)
  
  //         const currentBalance = await this.upgradeableToken.balanceOf(owner)
  //         assert(currentBalance.eq(amount))
  //       })
  
  //       it('transfers given amount of old tokens to the migrator', async function () {
  //         await this.migrator.migrate(owner, amount)
  
  //         const currentMigratorBalance = await this.legacyToken.balanceOf(this.migrator.address)
  //         assert(currentMigratorBalance.eq(amount))
  //       })
  
  //       it('updates the total supply', async function () {
  //         await this.migrator.migrate(owner, amount)
  
  //         const currentSupply = await this.upgradeableToken.totalSupply()
  //         assert(currentSupply.eq(amount))
  //       })
  //     })
  //   })

  //   describe('when the given amount is higher than the one approved', function () {
  //     const amount = 51

  //     it('reverts', async function () {
  //       await assertRevert(this.migrator.migrate(owner, amount))
  //     })
  //   })
  // })
})
