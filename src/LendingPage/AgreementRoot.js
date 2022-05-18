// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // import SupervisorAccountSharpIcon from '@mui/icons-material/SupervisorAccountSharp';
// import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

// export default function AgreementRoot() {
//   return (
//     <Card sx={{ maxWidth: 345 }} >
//       <CardActionArea>
//         <CardMedia
//           component="icon"
//           height="140"

//           alt="green iguana"
//         />
//         <SupervisorAccountOutlinedIcon style={{ backgroundColor: "rgb(110 191 139)", width: "100%", height: "20vh", margin: "0px", padding: "0px", color:"black" }} />
        
//         <CardContent>

//           <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center" }}>
//             <h2>Administration</h2>
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }





// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// component
import Iconify from '../components/Iconify';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme 
}) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  // color: theme.palette.primary.darker,
  // backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));
// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AgreementRoot() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify
          icon="medical-icon:i-administration"
          width={24}
          height={24}
        />
      </IconWrapperStyle>
      <Typography variant="h4" color="#000">
        Administration
      </Typography>
    </RootStyle>
  );
}
