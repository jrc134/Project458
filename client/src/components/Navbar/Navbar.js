import React, {useState, useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'

import useStyles from './styles';


import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import decode from 'jwt-decode';

import logotemp from '../../images/logotemp.png';

const Navbar = () => {
    const classes = useStyles();


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch(); 
    const history = useHistory();
    const location = useLocation();

    console.log(user);


    const logout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');
        setUser(null);

    };

    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();

        }
        //set JWT. . . 
        setUser(JSON.parse(localStorage.getItem('profile')));

        }, [location]); 


    return (
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer} >
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">EZ <br></br>Grub</Typography>
                <img className={classes.image} src={logotemp} alt="icon" height="100" />
                <Typography component={Link} to="/donation" className={classes.donation} variant="h6" align="center">Donations</Typography>
                <Typography component={Link} to="/information" className={classes.info} variant="h6" align="center">Information</Typography>
                </div>
                <Toolbar className={classes.Toolbar }>
                    {user ? (
                        <div className={classes.profile }>
                            <Avatar className={classes.purple } alt={user.result.name } src={user.result.imageUrl}>
                                {/* {user.result.name.CharAt(0) } */}
                            </Avatar>
                            <Typography component={Link} to="/" className={classes.userName } variant="h6">{user.result.name} </Typography> 
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout </Button>
                        </div> 
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">signin </Button> 

                    )}
                </Toolbar>
                </AppBar>
    )
}

export default Navbar
