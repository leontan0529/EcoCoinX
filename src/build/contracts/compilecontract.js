const fs = require('fs');
const solc = require('solc');

const contractPath = 'CarbonContract.sol';
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

const contractABI = compiledContract.contracts[contractPath]['CarbonContract'].abi;
const contractBytecode = compiledContract.contracts[contractPath]['CarbonContract'].evm.bytecode.object;

const output = {
    abi: contractABI,
    bytecode: contractBytecode,
};

fs.writeFileSync('CarbonContract.json', JSON.stringify(output, null, 2), 'utf-8');

console.log('Contract ABI and Bytecode saved to CarbonContract.json');
