export const idlFactory = ({ IDL }) => {
  const VoidResult = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const NatResult = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const TextResult = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const PrincipalArrayResult = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : IDL.Text,
  });
  const TextArrayResult = IDL.Variant({
    'ok' : IDL.Vec(IDL.Text),
    'err' : IDL.Text,
  });
  const CanisterInfo = IDL.Record({
    'creation_time' : IDL.Int,
    'creator' : IDL.Principal,
    'canister_id' : IDL.Principal,
    'current_wasm_version' : IDL.Opt(IDL.Text),
    'canister_name' : IDL.Text,
  });
  const CanisterInfoArrayResult = IDL.Variant({
    'ok' : IDL.Vec(CanisterInfo),
    'err' : IDL.Text,
  });
  const CreationError = IDL.Record({
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'timestamp' : IDL.Int,
    'canister_name' : IDL.Text,
    'block_height' : IDL.Nat64,
  });
  const CreationErrorArrayResult = IDL.Variant({
    'ok' : IDL.Vec(CreationError),
    'err' : IDL.Text,
  });
  const BlobResult = IDL.Variant({
    'ok' : IDL.Vec(IDL.Nat8),
    'err' : IDL.Text,
  });
  const BoolResult = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const CanisterInfoResult = IDL.Variant({
    'ok' : CanisterInfo,
    'err' : IDL.Record({ 'error' : IDL.Text, 'block_height' : IDL.Nat64 }),
  });
  const Nat64Result = IDL.Variant({ 'ok' : IDL.Nat64, 'err' : IDL.Text });
  const CanisterFactory = IDL.Service({
    'add_admins' : IDL.Func([IDL.Vec(IDL.Principal)], [VoidResult], []),
    'add_wasm_chunk' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [NatResult], []),
    'clear_wasm_buffer' : IDL.Func([IDL.Text], [TextResult], []),
    'cycles' : IDL.Func([], [NatResult], []),
    'get_admins' : IDL.Func([], [PrincipalArrayResult], ['query']),
    'get_all_wasm_version_names' : IDL.Func([], [TextArrayResult], ['query']),
    'get_canister_data' : IDL.Func(
        [IDL.Opt(IDL.Int)],
        [CanisterInfoArrayResult],
        ['query'],
      ),
    'get_cost' : IDL.Func([], [IDL.Nat64], ['query']),
    'get_failed_new_canister' : IDL.Func(
        [IDL.Principal],
        [CreationErrorArrayResult],
        ['query'],
      ),
    'get_wasm_version' : IDL.Func([IDL.Text], [BlobResult], ['query']),
    'install_wasm' : IDL.Func([IDL.Text, IDL.Principal], [TextResult], []),
    'is_redeemed' : IDL.Func([IDL.Nat64], [BoolResult], ['query']),
    'new_canister' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Nat64],
        [CanisterInfoResult],
        [],
      ),
    'new_canister_ok' : IDL.Func([], [IDL.Bool], ['query']),
    'remove_admins' : IDL.Func([IDL.Vec(IDL.Principal)], [VoidResult], []),
    'remove_wasm_version' : IDL.Func([IDL.Text], [TextResult], []),
    'reset_admins' : IDL.Func([], [VoidResult], []),
    'set_cost' : IDL.Func([IDL.Nat64], [Nat64Result], []),
    'submit_wasm_version' : IDL.Func([IDL.Text, IDL.Text], [TextResult], []),
  });
  return CanisterFactory;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
