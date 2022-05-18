import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';  
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { useEffect, useState } from 'react';

import {SuperfluidWeb3Context} from  "../context/SuperfluidContext"
import AnimatedBalance from 'src/superfluid/AnimateBalance';
import { ethers } from "ethers";
import { flowDetails } from "src/superfluid";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'left',
  padding: theme.spacing(5, 5),
  color: theme.palette.primary.main, 
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'start',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function Payroll() {
  const {Moralis,user}=useMoralis();

  const supweb3Context = React.useContext(SuperfluidWeb3Context); 

    const {  getUSDCXBalance } = supweb3Context;

  const [balance, setBalance] = useState(0);
  const [netFlow, setNetFlow] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const FETCH_BALANCE_INTERVAL = 25000;

  const updateBalance = () => {
    getUSDCXBalance(provider, user?.attributes?.ethAddress).then((value) => {
      setBalance(parseFloat(value));
    });
  };

  const updateNetFlow = async () => {
    const result = await flowDetails(user?.attributes?.ethAddress);
    setNetFlow(parseFloat(ethers.utils.formatEther(result.cfa.netFlow)));
  };
  useEffect(() => {
    const id = setInterval(() => {
      updateBalance();
    }, FETCH_BALANCE_INTERVAL);
    updateBalance();
    updateNetFlow();
    return () => clearInterval(id);
  },[provider]); 
  



  return (
    <RootStyle> 
      <Typography variant="h3"  color="#000"></Typography>
      <Typography variant="h3" color="#000" sx={{ opacity: 0.72 }}>
        Payroll
      </Typography>
      <Typography variant="h3" color="#000">
        <AnimatedBalance value={balance} rate={netFlow}/> 
      </Typography> 
    </RootStyle>
  );
}


