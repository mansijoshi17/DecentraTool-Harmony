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
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import { multisendTokenContract } from "../config";
import multiSendABI from "../abi/MultiSend.json";
import { ethers } from "ethers";
import DERC721ABI from "../abi/DERC721.json";

const Input = styled("input")({
  display: "none",
});
function CreateMemberModal(props) {
  const { Moralis, user } = useMoralis();
  const [type, setType] = useState("send");
  const [loading, setLoading] = useState(false);
  const [memberships, setMemberships] = React.useState([]);

  const { fetch, data } = useMoralisCloudFunction("getMemberships", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data, user]);

  async function setData() {
    const membershipData = await JSON.parse(JSON.stringify(data));
    const mData =
      data &&
      membershipData.filter(
        (membership) => membership.dao == localStorage.getItem("DAO")
      );
    mData && setMemberships(mData);
  }

  useEffect(() => {
    fetch();
  }, [user]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const Members = Moralis.Object.extend("Members");
  const members = new Members();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      discord: "",
      email: "",
      nft: "",
      tokenId: "",
      salary: "",
    },

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenCon = new ethers.Contract(values.nft, DERC721ABI, signer);
        console.log(values, tokenCon);
        await tokenCon.setApprovalForAll(multisendTokenContract, true);

        let tx = await tokenCon.approve(values.address, values.tokenId);
        console.log(tx);
        let done = await tx.wait();
        const multisendContract = new ethers.Contract(
          multisendTokenContract,
          multiSendABI,
          signer
        );

        if (done) {
          await multisendContract.sendToken(
            values.nft,
            [values.address],
            [values.tokenId]
          );
        }

        const formData = {
          name: values.name,
          address: values.address,
          discord: values.discord,
          email: values.email,
          nft: values.nft,
          tokenId: values.tokenId,
          salary: values.salary,
        };

        const file = new Moralis.File("Members_Details.json", {
          base64: btoa(JSON.stringify(formData)),
        });
        await file.saveIPFS();
        members.set("name", formData.name);
        members.set("address", formData.address);
        members.set("discord", formData.discord);
        members.set("email", formData.email);
        members.set("nft", formData.nft);
        members.set("tokenId", formData.tokenId);
        members.set("salary", formData.salary);
        members.set("dao", localStorage.getItem("DAO"));
        members.set("storageURL", file._ipfs);
        members.save();
        props.setIsUpdated(!props.isUpdated);
        resetForm();
        setLoading(false);
        props.close();
        toast.success("Successfully Members created!!");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <div>
      <Dialog open={props.op} onClose={props.close} fullWidth>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Create Member
        </DialogTitle>
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
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  id="address"
                  type="text"
                  {...formik.getFieldProps("address")}
                />
                <TextField
                  fullWidth
                  label="Discord"
                  name="discord"
                  id="discord"
                  type="text"
                  {...formik.getFieldProps("discord")}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">NFT</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="nft"
                    label="NFT"
                    {...formik.getFieldProps("nft")}
                  >
                    {memberships &&
                      memberships.map((membership) => {
                        return (
                          <MenuItem value={membership.tokenContract}>
                            {membership.name} ({membership.symbol})
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Token Id"
                  name="tokenId"
                  id="tokenId"
                  type="number"
                  {...formik.getFieldProps("tokenId")}
                />
                <TextField
                  fullWidth
                  label="Salary (USD)"
                  name="salary"
                  id="salary"
                  type="number"
                  {...formik.getFieldProps("salary")}
                />
              </Stack>

              <DialogActions>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={formik.isSubmitting}
                  disabled={props.loading}
                >
                  {props.loading == true ? "Creating..." : "Create"}
                </LoadingButton>
                <Button onClick={props.close} variant="contained">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreateMemberModal;
