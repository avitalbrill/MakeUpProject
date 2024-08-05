import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FormControl } from '@mui/base/FormControl';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import MeetStore from '../makeUp/meet';
import { useState } from 'react';




const FormDialog = observer((props) => {
  const [open, setOpen] = React.useState(false);
  const { nameService, idService, serviceType, price } = props;
  const meetList = MeetStore.meets;


  const [meeting, setMeeting] = useState({
    serviceType: serviceType,
    clientName: "",
    clientEmail: "",
    clientPhone: 0,
    dateTime: "2000-01-01T10:00:00.000Z",
  })

  function handleChange(field, value) {
    let temp = meeting;
    temp[field] = value;
    setMeeting(temp);
    console.log(temp);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (meeting.clientName != "" && meeting.clientEmail != "" && meeting.clientPhone != 0 && meeting.dateTime != "2000-01-01T10:00:00.000Z") {
      const res = MeetStore.postMeet(meeting);
      if (res.status != 200) {
        handleClickOpen()
      }

    }
    console.log("m", meeting)

  }
  return (

    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        save Meeting
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
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
        <DialogTitle>Meeting to {nameService}</DialogTitle>
        <DialogContent>
          <TextField id="standard-basic" autoFocus label="clientName" variant="standard" onChange={(e) => handleChange("clientName", e.target.value)} required /><br /><br />
          <TextField
            onChange={(e) => handleChange("clientEmail", e.target.value)}
            autoFocus
            required
            margin="dense"
            id="name"
            name="clientEmail"
            label="email"
            type="email"
            variant="standard"
          /><br /><br />
          <TextField id="standard-basic" autoFocus label="clientPhone" variant="standard" onChange={(e) => handleChange("clientPhone", e.target.value)} required /><br /><br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker label="dateTime"
                value={"DateTime"}
                onChange={(e) => { handleChange("dateTime", e) }} required />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={() => handleClick()}>save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
})

export default FormDialog;

