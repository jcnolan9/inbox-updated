// contract test code will go here
const assert = require('assert') //built-in to Node 
const ganache = require('ganache-cli')
const Web3 = require('web3')
//when you import web3 you are actually importing a constructor function that will create an instance of the Web3 library
//thus it is capitalized after 'const'when importing 

const web3 = new Web3(ganache.provider()) //it is lowecase because this is an instance of Web3
//the provider or ganache provider is like a communication layer between ganache and the Web3 library instance. 
//It is needed for Web3 and the local ganache network to be able to communication between each other 
//We will use a different provider when trying to interact with different networks (e.g. rinkeby, goerli, etc)

const { abi, evm } = require('../compile')

let accounts
let inbox
let initialString = 'Hi there!'

beforeEach(async ()=> {
    //get a list of all accounts 
    accounts = await web3.eth.getAccounts()
        
    /*
    .then(fetchedAccounts => {
            console.log(fetchedAccounts)
        })
     all web3 functions are asynchronous. They all return promises or can use async/await 
     */ 


    
     //use one of  those accounts to deploy the contract 
     inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [initialString]}) //doesn't actually deploy anything. creates an object that can be deployed
        .send({ from: accounts[0], gas:'1000000' }) //actually starts the contract deployment. Tells web3 to send out a transaction that creates this contract 

    //you can call functions on the 'inbox' variable as it's a representation of what has been deployed to the blockchain 
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
        console.log('address: ', inbox.options.address)
        /*
            the 'inbox' variable represents a contract object with 'options' and 'methods' sub-objects amongst many others
            in the 'options' object is a property called 'address'. We want to check to make sure this address exits
            If it exists we can assume this contract has actually been deployed

            the 'ok' method on assert makes sure that whatever you are passing it actually exists (is not null or undefined)
        */
    })

    it('initial message exists', async ()=> { //use async-await because...web3 shit is asynchronous and returns promises?
        const message = await inbox.methods.message().call() 
        assert.equal(message, initialString )
        //can pass in function paramters inside the  () after message
        //can pass in transaction parameters inside the () after call (e.g. account creating the transaction, gas) if modifying data on the blockchain 
    })

    it('can update message and retrieve new value', async ()=> {
        await inbox.methods.setMessage("what up tho!").send({ from: accounts[0]  })
        const message = await inbox.methods.message().call()
        assert.equal(message, "what up tho!")
    })


})















/*
Mocha Functions 
- it
    - run a test and make an assertion
- describe
    - groups together 'it' functions
-beforeEach 
    - execute some general setup code for example when you need so use the same logic for multiple 'it' tests so you can write the logic once 



class Car {
    park() {
        return 'stopped'
    }

    drive() {
        return 'vroom'
    }
}


let car 

beforeEach(() => {
    car = new Car()
})


describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped')
    })

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom')
    })
})

/*to run the test open the terminal, make sure you're in your project folder, "npm run test"
in the package.json file under 'scripts:' should be 'test': 'mocha' 
*/