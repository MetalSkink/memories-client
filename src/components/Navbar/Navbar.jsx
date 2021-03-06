import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import memoriesLogo from '../../images/memories-Logo.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  const logout = () => {
    dispatch({type: 'LOGOUT',});
    history.push('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        logout();
      }  
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])
  

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
      <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
      <img className={classes.image} src={memoriesLogo} alt='memories' height='40'/>
    </div>
    <Toolbar className={classes.toolbar}>
      {
        user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.username} variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' color='secondary' className={classes.logout} onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
        )
      }
    </Toolbar>
    </AppBar>
  )
}

export default Navbar