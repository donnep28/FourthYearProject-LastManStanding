import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Auth} from 'aws-amplify';
import {Link, useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#37003c',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#37003c',
  },
}));

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const getCode = async (event) => {
    event.preventDefault();

    try {
      await Auth.forgotPassword(username);
      handleCodeSent();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCodeSent = () => {
    setIsCodeSent(!isCodeSent);
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    try {
      await Auth.forgotPasswordSubmit(username, code, password)
          .then(() => {
            history.push('/SignIn');
          })
          .catch((error) => alert('Password Successfully Changed.'), history.push('/SignIn'));
          
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBack = () => {
    history.push('/SignIn');
  };

  return (
    !isCodeSent ? (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Forgot Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="Username"
            autoComplete="uname"
            autoFocus
            onChange= {(event) => setUsername(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => getCode(event)}
          >
            Submit
          </Button>
        </form>
        <Link onClick={(event) => getBack()}>
            Back to Sign In
        </Link>
      </div>
    </Container>
      ) : (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              Confirm Code
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="uname"
                  autoFocus
                  onChange= {(event) => setUsername(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Verification Code"
                  name="code"
                  autoComplete="code"
                  autoFocus
                  onChange= {(event) => setCode(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange= {(event) => setPassword(event.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => handleCodeSubmit(event)}
                >
              Submit
                </Button>
              </form>

              <Link onClick={(event) => getBack()}>
            Back to Sign In
              </Link>
            </div>
          </Container>
      )
  );
};

export default ForgotPassword;
