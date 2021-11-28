import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import DonationHome from './components/Home/DonationHome';
import Auth from './components/Auth/Auth';

import memories from './images/memories.png';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component= {Auth} />
        <Route path="/donation" exact component= {DonationHome} />

        </Switch>

    {/*   <Home /> */}
    </Container>
    </BrowserRouter>

  );


export default App;
