'use strict';

require('dotenv').config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const network_id = process.env.NETWORK_ID;

var network;

switch (network_id) {
  case '0':
   network = 'mainnet';
   break;
  case '4':
   network = 'rinkeby';
   break;
  default:
   network = 'rinkeby';
}

const rpc_url = `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*'
    },
    remote: {
      provider: function() {
        return new HDWalletProvider(mnemonic, rpc_url)
      },
      network_id: network_id
    }
  }
};
