import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import businessStore from '../makeUp/business';
import { CgColorPicker } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [business, setBusiness] = useState(businessStore.details);

  useEffect(() => {
    // Save to localStorage whenever business state changes
    localStorage.setItem('details', JSON.stringify(business));
  }, [business]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setBusiness(prevBusiness => ({
      ...prevBusiness,
      [field]: value
    }));
  };

  const handleSave = () => {
    businessStore.postBusiness(business);
    window.location.reload();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button  variant="outlined" onClick={handleClickOpen}>
      {/* <CgColorPicker /> */}
      <AiFillEdit style={{ fontSize: '24px' }} />


      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update Business</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            autoFocus
            label="Name"
            variant="standard"
            onChange={(e) => handleChange('name', e.target.value)}
            value={business.name}
          />
          <br /><br />
          <TextField
            id="address"
            autoFocus
            label="Address"
            variant="standard"
            onChange={(e) => handleChange('address', e.target.value)}
            value={business.address}
          />
          <br /><br />
          <TextField
            id="phone"
            autoFocus
            label="Phone"
            variant="standard"
            onChange={(e) => handleChange('phone', e.target.value)}
            value={business.phone}
          />
          <br /><br />
          <TextField
            id="owner"
            autoFocus
            label="Owner"
            variant="standard"
            onChange={(e) => handleChange('owner', e.target.value)}
            value={business.owner}
          />
          <br /><br />
          <TextField
            id="description"
            autoFocus
            label="Description"
            variant="standard"
            onChange={(e) => handleChange('description', e.target.value)}
            value={business.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
