import { Address, Identity, Ledger, Transaction } from './core/structure'

const user1 = new Identity('pubkey101', 'PatrickChoDev')
const user2 = new Identity('pubkey901', 'DumperNet','lol.net@gmail.com')
const wallet1 = new Address(user1)
const wallet2 = new Address(user2)
const trans1 = new Transaction(wallet1,wallet2,'TRANSFER',{amount: 123})
const ledg1 = new Ledger(user1,'hi',trans1,user2)
ledg1.sign('hi')
wallet2.append(ledg1)
console.log(wallet2.balance())
