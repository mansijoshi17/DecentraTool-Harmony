import { Card, TableBody } from "@mui/material";
import {
  Button,
  Container,
  Stack,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Iconify from "src/components/Iconify";

import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function Drive() {
  const { Moralis, account, user } = useMoralis();

  const DocsClass = Moralis.Object.extend("Docs");
  const docs = new DocsClass();

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const [isUpdated, setIsUpdated] = useState(false);
  const [docsFiles, setDocFiles] = useState([]);

  const { fetch, data } = useMoralisCloudFunction("getDocs", {
    autoFetch: true,
  });

  useEffect(() => {
    setData();
  }, [data, isUpdated, user]);

  async function setData() {
    setLoading(true);
    const docsData = await JSON.parse(JSON.stringify(data));
    const filteredData =
      data && docsData.filter((d) => d.user == user.attributes.username);
    filteredData && setDocFiles(filteredData);
    setLoading(false);
  }

  useEffect(() => {
    fetch();
  }, [isUpdated, user]);

  async function onChange(e) {
    const data = e.target.files;
    console.log(data[0].type);
    try {
      if (
        data[0].type == "application/pdf" ||
        data[0].type == "application/json" ||
        data[0].type == "image/png" ||
        data[0].type == "image/jpg" ||
        data[0].type == "image/jpeg" ||
        data[0].type == "text/plain" ||
        data[0].type == "text/csv"
      ) {
        const file = new Moralis.File(data[0].name, data[0]);
        await file.saveIPFS();
        setLoading(true);
        docs.set("storageUrl", file._ipfs);
        docs.set("fileName", data[0].name);
        docs.set("fileType", data[0].type);
        docs.set("user", user.attributes.username);
        await docs.save();
        setLoading(false);
        toast.success("Successfully Uploaded!");
        setIsUpdated(!isUpdated);
      } else {
        toast.error("Please upload pdf, json, txt, csv, png, jpg or jpeg!");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error uploading file: ", error);
    }
  }

  function handleSrc(type) {
    switch (type) {
      case "application/pdf":
        return "/images/pdf.png";
        break;
      case "application/json":
        return "/images/json.png";
        break;
      case "text/plain":
        return "/images/docs.png";
        break;
      case "text/csv":
        return "/images/csv.png";
        break;
      case "image/png":
        return "/images/image-file.png";
        break;
      case "image/jpg":
        return "/images/image-file.png";
        break;
      case "image/jpeg":
        return "/images/image-file.png";
        break;
      default:
        return "/images/docs.png";
        break;
    }
  }

  return (
    <Page title="Docs |  Decentra Tool">
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <div className="d-create-file">
            <label
              htmlFor="files"
              id="get_file"
              name="image"
              className="btn-main"
              style={{ backgroundColor: "#6dbf8b", fontSize: "16px" }}
            >
              {loading ? "Uploading..." : "Upload"}
            </label>
            <input
              id="files"
              name="image"
              style={{ display: "none" }}
              type="file"
              onChange={onChange}
            />
          </div>
        </Stack>
        <Stack direction="row" spacing={2}>
          {docsFiles.map((doc) => {
            return (
              <Grid xs={12} sm={3} md={2}>
                <Card>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <img src={handleSrc(doc.fileType)}></img>
                    <a href={doc.storageUrl} target={"balank"}>
                      <Typography variant="subtitle2" noWrap>
                        {doc.fileName}
                      </Typography>
                    </a>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Stack>
      </Container>
    </Page>
  );
}

export default Drive;
