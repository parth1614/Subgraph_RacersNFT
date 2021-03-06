import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  ClaimableStatusUpdated,
  Paused,
  RewardPaid,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Staked,
  Unpaused,
  Unstaked
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleClaimableStatusUpdated(
  event: ClaimableStatusUpdated
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.status = event.params.status

  // Entities can be written to the store with `.save()`
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
  // - contract.CEO(...)
  // - contract.CFO(...)
  // - contract.CTO(...)
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.EOC(...)
  // - contract.RACE(...)
  // - contract.eocValue(...)
  // - contract.getRoleAdmin(...)
  // - contract.getStakedTokens(...)
  // - contract.hasRole(...)
  // - contract.onERC721Received(...)
  // - contract.paused(...)
  // - contract.rewardsPerSec(...)
  // - contract.secsInYear(...)
  // - contract.stakedRacersTotal(...)
  // - contract.stakers(...)
  // - contract.supportsInterface(...)
  // - contract.tokenOwner(...)
  // - contract.tokenStakedTime(...)
  // - contract.tokensClaimable(...)
}

export function handlePaused(event: Paused): void {}

export function handleRewardPaid(event: RewardPaid): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleStaked(event: Staked): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleUnstaked(event: Unstaked): void {}
