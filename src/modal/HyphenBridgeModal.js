import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Stack,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Container,
  Box,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import {
  useMoralis,
  useMoralisCloudFunction,
  useMoralisFile,
} from "react-moralis";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";

import { HyphenBridgeWeb3Context } from "../context/HyphenBridgeContext";

const Input = styled("input")({
  display: "none",
});
function HyphenBridge(props) {
  const { Moralis, user } = useMoralis();
  const web3 = new Web3();

  const Hyphenweb3Context = React.useContext(HyphenBridgeWeb3Context);
  const { TransferToken } = Hyphenweb3Context;

  const networks = [
    {
      network: "Mumbai",
      chainId: 80001,
      LiquidityPool: "0xb831F0848A055b146a0b13D54cfFa6C1FE201b83",
      LiquidityProviders: "0x66AAD3DC0f9AAc8a31e07f0787D3D476489D75D3",
      tokens: [
        {
          token: "USDT",
          address: "0xeaBc4b91d9375796AA4F69cC764A4aB509080A58",
        },
        {
          token: "USDC",
          address: "0xdA5289fCAAF71d52a80A254da614a192b693e977",
        },
        {
          token: "DAI",
          address: "0x27a44456bEDb94DbD59D0f0A14fE977c777fC5C3",
        },
        {
          token: "WETH",
          address: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
        },
      ],
    },
    {
      network: "Goerli",
      chainId: 5,
      LiquidityPool: "0xE61d38cC9B3eF1d223b177090f3FD02b0B3412e7",
      LiquidityProviders: "0xF9Af530Ab07796B1EC5706Fc448d315A4586Fda9",
      tokens: [
        {
          token: "ETH",
          address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        },
        {
          token: "USDT",
          address: "0x64ef393b6846114bad71e2cb2ccc3e10736b5716",
        },
        {
          token: "USDC",
          address: "0xb5B640E6414b6DeF4FC9B3C1EeF373925effeCcF",
        },
        {
          token: "DAI",
          address: "0x2686eca13186766760a0347ee8eeb5a88710e11b",
        },
      ],
    },
    {
      network: "Avalanche Fuji",
      chainId: 43113,
      LiquidityPool: "0x07d2d1690D13f5fD9F9D51a96CEe211F6a845AC5",
      LiquidityProviders: "0xb22fC3a88E429a76CF5f9Ec06be646B53170513f",
      tokens: [
        {
          token: "USDT",
          address: "0xb4e0f6fef81bdfea0856bb846789985c9cff7e85",
        },
      ],
    },
  ];
  const [fromNetwork, setFromNetwork] = useState("");
  const [toNetwork, setToNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    let snetwork = networks.filter((n) => n.chainId == fromNetwork);
    if (snetwork.length > 0) {
      setTokens(snetwork[0].tokens);
    }
  }, [fromNetwork]);

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        let fnetwork = networks.filter((n) => n.chainId == fromNetwork);
        const formData = {
          tokenAddress: token,
          amount: amount, // Wei
          fromChainId: fromNetwork,
          toChainId: toNetwork,
          receiver: values.address,
          liquidityPool: fnetwork.length > 0 ? fnetwork[0].LiquidityPool : "", //LiquidityPool address on fromChain
        };
        await TransferToken(formData);
        resetForm();
        setLoading(false);
        props.close();
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert("Something went wrong!");
      }
    },
  });

  return (
    <div>
      <Dialog open={props.op} onClose={props.close} fullWidth>
        <DialogContent style={{ overflowX: "hidden" }}>
          <div>
            <Box style={{ marginBottom: "20px" }}></Box>
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
                <Grid container spacing={24}>
                  <Grid item md={6} xs={6}>
                    <FormControl
                      fullWidth
                      style={{
                        paddingRight: "2vw",
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        SOURCE
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="fromNetwork"
                        name="fromNetwork"
                        label="fromNetwork"
                        value={fromNetwork}
                        onChange={(event) => {
                          setFromNetwork(event.target.value);
                        }}
                      >
                        {networks.map((networ) => {
                          return (
                            <MenuItem value={networ.chainId}>
                              {networ.network}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        DESTINATION
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="toNetwork"
                        name="toNetwork"
                        label="toNetwork"
                        value={toNetwork}
                        onChange={(event) => {
                          setToNetwork(event.target.value);
                        }}
                      >
                        {networks.map((networ) => {
                          if (networ.chainId !== fromNetwork) {
                            return (
                              <MenuItem value={networ.chainId}>
                                {networ.network}
                              </MenuItem>
                            );
                          }
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item md={6} xs={6}>
                    <TextField
                      fullWidth
                      label="AMOUNT"
                      name="amount"
                      id="amount"
                      type="text"
                      onChange={(e) => {
                        console.log(
                          web3.utils.toWei(e.target.value.toString(), "ether")
                        );
                        setAmount(
                          web3.utils.toWei(e.target.value.toString(), "ether")
                        );
                      }}
                      required
                      style={{
                        paddingRight: "2vw",
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        TOKEN
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="token"
                        label="Token"
                        value={token}
                        onChange={(e) => {
                          setToken(e.target.value);
                        }}
                      >
                        {tokens.map((t) => {
                          return (
                            <MenuItem value={t.address}>{t.token}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Receiver address"
                  name="address"
                  id="address"
                  type="text"
                  {...formik.getFieldProps("address")}
                />
              </Stack>

              <DialogActions>
                <Grid container justifyContent="center">
                  <Button
                    //   color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? "Transfering..." : "Transfer"}
                  </Button>
                </Grid>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default HyphenBridge;
