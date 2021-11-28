import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
//import { getDonations } from '../../actions/donations';
import React, { useState, useEffect } from 'react';



const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
      //dispatch(getDonations());
    }, [currentId, dispatch]);

    return (
        <Grow in>

        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Grid item xs={12}>
                </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;
