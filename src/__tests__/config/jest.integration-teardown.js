const { execSync } = require('child_process');

execSync('cd canister_factory && echo "##### STOPPING DFX #####" && dfx stop', {
  stdio: 'inherit',
});

module.exports = async () => {
  // no teardown logic
};
