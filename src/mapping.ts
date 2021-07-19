import { log } from "@graphprotocol/graph-ts"
import {
  bayc,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer
} from "../generated/bayc/bayc"
import { 
  Approval as ApprovalSchema,
  Transfer as TransferSchema,
  ApprovalForAll as ApprovalForAllSchema,
  OwnershipTransferred as OwnershipTransferredSchema,
 } from "../generated/schema"

export function handleApproval(event: Approval): void {
  log.info('Message to be displayed: {}, {}', [
    event.params.owner.toHex(),
    'HandleApproval',
  ])
  let entity = new ApprovalSchema(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId;
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BAYC_PROVENANCE(...)
  // - contract.MAX_APES(...)
  // - contract.REVEAL_TIMESTAMP(...)
  // - contract.apePrice(...)
  // - contract.balanceOf(...)
  // - contract.baseURI(...)
  // - contract.getApproved(...)
  // - contract.isApprovedForAll(...)
  // - contract.maxApePurchase(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.saleIsActive(...)
  // - contract.startingIndex(...)
  // - contract.startingIndexBlock(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('Message to be displayed: {}, {}', [
    event.params.owner.toHex(),
    'HandleApprovalForAll',
  ])
  let entity = new ApprovalForAllSchema(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.approved = event.params.approved
  entity.operator = event.params.operator
  entity.owner = event.params.owner
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  log.info('Message to be displayed: {}, {}', [
    event.params.newOwner.toHex(),
    'handleOwnershipTransferred',
  ])
  let entity = new OwnershipTransferredSchema(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.newOwner = event.params.newOwner
  entity.previousOwner = event.params.previousOwner
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  log.info('Message to be displayed: {}, {}', [
    event.params.from.toHex(),
    'handleTransfer',
  ])
  let entity = new TransferSchema(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
