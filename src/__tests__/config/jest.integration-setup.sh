#!/bin/bash

# Install expect if it is not already installed
if ! command -v expect &> /dev/null
then
    echo "expect is not installed. Installing now..."
    ./src/__tests__/config/install-expect.sh
fi

# change to project root
echo ""
echo "##### Current Directory #####"
pwd

# pull submodules and dependencies
git submodule update --init --recursive

cd canister_factory

# git submodule update --init --recursive
vessel install
# npm i

# use or create factory_tester identity
if [ $(dfx identity whoami) != "factory_tester" ]
then
    dfx identity use factory_tester || (dfx identity new factory_tester --disable-encryption && dfx identity use factory_tester)
fi

# import export pem file
if [ ! -f "../identity.pem" ]
then
    echo "exporting factory_tester pem file to \"../identity.pem\""
    dfx identity export factory_tester > ../identity.pem
fi

# start dfx if not started already
dfx ping || dfx start --clean --background

# create all canisters
dfx canister create --all

# OGY ledger canister
echo "#### Building OGY ledger canister ####"
dfx build ogy_tokens
echo "#### OGY ledger canister built ####"
account_id="$(dfx ledger account-id)"
principal="$(dfx identity get-principal)"
install_arg="(record { minting_account = \"${account_id}\"; \
initial_values = vec { record { \"${account_id}\"; record { e8s = 18446744073709551615:nat64 } } }; \
max_message_size_bytes = null; \
transaction_window = null; \
archive_options = opt record { \
  trigger_threshold = 2000:nat64; \
  num_blocks_to_archive = 1000:nat64; \
  node_max_memory_size_bytes = null; \
  max_message_size_bytes = null; \
  controller_id = principal \"${principal}\" \
}; \
send_whitelist = vec {}; \
standard_whitelist = vec {}; \
transfer_fee = null; \
token_symbol = null; \
token_name = null; \
admin = principal \"${principal}\" \
})"

echo "$install_arg"

dfx canister install ogy_tokens --wasm="./ogy_tokens/ledger-canister-min.wasm.gz" --mode=reinstall --argument="$install_arg"
echo "#### OGY ledger canister installed ####"

# Canister factory canister
dfx build canister_factory
dfx canister install canister_factory --mode=reinstall --argument "(principal \"$(dfx canister id ogy_tokens)\")"
echo "#### Canister factory canister installed ####"

# Build Origyn NFT wasm
dfx build origyn_nft
gzip -kf ./.dfx/local/canisters/origyn_nft/origyn_nft.wasm

# fabricate cycles for canister creation
dfx ledger fabricate-cycles --canister canister_factory          --t 50
dfx ledger fabricate-cycles --canister canister_factory_set_cost --t 50

echo "##### INTEGRATION TESTING SETUP SCRIPT COMPLETE #####"