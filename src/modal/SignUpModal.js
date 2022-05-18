// material
import { styled } from "@mui/material/styles";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";

import AuthSocial from "../sections/authentication/AuthSocial";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Card,
  Stack,
  Container,
  TextField,
  Grid,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "src/theme/overrides/Typography";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

import { ethers } from "ethers";
import Web3 from "web3";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// ----------------------------------------------------------------------

export default function SignUp(props) {
  const { authenticate, Moralis } = useMoralis();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [daosd, setDaos] = useState([]);

  const DAOs = Moralis.Object.extend("DAOs");
  const daos = new DAOs();

  const { fetch, data } = useMoralisCloudFunction("getDaos", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data]);

  async function setData() {
    const daosData = await JSON.parse(JSON.stringify(data));

    data && setDaos(daosData);
  }

  useEffect(() => {
    fetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      daoAdd: "",
      abi: "",
    },
    onSubmit: async (values) => {
      try {
        const ABI = JSON.parse(values.abi);
        console.log(ABI, "abi");
        window.ethereum.enable();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts, "accounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dao = new ethers.Contract(values.daoAdd, ABI, signer);
        console.log(dao, "dao");
        const owner = await dao.owner();
        console.log(owner, "owner");

        if (Web3.utils.toChecksumAddress(accounts[0]) == owner) {
          // toChecksumAddress function is used to convert address into uppercase.
          let data = daosd.filter((d) => d.DAO == values.daoAdd);
          if (data.length == 0) {
            daos.set("DAO", values.daoAdd);
            daos.set("abi", values.abi);
            daos.set("owner", owner);
            daos.save();
          }
          await authenticate();
          localStorage.setItem("DAO", values.daoAdd);
          localStorage.setItem("isOwner", "true");
          navigate("/dashboard");
        } else {
          toast.error("You are not owner of this DAO");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Dialog open={props.open} onClose={props.close} fullWidth>
      <DialogTitle
        style={{
          textAlign: "center",
        }}
      >
        Sign Up with DAO
      </DialogTitle>

      <DialogContent style={{ overflowX: "hidden" }}>
        <RootStyle title="Sign Up | Decentra Tool">
          <Container maxWidth="sm">
            <form
              onSubmit={formik.handleSubmit}
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: "100px",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="DAO Contract Address"
                  name="daoAdd"
                  id="daoAdd"
                  type="text"
                  required
                  {...formik.getFieldProps("daoAdd")}
                />
                <TextareaAutosize
                  fullWidth
                  maxRows={40}
                  name="abi"
                  aria-label="maximum height"
                  placeholder="Please Enter your DAO contract ABI"
                  {...formik.getFieldProps("abi")}
                />
              </Stack>

              <DialogActions>
                <Grid container justifyContent="center">
                  <Button
                    //   color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {"Sign Up"}
                  </Button>
                </Grid>
              </DialogActions>
            </form>
          </Container>
        </RootStyle>
      </DialogContent>
    </Dialog>
  );
}
