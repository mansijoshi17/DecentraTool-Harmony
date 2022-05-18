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
  Grid,
  Radio,
  RadioGroup,
  Container,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";

import FormGroup from "@mui/material/FormGroup";

import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});
function createMembershipModal(props) {
  const { user, Moralis } = useMoralis();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const { fetch, data } = useMoralisCloudFunction("getRoles", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data, user]);

  async function setData() {
    const rolesData = await JSON.parse(JSON.stringify(data));
    const rData =
      data &&
      rolesData.filter((role) => role.dao == localStorage.getItem("DAO"));
    rData && setRoles(rData);
  }

  useEffect(() => {
    fetch();
  }, [user]);

  async function onChange(e) {
    const data = e.target.files[0];
    try {
      setLoading(true);
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      setImgUrl(file._ipfs);
      setLoading(false);
      toast.success("Successfully Uploaded!");
    } catch (error) {
      setLoading(false);
      console.log("Error uploading file: ", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      role: "",
      quantity: "",
    },

    onSubmit: async (values) => {
      const formData = {
        name: values.name,
        symbol: values.symbol,
        tokenImage: imgUrl,
        role: values.role,
        quantity: values.quantity,
      };
      props.submitForm(formData);
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
          Create Membership
        </DialogTitle>

        <DialogContent style={{ overflowX: "hidden" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              // width: "50vw",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              // marginTop: "100px",
            }}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Token Name"
                name="name"
                id="name"
                type="text"
                {...formik.getFieldProps("name")}
              />
              <TextField
                fullWidth
                label="Token Symbol"
                name="symbol"
                id="symbol"
                type="text"
                {...formik.getFieldProps("symbol")}
              />

              <div className="d-create-file">
                <label
                  htmlFor="files"
                  id="get_file"
                  name="tokenImage"
                  className="btn-main"
                  style={{ backgroundColor: "#6dbf8b", fontSize: "16px" }}
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </label>
                <input
                  id="files"
                  name="tokenImage"
                  onChange={onChange}
                  style={{ display: "none" }}
                  type="file"
                />
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  label="Role"
                  {...formik.getFieldProps("role")}
                >
                  {roles.map((role) => {
                    return <MenuItem value={role.name}>{role.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                id="quantity"
                type="number"
                {...formik.getFieldProps("quantity")}
              />
              {/* ----------------------------------------------- */}
            </Stack>
            <DialogActions>
              {/* <p style={{ color: "red" }}>Error</p> */}
              <LoadingButton
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
                disabled={props.loading}
              >
                {props.loading == true ? "Minting..." : "Mint"}
              </LoadingButton>
              <Button onClick={props.close} variant="contained">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default createMembershipModal;
