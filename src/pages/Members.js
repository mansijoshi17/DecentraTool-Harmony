import { Card, TableBody } from "@mui/material";
import {
  Button,
  Container,
  Stack,
  Box,
  Typography,
  Table,
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";
import { factoryAbi, factoryAddress } from "src/contracts/contract";
import CreateMemberModal from "src/modal/CreateMemberModal";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function Members() {
  const { Moralis, account, user } = useMoralis();
  const navigate = useNavigate();
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, address } = web3Context;

  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const [isUpdated, setIsUpdated] = useState(false);
  const [members, setMembers] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { fetch, data } = useMoralisCloudFunction("getMembers", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data, isUpdated, user]);

  async function setData() {
    setIsLoaded(true);
    const membersData = await JSON.parse(JSON.stringify(data));
    const mData =
      data &&
      membersData.filter((member) => member.dao == localStorage.getItem("DAO"));
    mData && setMembers(mData);
    setIsLoaded(false);
  }

  useEffect(() => {
    fetch();
  }, [isUpdated, user]);

  return (
    <Page title="Members |  Decentra Tool">
      <CreateMemberModal
        open={handleClickOpen}
        close={handleClose}
        op={open}
        acc={address}
        setIsUpdated={setIsUpdated}
        isUpdated={isUpdated}
      />
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Members
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Member
          </Button>
        </Stack>
        <Stack>
          <Card>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Email</TableCell>

                    <TableCell>Salary</TableCell>

                    <TableCell>Discord</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoaded && (
                    <TableRow>
                      <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                  {members && members.length == 0 && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                        <h5>No members are added yet!</h5>
                      </TableCell>
                    </TableRow>
                  )}
                  {members &&
                    members.map((member) => (
                      <TableRow>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.address}</TableCell>
                        <TableCell>{member.email}</TableCell>

                        <TableCell>${member.salary}</TableCell>
                        <TableCell>{member.discord}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}

export default Members;
