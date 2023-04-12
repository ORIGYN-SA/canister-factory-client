import canisterIds from '../../../canister_factory/.dfx/local/canister_ids.json';
import { idlFactory } from '../../idl';
import canisterFactoryClient from '../../client';
import { getCanisterPrincipal } from '../utils/test-utils';

xdescribe('canisterFactoryClient', () => {
  describe('unauthorized', () => {
    beforeAll(async () => {
      await canisterFactoryClient.init({
        canisterId: canisterIds.canister_factory.local,
        idlFactory: idlFactory,
        isLocal: true,
      });
    });

    //##########################################################
    //####################    ADMIN    #########################
    //##########################################################

    test('getAdmins throws Unauthorized error', async () => {
      await expect(canisterFactoryClient.getAdmins()).rejects.toThrowError('Unauthorized');
    });

    test('addAdmins throws Unauthorized error', async () => {
      const admins = []; // Add a list of Principal instances you want to add as admins
      await expect(canisterFactoryClient.addAdmins(admins)).rejects.toThrowError('Unauthorized');
    });

    test('removeAdmins throws Unauthorized error', async () => {
      const admins = []; // Add a list of Principal instances you want to remove as admins
      await expect(canisterFactoryClient.removeAdmins(admins)).rejects.toThrowError('Unauthorized');
    });

    test('resetAdmins throws Unauthorized error', async () => {
      await expect(canisterFactoryClient.resetAdmins()).rejects.toThrowError('Unauthorized');
    });

    test('setCost throws not developer error', async () => {
      const newCost = 100n;
      await expect(canisterFactoryClient.setCost(newCost)).rejects.toThrowError(
        'Creation price can only be set by deployer',
      );
    });

    test('getCost throws Unauthorized error', async () => {
      const expected = 100000000000n;
      let actual = await canisterFactoryClient.getCost();
      await expect(actual).toEqual(expected);
    });

    test('getFailedNewCanister throws Unauthorized error', async () => {
      const principal = getCanisterPrincipal();
      await expect(canisterFactoryClient.getFailedNewCanister(principal)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    test('isRedeemed throws Unauthorized error', async () => {
      const blockHeight = 0n;
      await expect(canisterFactoryClient.isRedeemed(blockHeight)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    //##########################################################
    //####################    WASM     #########################
    //##########################################################

    test('getWasmVersion throws Unauthorized error', async () => {
      const versionName = 'test';
      await expect(canisterFactoryClient.getWasmVersion(versionName)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    test('getAllWasmVersionNames throws Unauthorized error', async () => {
      await expect(canisterFactoryClient.getAllWasmVersionNames()).rejects.toThrowError(
        'Unauthorized',
      );
    });

    test('addWasmChunk throws Unauthorized error', async () => {
      const versionName = 'test';
      const chunk = new Uint8Array();
      await expect(canisterFactoryClient.addWasmChunk(versionName, chunk)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    test('submitWasmVersion throws Unauthorized error', async () => {
      const versionName = 'test';
      const source = 'test_source';
      await expect(
        canisterFactoryClient.submitWasmVersion(versionName, source),
      ).rejects.toThrowError('Unauthorized');
    });

    test('clearWasmBuffer throws Unauthorized error', async () => {
      const versionName = 'test';
      await expect(canisterFactoryClient.clearWasmBuffer(versionName)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    test('removeWasmVersion throws Unauthorized error', async () => {
      const versionName = 'test';
      await expect(canisterFactoryClient.removeWasmVersion(versionName)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    //##########################################################
    //###################   CANISTER   #########################
    //##########################################################

    test('getCanisterData throws Unauthorized error', async () => {
      const index: [bigint] = [1n];
      await expect(canisterFactoryClient.getCanisterData(index)).rejects.toThrowError(
        'Unauthorized',
      );
    });

    test('newCanisterOk throws Unauthorized error', async () => {
      const expected = true;
      const actual = await canisterFactoryClient.newCanisterOk();
      await expect(actual).toEqual(expected);
    });

    test('installWasm throws Unauthorized error', async () => {
      const versionName = '0.1.5';
      const canisterId = getCanisterPrincipal();
      await expect(canisterFactoryClient.installWasm(versionName, canisterId)).rejects.toThrowError(
        'Canister not found',
      );
    });

    //##########################################################
    //###################    CYCLES    #########################
    //##########################################################

    test('cycles throws Unauthorized error', async () => {
      await expect(canisterFactoryClient.cycles()).rejects.toThrowError('Unauthorized');
    });
  });
});
