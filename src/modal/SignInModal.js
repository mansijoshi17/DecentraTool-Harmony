// material
import { styled } from "@mui/material/styles";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";

// import AuthSocial from "../sections/authentication/AuthSocial";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Card,
  Stack,
  Container,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "src/theme/overrides/Typography";
import DERC721ABI from "../abi/DERC721.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// ----------------------------------------------------------------------

export default function Login(props) {
  const navigate = useNavigate();
  const { authenticate, user, isAuthenticated } = useMoralis();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDao, setSelectedDao] = useState("");
  const [daos, setDaos] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const { fetch, data } = useMoralisCloudFunction("getDaos", {
    autoFetch: true,
  });

  const { fetch: fetch1, data: data1 } = useMoralisCloudFunction(
    "getMemberships",
    {
      autoFetch: true,
    }
  );

  useEffect(() => {
    setData();
  }, [data, data1, user]);

  async function setData() {
    const daosData = await JSON.parse(JSON.stringify(data));
    const membershipData = await JSON.parse(JSON.stringify(data1));
    data && setDaos(daosData);
    data1 && setMemberships(membershipData);
  }

  useEffect(() => {
    fetch();
    fetch1();
  }, [user]);

  useEffect(() => {
    const mData =
      memberships && memberships.filter((m) => m.dao == selectedDao);
    mData && setMemberships(mData);
  }, [selectedDao]);

  const formik = useFormik({
    initialValues: {
      dao: "",
      role: "",
    },
    onSubmit: async (values) => {
      window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenCon = new ethers.Contract(values.role, DERC721ABI, signer);

      let balance = await tokenCon.balanceOf(accounts[0]);

      if (balance.toString() !== "0") {
        await authenticate();
        localStorage.setItem("isOwner", "false");
        localStorage.setItem("DAO", selectedDao);
        localStorage.setItem("role", values.role);
        navigate("/dashboard");
      } else {
        toast.error(
          "You are not member of this DAO or may be your role is different!"
        );
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
        Sign In with NFT
      </DialogTitle>

      <DialogContent style={{ overflowX: "hidden" }}>
        <RootStyle title="Login | Decentra Tool">
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
                <FormControl
                  fullWidth
                  style={{
                    paddingRight: "2vw",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select DAO
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="dao"
                    label="DAO"
                    {...formik.getFieldProps("dao")}
                    value={selectedDao}
                    onChange={(e) => {
                      setSelectedDao(e.target.value);
                    }}
                  >
                    {daos &&
                      daos.map((doa) => {
                        return <MenuItem value={doa.DAO}>{doa.DAO}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  style={{
                    paddingRight: "2vw",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    label="Role"
                    {...formik.getFieldProps("role")}
                  >
                    {memberships &&
                      memberships.map((membership) => {
                        return (
                          <MenuItem value={membership.tokenContract}>
                            {membership.role}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Stack>

              <DialogActions>
                <Grid container justifyContent="center">
                  <Button
                    //   color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {"Sign In"}
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
