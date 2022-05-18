import React, { useState } from "react";
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
} from "@mui/material";
import Box from "@mui/material/Box";

import FormGroup from "@mui/material/FormGroup";

import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});
function CreateRoleModal(props) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      administration: false,
      dAOPay: false,
      daodrive: false,
      daosupport: false,
    },

    onSubmit: async (values) => {
      const formData = {
        name: values.name,
        administration: values.administration,
        dAOPay: values.dAOPay,
        daodrive: values.daodrive,
        daosupport: values.daosupport,
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
          Create Role
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
                label="Name"
                name="name"
                id="name"
                type="text"
                {...formik.getFieldProps("name")}
              />
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Access Permission</FormLabel>
                <FormGroup>
                  <Grid container>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="administration"
                            {...formik.getFieldProps("administration")}
                          />
                        }
                        label="Administration"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="dAOPay"
                            {...formik.getFieldProps("dAOPay")}
                          />
                        }
                        label="DAO Pay"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="daodrive"
                            {...formik.getFieldProps("daodrive")}
                          />
                        }
                        label="DAO Drive"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="daosupport"
                            {...formik.getFieldProps("daosupport")}
                          />
                        }
                        label="DAO Support"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </FormControl>

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
                {props.loading == true ? "Creating..." : "Create"}
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
export default CreateRoleModal;
