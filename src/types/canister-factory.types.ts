// Generated from dfx
// tslint:disable
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BlobResult = { ok: Uint8Array | number[] } | { err: string };
export type BoolResult = { ok: boolean } | { err: string };
export interface CanisterFactory {
  add_admins: ActorMethod<[Array<Principal>], VoidResult>;
  add_wasm_chunk: ActorMethod<[string, Uint8Array | number[]], NatResult>;
  clear_wasm_buffer: ActorMethod<[string], TextResult>;
  cycles: ActorMethod<[], NatResult>;
  get_admins: ActorMethod<[], PrincipalArrayResult>;
  get_all_wasm_version_names: ActorMethod<[], TextArrayResult>;
  get_canister_data: ActorMethod<[[] | [bigint]], CanisterInfoArrayResult>;
  get_cost: ActorMethod<[], bigint>;
  get_failed_new_canister: ActorMethod<[Principal], CreationErrorArrayResult>;
  get_wasm_version: ActorMethod<[string], BlobResult>;
  install_wasm: ActorMethod<[string, Principal], TextResult>;
  is_redeemed: ActorMethod<[bigint], BoolResult>;
  new_canister: ActorMethod<[string, [] | [Uint8Array | number[]], bigint], CanisterInfoResult>;
  new_canister_ok: ActorMethod<[], boolean>;
  remove_admins: ActorMethod<[Array<Principal>], VoidResult>;
  remove_wasm_version: ActorMethod<[string], TextResult>;
  reset_admins: ActorMethod<[], VoidResult>;
  set_cost: ActorMethod<[bigint], Nat64Result>;
  submit_wasm_version: ActorMethod<[string, string], TextResult>;
}
export interface CanisterInfo {
  creation_time: bigint;
  creator: Principal;
  canister_id: Principal;
  current_wasm_version: [] | [string];
  canister_name: string;
}
export type CanisterInfoArrayResult = { ok: Array<CanisterInfo> } | { err: string };
export type CanisterInfoResult =
  | { ok: CanisterInfo }
  | { err: { error: string; block_height: bigint } };
export interface CreationError {
  subaccount: [] | [Uint8Array | number[]];
  timestamp: bigint;
  canister_name: string;
  block_height: bigint;
}
export type CreationErrorArrayResult = { ok: Array<CreationError> } | { err: string };
export type Nat64Result = { ok: bigint } | { err: string };
export type NatResult = { ok: bigint } | { err: string };
export type PrincipalArrayResult = { ok: Array<Principal> } | { err: string };
export type TextArrayResult = { ok: Array<string> } | { err: string };
export type TextResult = { ok: string } | { err: string };
export type VoidResult = { ok: null } | { err: string };
export interface _SERVICE extends CanisterFactory {}
