import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Auth} from 'aws-amplify';
import {useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import alertify from 'alertifyjs';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#490050',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#490050',
  },
}));

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      }).then((response) => {
        alertify.set('notifier','position', 'top-center')
        alertify.warning('Please verify email before attempting sign in.')
        history.push('/SignIn');
      });
    } catch (e) {
      alertify.set('notifier','position', 'top-center')
      alertify.error(e.message)
    }
  };

  const getBack = () => {
    history.push('/SignIn');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="uname"
                onChange= {(event) =>
                  setUsername(event.target.value.toLowerCase())
                }
                inputProps={{'data-testid': 'username'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange= {(event) =>
                  setEmail(event.target.value.toLowerCase())
                }
                inputProps={{'data-testid': 'email'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange= {(event) => setPassword(event.target.value)}
                inputProps={{'data-testid': 'password'}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => handleSubmit(event)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={(event) => getBack()} style={{color: "blue", cursor: "pointer"}}>
                <p>Already have an account? Sign in</p>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
