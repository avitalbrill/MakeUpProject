import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import UpdateLogo from "./updateLogo"
import AddService from './addService';
import { useNavigate } from 'react-router-dom';
import Bar from './bar';

const Admin = React.memo(()=>{
    const nav = useNavigate();
    function handleServices() {
        nav('/admin/services');
        // setServices(true);
    }

    function handleMeetings(){
        nav('/admin/meetings');
    }

    return (<>
        <Bar></Bar><br />
        

        <Stack spacing={2} direction="row">

            <Button variant="outlined" onClick={handleServices}>Services</Button>
            <Button variant="outlined" onClick={handleMeetings}>Meetingss</Button>
            <UpdateLogo />
        </Stack><br></br>
        
    </>);
})
export default Admin;
