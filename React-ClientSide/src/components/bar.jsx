import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import LoginAdmin from "./loginAdmin";
import businessStore from "../makeUp/business";
import { FcPhone } from "react-icons/fc";
const AppBarStyled = styled(AppBar)({
  backgroundColor: '#f0b4a0', // גוון רקע
  // borderRadius: '20px', // עיגול פינות האפליקציה
  width: '100%', // רוחב מקסימלי
  padding: 0,
});


const TypographyStyled = styled(Typography)({
  flexGrow: 1,
  minWidth: 100,
  fontWeight: 500, // משקל נטוי
  letterSpacing: '0.02em', // מרווח בין אותיות
});

const ButtonStyled = styled(Button)({
  // borderRadius: '20px', // עיגול פינות הכפתור
  backgroundColor: '#fff', // רקע כפתור
  color: '#64b5f6', // צבע טקסט
  transition: 'background-color 0.3s', // אנימציה לצבע רקע
  '&:hover': {
    backgroundColor: '#f3e5f5', // רקע כפתור בעת העברת עכבר
    transform: 'scale(1.05)', // הגדלת הכפתור בעת העברת עכבר
  },
});

export default function Bar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="static">
        <Toolbar >
          <TypographyStyled variant="h6" component="div">
            <h3>{businessStore.details.name} {' '}</h3>

            <p>addres: {businessStore.details.address} {' '}
               {businessStore.details.phone}:<FcPhone />
               {' '}
              {businessStore.details.owner} {' '}
              {businessStore.details.description}</p>
          </TypographyStyled>
          <ButtonStyled variant="contained">
            <LoginAdmin />
          </ButtonStyled>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
}

