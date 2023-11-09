const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { abi, evm } = require('./EcoCoin/EcoCoin.json'); // Replace with the path to your contract JSON file

const provider = new HDWalletProvider('YOUR_MNEMONIC', 'YOUR_INFURA_URL'); // Replace with your mnemonic and Infura URL
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    console.log('Contract deployed to', result.options.address);
};

deploy();
