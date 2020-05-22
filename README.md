# ERC20 opt-in onboarding

**Upgraded from OZ tutorial to use latest OpenZeppelin SDK.**

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
# Call beginMigration
# Change ERC20 ownership from deployer account
# Change migrator whitelist admin role
oz send-tx
oz set-admin
# Check token cap, for example
oz call
```
