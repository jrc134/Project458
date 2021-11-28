import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Donation from './Donation/Donation';
import useStyles from './styles';

const Donations = ({ setCurrentId }) => {
    const donations = useSelector((state) => state.donations);
    const classes = useStyles();

    return (
        !donations.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {donations.map((donation) => (
                    <Grid key={donation._id} item xs={12} sm={6} md={6}>
                        <Donation donation={donation} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Donations;