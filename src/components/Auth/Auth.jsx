import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin }from 'react-google-login';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from "./styles";
import Icon from './Icon'
import Input from './Input';
import { useForm } from '../../hooks/useForm';
import { signin, signup } from '../../actions/auth.action';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, handleInputChange] = useForm(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData,history))
    }else{
      dispatch(signin(formData,history))
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const switchMode = () => {
    setIsSignup(!isSignup);
  }

  const googleSuccess = async(res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type: 'AUTH', data: {result,token}});
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure = () => {
    console.log('google errror :(');
  }  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon/>
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleInputChange} autoFocus half/>
                  <Input name='lastName' label="Last Name" handleChange={handleInputChange} half/>
                </>
              )
            }
            <Input name='email' label="Email Adress" handleChange={handleInputChange} type="email"/>
            <Input name='password' label="Password" handleChange={handleInputChange} type={showPassword  ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
            {
              isSignup && (
                <Input name='confirmPassword' label="Repeat Password" handleChange={handleInputChange} type='password'/>
              )
            }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign {isSignup ? 'Up' : 'In'}
          </Button>
          <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_ID}
                       render={(renderProps)=> (
                          <Button variant="contained" 
                                  className={classes.googleButton} 
                                  color="primary" 
                                  fullWidth 
                                  onClick={renderProps.onClick} 
                                  disabled={renderProps.disabled}
                                  startIcon={<Icon/>}>
                            Sign in with Google
                          </Button>
                       )}
                       onSuccess={googleSuccess}
                       onFailure={googleFailure}
                       cookiePolicy='single_host_origin'
                      /> 
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode} disableRipple className={classes.switch}>
                {isSignup ? 'Already have an account? Sign In' : 'You don\'t have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth 