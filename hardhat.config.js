require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-waffle");

const pk_1 = process.env.REACT_APP_PRIVATE_KEY;

console.log(pk_1);
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    boba_rinkeby: {
      url: "https://rinkeby.boba.network",
      accounts: [pk_1],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
      accounts: [pk_1],
    },
    harmony: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [`0x${pk_1}`]
    },
  },
};
