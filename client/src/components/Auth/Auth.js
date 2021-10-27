import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input'
import Icon from './icon'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { signup, signin } from '../../actions/auth';
//STOP TIME 42:24 
//STOP TIME =================

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
const classes = useStyles(); 
const [isSignup, setIsSignup ] = useState(false);
const [ showPassword, setShowPassword ] = useState(false);
const dispatch = useDispatch();
const history = useHistory();
const [formData, setFormData] = useState(initialState);


const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup) {
        dispatch(signup(formData, history));

    } else {
        dispatch(signin(formData, history));

    }
    

    console.log(formData);

};

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value  });

};

const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup); 
    setShowPassword(false);

};

const googleSuccess = async (res) => {
    const result = res?.profileObj;
    //cannot get property profileObj is undefined if we didnt put ? . optional chain operator. .  
    const token = res?.tokenId; 

    try {
        dispatch({ type: 'AUTH', data: {result, token }});

        history.push('/');
    }
    catch (error) {
        console.log(error);
    }

};
const googleFailure = (error) => {
    console.log(error)
    console.log('Google Sign In was unsuccessful. Try again later');

};

const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form className={ classes.form } onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last name" handleChange={handleChange} half />
                                 
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={ handleChange } type="email" />
                        <Input name="password" label="password" handleChange={handleChange } type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    
                    </Grid>
                    <Button type="submit" fullWidth vairant="contained" color="primary" className={classes.submit }> 
                    { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
   

                    <GoogleLogin 
                    clientId="615087181653-je0qn9i6hpojq0ikaj6hd3d2qflft2ik.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button 
                        //Setting up button for google auth 
                    className={classes.googleButton} 
                    color='primary' 
                    fullWidth onClick={renderProps.onClick } 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon />} variant="contianed" > 
                    Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                     <Grid container justify="flex-end">
                            <Grid item >
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an acocount? Sign In' : "Don't have an account? Sign up! "}
                            </Button>
                            </Grid>
                        </Grid>
                </form>
            </Paper>
        </Container>
        );
};

export default Auth;
