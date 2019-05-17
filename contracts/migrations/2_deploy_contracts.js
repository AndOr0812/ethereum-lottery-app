var OracleAda = artifacts.require("OracleAda");
var LotteryAda = artifacts.require("LotteryAda");

module.exports = function(deployer) {
    deployer.deploy(OracleAda).then(function() {
        return deployer.deploy(LotteryAda, OracleAda.address, 190);
      });
};