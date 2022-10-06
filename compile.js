const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol") // dirname means path of current working directory (in this case 'inbox')
const source = fs.readFileSync(inboxPath, "utf8")
/*We read in the Inbox.sol file in this way because 'require' statements in javascript tried to execute that code contained in the 
required file immediately. We cannot do that here because Node cannot execute the Solidity code and Inbox.sol is Solidity code
*/

const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
}

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts)

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox