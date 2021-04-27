/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Auth} from 'aws-amplify';
import {useHistory, Link} from 'react-router-dom';
import alertify from 'alertifyjs';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    background: '#490050',
    top: '50px',
  },

  headerMobile: {
    background: '#490050',
  },

  tabs: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInTab: {
    color: '#fff',
    fontWeight: 'bold',
    position: 'sticky',
  },
  signUpTab: {
    color: '#fff',
    fontWeight: 'bold',
    position: 'sticky',
  },
  signOutTab: {
    color: '#fff',
    fontWeight: 'bold',
    left: '90%',
    position: 'sticky',
  },
  logo: {
    height: 30,
    width: 70,
  },
  nav: {
    width: '100%',
    height: '60px',
  },
}));

const Navbar = ({
  auth,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogOut = async () => {
    try {
      Auth.signOut();
      auth.setAuthStatus(false);
      auth.setUser(null);
      history.push('');
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleResize() {
    setScreenWidth(window.screen.width);
  }

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    setScreenWidth(window.screen.width);
    // eslint-disable-next-line
  }, [window.addEventListener('resize', handleResize)]);

  return (
    auth.isAuthenticated ?
    (
      <>
        { screenWidth > 800 ? (
        <AppBar position='static' className={classes.header}>
          <Tabs>
            <Tab label={<div><img src={require('../../images/logo4.png')} className={classes.logo} alt='logo' textcolor='inherit'></img></div>} className={classes.tabs} component={Link} to='/'/>
            <Tab label={<div><AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Profile </div>} className={classes.tabs} component={Link} to='/Profile' />
            <Tab label={<div><ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Leagues </div>} className={classes.tabs} component={Link} to='/MyLeagues' />
            <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Out </div>} className={classes.signOutTab} onClick={() => {if (alertify.confirm('Attention!','Are you sure you want to sign out?',function(){handleLogOut()}, function(){}));}}/>
          </Tabs>
        </AppBar>
          ) : (
        <AppBar position='fixed' className={classes.headerMobile}>
          <Tabs style={{backgroundColor: '#490050'}} centered>
            <Tab label={<img src={require('../../images/logo4.png')} className={classes.logo} alt='logo' textcolor='inherit'></img>} className={classes.tabs} component={Link} to='/'/>
            <Tab label={<AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/>} component={Link} to='/Profile' />
            <Tab label={<ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/>} component={Link} to='/MyLeagues' />
            <Tab label={<ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/>} onClick={() => {if (alertify.confirm('Attention!','Are you sure you want to sign out?',function(){handleLogOut()}, function(){}));}} />
          </Tabs>
        </AppBar>
        )}
      </>
    ) : (
      <>
        { screenWidth > 800 ? (
          <AppBar position='static' className={classes.header}>
            <Tabs>
              <Tab label={<div><img src={require('../../images/logo4.png')} className={classes.logo} alt='logo' textcolor='inherit'></img></div>} className={classes.tabs} component={Link} to='/'/>
              <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign In </div>} className={classes.signInTab} component={Link} to='/SignIn'/>
              <Tab label={<div><PersonAddIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Up </div>} className={classes.signUpTab} component={Link} to='/SignUp' />
            </Tabs>
          </AppBar>
        ):(
          <AppBar position='fixed' className={classes.headerMobile}>
            <Tabs>
              <Tab label={<div><img src={require('../../images/logo4.png')} className={classes.logo} alt='logo' textcolor='inherit'></img></div>} className={classes.tabs} component={Link} to='/'/>
              <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign In </div>} className={classes.signInTab} component={Link} to='/SignIn'/>
              <Tab label={<div><PersonAddIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Up </div>} className={classes.signUpTab} component={Link} to='/SignUp' />
            </Tabs>
          </AppBar>
        )}
      </>
    )
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Navbar;
