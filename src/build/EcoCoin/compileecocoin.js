const fs = require('fs');
const solc = require('solc');

const contractPath = 'EcoCoin.sol';
const sourceCode = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        [contractPath]: {
            content: sourceCode,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

const contractABI = compiledContract.contracts[contractPath]['EcoCoin'].abi;
const contractBytecode = compiledContract.contracts[contractPath]['EcoCoin'].evm.bytecode.object;

const output = {
    abi: contractABI,
    bytecode: contractBytecode,
};

fs.writeFileSync('EcoCoin.json', JSON.stringify(output, null, 2), 'utf-8');

console.log('Contract ABI and Bytecode saved to EcoCoin.json');
