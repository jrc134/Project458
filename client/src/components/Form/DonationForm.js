import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createDonation, updateDonation } from '../../actions/donations';

const DonationForm = ({ currentId, setCurrentId }) => {
    const [donationData, setDonationData] = useState({ title: '', message: '', selectedFile: '' });
    const donation = useSelector((state) => (currentId ? state.donations.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
      if (donation) setDonationData(donation);
    }, [donation]);
  
    const clear = () => {
      setCurrentId(0);
      setDonationData({ title: '', message: '', selectedFile: '' });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (currentId === 0) {
        dispatch(createDonation({ ...donationData, name: user?.result?.name }));
        clear();
      } else {
        dispatch(updateDonation(currentId, { ...donationData, name: user?.result?.name }));
        clear();
      }
    };
  
    if(!user?.result?.name) {
      return (
        <Paper className={classes.paper} >
          <Typography variant="h6" align="center">
            Please, Sign in to create a Donation
          </Typography>
        </Paper>
      )
    }
  
    return (
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing "${donation.title}"` : 'Creating a Donation'}</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={donationData.title} onChange={(e) => setDonationData({ ...donationData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Instructions" fullWidth multiline rows={4} value={donationData.message} onChange={(e) => setDonationData({ ...donationData, message: e.target.value })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setDonationData({ ...donationData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    );
  };
export default DonationForm;