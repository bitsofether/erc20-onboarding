# ERC20 opt-in onboarding

**Upgraded from OZ tutorial to use latest OpenZeppelin SDK by @BenSchZA**

This is a sample project illustrating how a regular ERC20 token can be migrated to an upgradeable ERC20 using the OpenZeppelin SDK. Please follow our [official documentation](https://docs.zeppelinos.org/docs/erc20_onboarding.html) to better understand how to onboard your token to the OpenZeppelin SDK.

```bash
npm run-script build
npm test
```

# Deployment

Read https://docs.openzeppelin.com/learn/preparing-for-mainnet

You'll need:
* Legacy ERC20 contract address
* Admin address
* Deployer seed and address

Use `oz accounts` to list accounts, where the seed is fetched from `secrets.json`, and use `oz balance` to check deployer account balance.

```bash
oz add IXOToken
oz add ERC20Migrator
oz push
oz create ERC20Migrator
oz create IXOToken
# Call ERC20Migrator.beginMigration()
oz send-tx
# Set deployer as whitelist user (NB: this is necessary in addition to being an admin)
oz send-tx
# Confirm token cap, other details, for example
oz call
```

# Basic migration steps

1. On legacy token contract, each user that wants to migrate has to first approve the transfer of X tokens to migrator contract
2. On migrator contract, call the migrate function
3. The legacy token will be burnt, and the new token will be minted

# Post-deployment steps

1. IXOToken.transferOwnership(newOwner)
2. Migrator.addWhitelistAdmin(newOwner)
3. Migrator.addWhitelisted(newOwner)
4. Migrator.renounceWhitelistAdmin(deployer)
5. Migrator.renounceWhitelisted(deployer)
6. Finally, set new OpenZeppelin admin with `npx oz set-admin`

# Verified code

After running `npx oz verify _`:
* ERC20Migrator: https://etherscan.io/address/0x9B6028ea9CC135C121bd8EAb7510ec7E19347E4E#code
* IXOToken https://etherscan.io/address/0x58c3Be0F213A495B879B7558A56D734A90b3B2d4#code
