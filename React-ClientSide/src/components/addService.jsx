import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import serviceStore from "../makeUp/service";
import { GrAdd } from "react-icons/gr";

export default function AddService() {
    const [open, setOpen] = useState(false);
    const [service, setService] = useState({
        name: "",
        description: "",
        price: ""
    });
    const [services, setServices] = useState([]);

    (() => {
        const fetchData = async () => {
            try {
                const result = await serviceStore.getServices();
                setServices(result);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchData();
    }, [services]); // <-- רשימת התלויות כעת מכילה את משתנה הסטייט services

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (field, value) => {
        setService(prevService => ({
            ...prevService,
            [field]: value
        }));
    }

    const handleSave = async () => {
      const updatedService = { ...service, id: serviceStore.cnt };
      await serviceStore.addService(updatedService);
      const updatedServices = await serviceStore.getServices();
      setServices(updatedServices);
      handleClose();
      window.location.reload();
      
  }
  

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
            <GrAdd  style={{ fontSize: '24px' }}/> 
                       </Button >
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSave();
                    },
                }}
            >
                <DialogTitle>Add Service</DialogTitle>
                <DialogContent>
                    <TextField id="standard-basic" autoFocus label="name" variant="standard" onChange={(e) => handleChange("name", e.target.value)} /><br /><br />
                    {/* <TextField id="standard-basic" autoFocus label="image" variant="standard" onChange={(e) => handleChange("image", e.target.value)} /><br /><br /> */}
                    <TextField id="standard-basic" autoFocus label="description" variant="standard" onChange={(e) => handleChange("description", e.target.value)} /><br /><br />
                    <TextField id="standard-basic" autoFocus label="price" variant="standard" onChange={(e) => handleChange("price", e.target.value)} /><br /><br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
