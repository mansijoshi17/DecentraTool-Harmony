// material
import { styled } from "@mui/material/styles";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";

import AuthSocial from "../sections/authentication/AuthSocial";
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
  TextField,
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

export default function WhistleBlower() {
  const navigate = useNavigate();
  const { authenticate, user, isAuthenticated } = useMoralis();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    onSubmit: async (values) => {},
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <RootStyle title="WhistleBlower |  Decentra Tool">
      <Container maxWidth="sm">
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Whistle Blower
        </DialogTitle>
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
              label="Subject"
              name="subject"
              id="subject"
              type="text"
              {...formik.getFieldProps("subject")}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              id="message"
              type="text"
              multiline
              rows={2}
              maxRows={10}
              {...formik.getFieldProps("message")}
            />

            <Grid container justifyContent="center">
              <Button
                //   color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                {"Submit"}
              </Button>
            </Grid>
          </Stack>
        </form>
      </Container>
    </RootStyle>
  );
}
