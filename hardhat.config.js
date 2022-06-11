require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-waffle");

const pk_1 = process.env.REACT_APP_PRIVATE_KEY;

console.log(pk_1);
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    harmony: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [`0x${pk_1}`]
    },
  },
};
