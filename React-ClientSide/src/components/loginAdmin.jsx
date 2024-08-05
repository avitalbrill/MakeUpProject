import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import InputAdornment from '@mui/material/InputAdornment';
import { Button, InputAdornment, TextField  } from '@mui/material';
import { useState } from 'react';
import StoreLogin from '../makeUp/login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { indigo } from '@mui/material/colors';

const color = indigo[50];


// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';

export default function LoginAdmin() {
    const [open, setOpen] = React.useState(false);
    const [admin, setAdmin] = useState({
        name: "",
        password: "",
    })
    const [log, setLog] = useState()
    const nav = useNavigate();

    function handleChange(filled, value) {
        let tmp = admin
        tmp[filled] = value
        setAdmin(tmp);
        console.log(tmp);
    }
    async function handlClick() {
        const res = await StoreLogin.postLogin(admin);
        console.log(res.status, "res");
        if (res.status == 200) { nav('/admin/services') }
        else {
            handleClose()
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            handleClickOpen();
        }

    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log();
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} >
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#f7e6e4', // או הצבע שבחרת
                    },
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        enter your user and password
                    </DialogContentText><br></br>
                    <TextField
                        onChange={(e) => handleChange("name", e.target.value)}
                        label="User"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    /><br />
                    <TextField
                        onChange={(e) => handleChange("password", e.target.value)}
                        label="Password"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={() => handlClick()}>Send</Button>

                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
};

