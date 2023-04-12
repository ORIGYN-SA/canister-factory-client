import { Principal } from '@dfinity/principal';
import * as crypto from 'crypto';
import { CanisterInfo, CreationError } from '../../types/canister-factory.types';

export const getCanisterPrincipal = (): Principal => {
  return Principal.fromText('renrk-eyaaa-aaaaa-aaada-cai');
};

export const getWalletPrincipal = (): Principal => {
  return Principal.fromText('5zbug-mphh7-2uckb-6536t-yfnkl-3pylv-zzsqt-wlzuu-v7jxh-m7uj3-kqe');
};

export const generateSubaccount = (): Uint8Array => {
  const array = new Uint8Array(32);
  crypto.randomFillSync(array);
  return array;
};

export const fakeCanisterInfo = (): CanisterInfo => ({
  creation_time: BigInt(Math.floor(Date.now() * Math.random())),
  creator: getWalletPrincipal(),
  canister_id: getCanisterPrincipal(),
  current_wasm_version: Math.random() > 0.5 ? [] : [Math.random().toString(36).substring(2, 6)],
  canister_name: `Test Canister ${Math.random().toString(36).substring(2, 6)}`,
});

export const fakeCreationError = (): CreationError => ({
  subaccount: Math.random() > 0.5 ? [] : [new Uint8Array([1, 2, 3])],
  timestamp: BigInt(Math.floor(Date.now() * Math.random())),
  canister_name: `Failed Canister ${Math.random().toString(36).substring(2, 6)}`,
  block_height: BigInt(Math.floor(Math.random() * 1000)),
});
