import { randomUUID } from 'crypto'

export class Identity {
  public readonly id: string
  private readonly pubkey: string
  private readonly name: string
  private readonly email: string
  constructor(pubkey: string, name?: string, email?: string) {
    this.id = randomUUID()
    this.name = name
    this.email = email
    this.pubkey = pubkey
    Object.freeze(this)
  }

  public whois() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      pubkey: this.pubkey,
    }
  }
}

export class Transaction {
  readonly from: Address
  readonly to: Address
  readonly type: 'PING' | 'CHECK' | 'TRANSFER' | 'NETWORK'
  private readonly data: any
  constructor(
    from: Address,
    to: Address,
    type: 'PING' | 'CHECK' | 'TRANSFER' | 'NETWORK',
    data: any
  ) {
    this.from = from
    this.to = to
    this.type = type
    this.data = data
  }
}

export class Ledger {
  public readonly id: string
  public readonly owner: Identity
  private readonly data: Transaction
  public readonly hash: string
  public verified: boolean
  public readonly receipt: Identity
  constructor(
    signer: Identity,
    hash: string,
    data: Transaction,
    receipt: Identity
  ) {
    this.id = randomUUID()
    this.owner = signer
    this.data = data
    this.hash = hash
    this.receipt = receipt
    this.verified = false
  }

  sign(key: string) {
    //verify mechanism
    const verifiable = key == this.hash
    this.verified = verifiable
    if (verifiable) Object.freeze(this)
    return verifiable
  }
  broadcast(access: Identity) {
    if (access == this.receipt || access == this.owner) {
      console.log(this.id, ' is verified')
      return this.data
    }
  }
}

export class Address {
  private readonly address_id: string
  private readonly owner: Identity
  private chain: Transaction[]
  constructor(owner: Identity) {
    this.address_id = randomUUID()
    this.owner = owner
    this.chain = []
  }
  whoisOwner() {
    return this.owner.id
  }

  balance() {
    return this.chain
  }
  append(value: Ledger) {
    if (value.verified && value.receipt == this.owner) {
      const val = value.broadcast(this.owner)
      val ? this.chain.push(val) : null
    }
  }
}
