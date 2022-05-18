import { Card } from "@mui/material";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { toast } from "react-toastify";
import TableView from "src/components/agreements/TableView";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";

import CreateMembershipModal from "src/modal/CreateMembershipModal";
import Page from "../components/Page";
import Web3 from "web3";
import { bulkMintTokenContract, multisendTokenContract } from "../config";
import bulkMintABI from "../abi/BulkMint.json";

function Membership() {
  const { Moralis, account, user } = useMoralis();
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, address } = web3Context;

  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [contract, setContract] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [memberships, setMemberships] = React.useState([]);

  const { fetch, data } = useMoralisCloudFunction("getMemberships", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data, isUpdate, user]);

  async function setData() {
    setIsLoaded(true);
    const membershipData = await JSON.parse(JSON.stringify(data));
    const mData =
      data &&
      membershipData.filter(
        (membership) => membership.dao == localStorage.getItem("DAO")
      );
    mData && setMemberships(mData);
    setIsLoaded(false);
  }

  useEffect(() => {
    fetch();
  }, [isUpdate, user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const Membership = Moralis.Object.extend("Memberships");
  const membership = new Membership();

  const createMembership = async (data) => {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const bulkMintContract = new ethers.Contract(
        bulkMintTokenContract,
        bulkMintABI,
        signer
      );
      let transaction = await bulkMintContract.createToken(
        data.name,
        data.symbol
      );
      let tx = await transaction.wait();
      let event = tx.events[0];
      let tokenContractAddress = event?.address;
      await bulkMintContract.bulkMintERC721(
        tokenContractAddress,
        0,
        data.quantity
      );

      membership.set("name", data.name);
      membership.set("image", data.tokenImage);
      membership.set("role", data.role);
      membership.set("symbol", data.symbol);
      membership.set("quantity", data.quantity);
      //contract address of token
      membership.set("tokenContract", tokenContractAddress);
      membership.set("dao", localStorage.getItem("DAO"));
      membership.set("storageURL", data.tokenImage);
      membership.save();
      const Role = Moralis.Object.extend("Roles");
      const query = new Moralis.Query(Role);
      query.equalTo("name", data.role);
      const role = await query.first();
      role.set("tokenContract", tokenContractAddress);
      role.save();
      setLoading(false);
      handleClose();
      toast.success("Successfully Membership created!!");
      setIsUpdate(!isUpdate);
    } catch (err) {
      console.log(err);
      toast.error("Something want wrong!!", err);
      setLoading(false);
    }
  };

  return (
    <Page title="Membership |  Decentra Tool">
      <CreateMembershipModal
        rshipModal
        submitForm={createMembership}
        open={handleClickOpen}
        close={handleClose}
        op={open}
        acc={address}
        loading={loading}
      />
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Memberships
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Membership
          </Button>
        </Stack>

        <Stack>
          <Card>
            {/* <AgreementView currentAccount={address} /> */}
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Token Name</TableCell>
                    <TableCell>Token Symbol</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                {isLoaded && (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
                {memberships && memberships.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                      <h5>No memberships are created yet!</h5>
                    </TableCell>
                  </TableRow>
                )}

                {memberships &&
                  memberships.map((membership) => {
                    return (
                      <TableRow>
                        <TableCell>{membership.name}</TableCell>
                        <TableCell>{membership.symbol}</TableCell>
                        <TableCell>{membership.role}</TableCell>
                        <TableCell>{membership.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}

export default Membership;
