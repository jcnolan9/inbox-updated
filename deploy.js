// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider') 
//truffle creates a provider for us that lets us access the rinkeby network via infura with a real account
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
    'wonder globe aerobic combine way poem immense guilt frown marriage insane hover',
     'https://rinkeby.infura.io/v3/1bccd90e53de4153b124fcf4fa6a5d2a'
)

const web3 = new Web3(provider) 

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    
    console.log("Deploying from acocunt ", accounts[0])

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] })

    console.log('contract address at: ', result.options.address) 
    provider.engine.stop() //wtf is this, was not explained in the video
    
}

deploy()

