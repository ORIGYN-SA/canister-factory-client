import { Agent } from '@dfinity/agent';
import { ActorOptions } from '@origyn/actor-reference';
import canisterFactoryClient from '../../client';
import { CanisterInfo, CreationError } from '../../types/canister-factory.types';
import {
  getCanisterPrincipal,
  getWalletPrincipal,
  fakeCanisterInfo,
  fakeCreationError,
} from '../utils/test-utils';

//##########################################################
//####################    MOCKS    #########################
//##########################################################

const mockAgent: Partial<Agent> = {
  rootKey: undefined,
  getPrincipal: jest.fn(),
  readState: jest.fn(),
  call: jest.fn(),
  fetchRootKey: jest.fn(),
  status: jest.fn(),
};

// Mock actor methods
const mockActorMethods = {
  get_cost: jest.fn(),
  add_admins: jest.fn(),
  add_wasm_chunk: jest.fn(),
  clear_wasm_buffer: jest.fn(),
  cycles: jest.fn(),
  get_admins: jest.fn(),
  get_all_wasm_version_names: jest.fn(),
  get_canister_data: jest.fn(),
  get_failed_new_canister: jest.fn(),
  get_wasm_version: jest.fn(),
  install_wasm: jest.fn(),
  is_redeemed: jest.fn(),
  new_canister: jest.fn(),
  new_canister_ok: jest.fn(),
  remove_admins: jest.fn(),
  remove_wasm_version: jest.fn(),
  reset_admins: jest.fn(),
  set_cost: jest.fn(),
  submit_wasm_version: jest.fn(),
};

// Mock getActor
jest.mock('@origyn/actor-reference', () => ({
  getActor: () => {
    return Promise.resolve(mockActorMethods);
  },
}));

//##########################################################
//####################    TESTS    #########################
//##########################################################
describe('canisterFactoryClient', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    const options: ActorOptions<any> = {
      agent: mockAgent as Agent,
      canisterId: 'some-canister-id',
      idlFactory: jest.fn(),
    };

    await canisterFactoryClient.init(options);
  });

  //##########################################################
  //####################    INIT    ##########################
  //##########################################################

  test('init', async () => {
    const options: ActorOptions<any> = {
      agent: mockAgent as Agent,
      canisterId: 'some-canister-id',
      idlFactory: jest.fn(),
    };
    await canisterFactoryClient.init(options);
    expect(mockActorMethods.get_cost).not.toHaveBeenCalled();
  });

  //##########################################################
  //####################    ADMIN    #########################
  //##########################################################

  test('getAdmins', async () => {
    const expectedAdmins = [getWalletPrincipal(), getWalletPrincipal()];
    mockActorMethods.get_admins.mockResolvedValue({ ok: expectedAdmins });
    const admins = await canisterFactoryClient.getAdmins();
    expect(admins).toEqual(expectedAdmins);
    expect(mockActorMethods.get_admins).toHaveBeenCalled();
  });

  test('addAdmins', async () => {
    const admins = [getWalletPrincipal(), getWalletPrincipal()];
    mockActorMethods.add_admins.mockResolvedValue({ ok: undefined });
    await canisterFactoryClient.addAdmins(admins);
    expect(mockActorMethods.add_admins).toHaveBeenCalledWith(admins);
  });

  test('removeAdmins', async () => {
    const admins = [getWalletPrincipal(), getWalletPrincipal()];
    mockActorMethods.remove_admins.mockResolvedValue({ ok: undefined });
    await canisterFactoryClient.removeAdmins(admins);
    expect(mockActorMethods.remove_admins).toHaveBeenCalledWith(admins);
  });

  test('resetAdmins', async () => {
    mockActorMethods.reset_admins.mockResolvedValue({ ok: undefined });
    await canisterFactoryClient.resetAdmins();
    expect(mockActorMethods.reset_admins).toHaveBeenCalled();
  });

  test('setCost', async () => {
    const newCost = 200n;
    const expectedCost = newCost;
    mockActorMethods.set_cost.mockResolvedValue({ ok: expectedCost });
    const cost = await canisterFactoryClient.setCost(newCost);
    expect(cost).toEqual(expectedCost);
    expect(mockActorMethods.set_cost).toHaveBeenCalledWith(newCost);
  });

  test('getCost', async () => {
    const expectedCost = 100n;
    mockActorMethods.get_cost.mockResolvedValue(expectedCost);
    const cost = await canisterFactoryClient.getCost();
    expect(cost).toEqual(expectedCost);
    expect(mockActorMethods.get_cost).toHaveBeenCalled();
  });

  test('getFailedNewCanister', async () => {
    const principal = getWalletPrincipal();
    const expectedFailedNewCanister: CreationError[] = [fakeCreationError()];
    mockActorMethods.get_failed_new_canister.mockResolvedValue({ ok: expectedFailedNewCanister });
    const failedNewCanister = await canisterFactoryClient.getFailedNewCanister(principal);
    expect(failedNewCanister).toEqual(expectedFailedNewCanister);
    expect(mockActorMethods.get_failed_new_canister).toHaveBeenCalledWith(principal);
  });

  test('isRedeemed', async () => {
    const blockHeight = 42n;
    const expectedResult = true;
    mockActorMethods.is_redeemed.mockResolvedValue({ ok: expectedResult });
    const result = await canisterFactoryClient.isRedeemed(blockHeight);
    expect(result).toEqual(expectedResult);
    expect(mockActorMethods.is_redeemed).toHaveBeenCalledWith(blockHeight);
  });

  //##########################################################
  //####################    WASM     #########################
  //##########################################################

  test('getWasmVersion', async () => {
    const versionName = 'v1';
    const expectedWasmVersion = new Uint8Array([1, 2, 3]);
    mockActorMethods.get_wasm_version.mockResolvedValue({ ok: expectedWasmVersion });
    const wasmVersion = await canisterFactoryClient.getWasmVersion(versionName);
    expect(wasmVersion).toEqual(expectedWasmVersion);
    expect(mockActorMethods.get_wasm_version).toHaveBeenCalledWith(versionName);
  });

  test('getAllWasmVersionNames', async () => {
    const expectedVersionNames = ['v1', 'v2', 'v3'];
    mockActorMethods.get_all_wasm_version_names.mockResolvedValue({ ok: expectedVersionNames });
    const versionNames = await canisterFactoryClient.getAllWasmVersionNames();
    expect(versionNames).toEqual(expectedVersionNames);
    expect(mockActorMethods.get_all_wasm_version_names).toHaveBeenCalled();
  });

  test('addWasmChunk', async () => {
    const versionName = 'v1';
    const chunk = new Uint8Array([1, 2, 3]);
    const expectedOffset = 123n;
    mockActorMethods.add_wasm_chunk.mockResolvedValue({ ok: expectedOffset });
    const offset = await canisterFactoryClient.addWasmChunk(versionName, chunk);
    expect(offset).toEqual(expectedOffset);
    expect(mockActorMethods.add_wasm_chunk).toHaveBeenCalledWith(versionName, chunk);
  });

  test('submitWasmVersion', async () => {
    const versionName = 'v1';
    const source = 'some source code';
    const expectedMessage = 'Submitted';
    mockActorMethods.submit_wasm_version.mockResolvedValue({ ok: expectedMessage });
    const message = await canisterFactoryClient.submitWasmVersion(versionName, source);
    expect(message).toEqual(expectedMessage);
    expect(mockActorMethods.submit_wasm_version).toHaveBeenCalledWith(versionName, source);
  });

  test('clearWasmBuffer', async () => {
    const versionName = 'v1';
    const expectedMessage = 'Cleared buffer';
    mockActorMethods.clear_wasm_buffer.mockResolvedValue({ ok: expectedMessage });
    const message = await canisterFactoryClient.clearWasmBuffer(versionName);
    expect(message).toEqual(expectedMessage);
    expect(mockActorMethods.clear_wasm_buffer).toHaveBeenCalledWith(versionName);
  });

  test('removeWasmVersion', async () => {
    const versionName = 'v1';
    const expectedMessage = 'Removed';
    mockActorMethods.remove_wasm_version.mockResolvedValue({ ok: expectedMessage });
    const message = await canisterFactoryClient.removeWasmVersion(versionName);
    expect(message).toEqual(expectedMessage);
    expect(mockActorMethods.remove_wasm_version).toHaveBeenCalledWith(versionName);
  });

  //##########################################################
  //###################   CANISTER   #########################
  //##########################################################

  test('getCanisterData', async () => {
    const index: [] | [bigint] = [42n];
    const expectedCanisterData: CanisterInfo[] = [fakeCanisterInfo()];
    mockActorMethods.get_canister_data.mockResolvedValue({ ok: expectedCanisterData });
    const canisterData = await canisterFactoryClient.getCanisterData(index);
    expect(canisterData).toEqual(expectedCanisterData);
    expect(mockActorMethods.get_canister_data).toHaveBeenCalledWith(index);
  });

  test('newCanisterOk', async () => {
    const expectedResult = true;
    mockActorMethods.new_canister_ok.mockResolvedValue(expectedResult);
    const result = await canisterFactoryClient.newCanisterOk();
    expect(result).toEqual(expectedResult);
    expect(mockActorMethods.new_canister_ok).toHaveBeenCalled();
  });

  test('newCanister', async () => {
    const canisterName = 'Test Canister';
    const subaccount: [Uint8Array] = [new Uint8Array([1, 2, 3])];
    const cycles = 1000n;
    const expectedCanisterInfo: CanisterInfo = fakeCanisterInfo();
    mockActorMethods.new_canister.mockResolvedValue({ ok: expectedCanisterInfo });
    const canisterInfo = await canisterFactoryClient.newCanister(canisterName, subaccount, cycles);
    expect(canisterInfo).toEqual(expectedCanisterInfo);
    expect(mockActorMethods.new_canister).toHaveBeenCalledWith(canisterName, subaccount, cycles);
  });

  test('installWasm', async () => {
    const versionName = 'v1';
    const canisterId = getCanisterPrincipal();
    const expectedMessage = 'Installed';
    mockActorMethods.install_wasm.mockResolvedValue({ ok: expectedMessage });
    const message = await canisterFactoryClient.installWasm(versionName, canisterId);
    expect(message).toEqual(expectedMessage);
    expect(mockActorMethods.install_wasm).toHaveBeenCalledWith(versionName, canisterId);
  });

  //##########################################################
  //###################    CYCLES    #########################
  //##########################################################

  test('cycles', async () => {
    const expectedCycles = 10_000_000_000_000n;
    mockActorMethods.cycles.mockResolvedValue({ ok: expectedCycles });
    const cycles = await canisterFactoryClient.cycles();
    expect(cycles).toEqual(expectedCycles);
    expect(mockActorMethods.cycles).toHaveBeenCalled();
  });
});
