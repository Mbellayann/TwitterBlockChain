const ropsten_mnemonic = "liberty excess ripple file salad trust describe motor twenty media average elephant";
module.exports = {
  
  networks: {
    ropsten: {
			provider: () =>
				new HDWalletProvider(
					ropsten_mnemonic,
					"https://ropsten.infura.io/v3/dd8a519c43fb4765a10072dd11b04048"
				),
			network_id: "3",
			gas: 8000000,
		},
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
    
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },

  compilers: {
		solc: {
			version: "0.8.1", // Fetch exact version from solc-bin (default: truffle's version)
			// docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
			// settings: {          // See the solidity docs for advice about optimization and evmVersion
			//  optimizer: {
			//    enabled: false,
			//    runs: 200
			//  },
			//  evmVersion: "byzantium"
			// }
		},
	}
}
