import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SignInModal from "../modal/SignInModal";
import SignUpModal from "../modal/SignUpModal";
import { InitSwAuth } from "@skill-wallet/auth";

import NavBarItems from './LendingNavItems'
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function LendingHeader() {
  const navigate = useNavigate();
  const { authenticate, user, isAuthenticated, Moralis } = useMoralis();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [siginOpen, setSignInOpen] = useState(false);
  const [sigupOpen, setSignUpOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {}, [user]);

  InitSwAuth();

  return (
    <nav>
<NavBarItems />
    </nav>
    
    // <AppBar position="static" color="transparent">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Logo />
    //       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
    //       <Box sx={{ flexGrow: 0 }}>
    //         <Button
    //           onClick={cryptoPayment}
    //           variant="outlined"
    //           style={{ margin: "0 5px" }}
    //         >
    //           Crypto Payment
    //         </Button>
    //         <Button
    //           onClick={agreement}
    //           variant="outlined"
    //           style={{ margin: "0 5px" }}
    //         >
    //           Escrow Agreement
    //         </Button>

    //         {user == null ? (
    //           <>
    //             <Button
    //               variant="contained"
    //               onClick={async () => {
    //                 setSignInOpen(true);
    //               }}
    //             >
    //               Sign In with NFT
    //             </Button>
    //             &nbsp;&nbsp;
    //             <Button
    //               variant="contained"
    //               onClick={async () => {
    //                 setSignUpOpen(true);
    //               }}
    //             >
    //               Sign Up with DAO
    //             </Button>
    //           </>
    //         ) : (
    //           <Button variant="outlined">
    //             {user &&
    //               user.attributes.username &&
    //               user.attributes.username.slice(0, 10)}
    //           </Button>
    //         )}
    //       </Box>
    //     </Toolbar>
    //     <SignInModal open={siginOpen} close={() => setSignInOpen(false)} />
    //     <SignUpModal open={sigupOpen} close={() => setSignUpOpen(false)} />
    //   </Container>
    // </AppBar>
  );
}
