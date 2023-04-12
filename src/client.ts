import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';
import { getActor, ActorOptions } from '@origyn/actor-reference';
import { CanisterInfo, CreationError } from './types/canister-factory.types';
import * as T from './types/canister-factory.types';

let canisterActor: ActorSubclass<T.CanisterFactory> | undefined;

const getActorInstance = async (): Promise<ActorSubclass<T.CanisterFactory>> => {
  if (!canisterActor) {
    throw new Error('Canister actor not initialized');
  }
  return canisterActor!;
};

const canisterFactoryClient = {
  // ##########################################################
  // ####################    INIT    ##########################
  // ##########################################################

  init: async (options: ActorOptions<T.CanisterFactory>): Promise<void> => {
    canisterActor = await getActor<T.CanisterFactory>(options);
  },

  // ##########################################################
  // ####################    ADMIN    #########################
  // ##########################################################

  getAdmins: async (): Promise<Principal[]> => {
    const actor = await getActorInstance();
    const result = await actor.get_admins();
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  addAdmins: async (admins: Principal[]): Promise<void> => {
    const actor = await getActorInstance();
    const result = await actor.add_admins(admins);
    if ('err' in result) {
      throw new Error(result.err);
    }
  },

  removeAdmins: async (admins: Principal[]): Promise<void> => {
    const actor = await getActorInstance();
    const result = await actor.remove_admins(admins);
    if ('err' in result) {
      throw new Error(result.err);
    }
  },

  resetAdmins: async (): Promise<void> => {
    const actor = await getActorInstance();
    const result = await actor.reset_admins();
    if ('err' in result) {
      throw new Error(result.err);
    }
  },

  setCost: async (newCost: bigint): Promise<bigint> => {
    const actor = await getActorInstance();
    const result = await actor.set_cost(newCost);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  getCost: async (): Promise<bigint> => {
    const actor = await getActorInstance();
    return await actor.get_cost();
  },

  getFailedNewCanister: async (canisterId: Principal): Promise<CreationError[]> => {
    const actor = await getActorInstance();
    const result = await actor.get_failed_new_canister(canisterId);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  isRedeemed: async (blockHeight: bigint): Promise<boolean> => {
    const actor = await getActorInstance();
    const result = await actor.is_redeemed(blockHeight);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  // ##########################################################
  // ####################    WASM     #########################
  // ##########################################################

  getWasmVersion: async (versionName: string): Promise<Uint8Array | number[]> => {
    const actor = await getActorInstance();
    const result = await actor.get_wasm_version(versionName);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  getAllWasmVersionNames: async (): Promise<string[]> => {
    const actor = await getActorInstance();
    const result = await actor.get_all_wasm_version_names();
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  addWasmChunk: async (versionName: string, chunk: Uint8Array | number[]): Promise<bigint> => {
    const actor = await getActorInstance();
    const result = await actor.add_wasm_chunk(versionName, chunk);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  submitWasmVersion: async (versionName: string, source: string): Promise<string> => {
    const actor = await getActorInstance();
    const result = await actor.submit_wasm_version(versionName, source);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  clearWasmBuffer: async (versionName: string): Promise<string> => {
    const actor = await getActorInstance();
    const result = await actor.clear_wasm_buffer(versionName);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  removeWasmVersion: async (versionName: string): Promise<string> => {
    const actor = await getActorInstance();
    const result = await actor.remove_wasm_version(versionName);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  // ##########################################################
  // ###################   CANISTER   #########################
  // ##########################################################

  getCanisterData: async (index: [] | [bigint]): Promise<CanisterInfo[]> => {
    const actor = await getActorInstance();
    const result = await actor.get_canister_data(index);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  /**
   * Pre-check to see if there are enough cycles on the canister to create a new canister
   * @returns true if there are enough cycles, otherwise false
   */
  newCanisterOk: async (): Promise<boolean> => {
    const actor = await getActorInstance();
    return await actor.new_canister_ok();
  },

  newCanister: async (
    canisterName: string,
    subaccount: [] | [Uint8Array | number[]],
    cycles: bigint,
  ): Promise<CanisterInfo> => {
    const actor = await getActorInstance();
    const result = await actor.new_canister(canisterName, subaccount, cycles);
    if ('err' in result) {
      throw new Error(result.err.error);
    } else {
      return result.ok;
    }
  },

  installWasm: async (versionName: string, canisterId: Principal): Promise<string> => {
    const actor = await getActorInstance();
    const result = await actor.install_wasm(versionName, canisterId);
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },

  // ##########################################################
  // ###################    CYCLES    #########################
  // ##########################################################

  cycles: async (): Promise<bigint> => {
    const actor = await getActorInstance();
    const result = await actor.cycles();
    if ('err' in result) {
      throw new Error(result.err);
    } else {
      return result.ok;
    }
  },
};

export default canisterFactoryClient;
