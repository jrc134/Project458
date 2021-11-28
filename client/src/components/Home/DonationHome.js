import { Container, Grow, Grid } from '@material-ui/core';
import Donations from '../Donations/Donations'
import DonationForm from '../Form/DonationForm'

import { useDispatch } from 'react-redux';
import { getDonations } from '../../actions/donations';

import React, { useState, useEffect } from 'react';



const DonationHome = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getDonations());
      //dispatch(getDonations());
    }, [currentId, dispatch]);

    return (
        <Grow in>

        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Donations setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DonationForm currentId={currentId} setCurrentId={setCurrentId} />
              <Grid item xs={12}>
                </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default DonationHome;