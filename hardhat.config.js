require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-waffle");

const pk_1 = process.env.REACT_APP_BOBA_PRIVATE_KEY;
console.log(pk_1);
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    boba_rinkeby: {
      url: "https://rinkeby.boba.network",
      accounts: [pk_1],
    },
  },
};
