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
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { toast } from "react-toastify";
import TableView from "src/components/agreements/TableView";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";

import CreateRoleModal from "src/modal/CreateRoleModal";
import Page from "../components/Page";
import Web3 from "web3";

function Role() {
  const { Moralis, account, user } = useMoralis();
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, address } = web3Context;

  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [contract, setContract] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [rolesd, setRoles] = useState([]);

  const { fetch, data } = useMoralisCloudFunction("getRoles", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data, isUpdate, user]);

  async function setData() {
    setIsLoaded(true);
    const rolesData = await JSON.parse(JSON.stringify(data));
    const rData =
      data &&
      rolesData.filter((role) => role.dao == localStorage.getItem("DAO"));
    rData && setRoles(rData);
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

  const Roles = Moralis.Object.extend("Roles");
  const roles = new Roles();

  const createRole = async (data) => {
    setLoading(true);
    try {
      const file = new Moralis.File("Role_Details.json", {
        base64: btoa(JSON.stringify(data)),
      });
      await file.saveIPFS();
      roles.set("name", data.name);
      roles.set("administration", data.administration);
      roles.set("dAOPay", data.dAOPay);
      roles.set("daodrive", data.daodrive);
      roles.set("daosupport", data.daosupport);
      roles.set("dao", localStorage.getItem("DAO"));
      roles.set("storageURL", file._ipfs);
      await roles.save();
      handleClose();
      setLoading(false);
      toast.success("Successfully Role created!!");
      setIsUpdate(!isUpdate);
    } catch (err) {
      console.log(err);
      toast.error("Something want wrong!!", err);
      setLoading(false);
    }
  };

  return (
    <Page title="Role |  Decentra Tool">
      <CreateRoleModal
        submitForm={createRole}
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
            Roles
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Role
          </Button>
        </Stack>

        <Stack>
          <Card>
            {/* <AgreementView currentAccount={address} /> */}
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>DAO</TableCell>
                  </TableRow>
                </TableHead>
                {isLoaded && (
                  <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
                {rolesd && rolesd.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                      <h5>No roles are created yet!</h5>
                    </TableCell>
                  </TableRow>
                )}

                {rolesd &&
                  rolesd.map((role) => {
                    return (
                      <TableRow>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.dao}</TableCell>
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

export default Role;
