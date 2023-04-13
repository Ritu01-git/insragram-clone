import Post from './Post.js';
import './App.css';
import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { initializeApp } from 'firebase/app';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPost] = useState([])
  const [open, setOpen] = useState(false);
  const [openDialog, setDialog] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setUserPassword] = useState('');
  const [email, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  // const classes = style();
  useEffect(() => {
    const newUser = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
    return () => {
      newUser();
    }
  }, [user, username])
  useEffect(() => {
    // it will run every single time when posts change
    db.collection('posts').onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [posts])
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));  //validation
      setOpen(false);
  }
  const login = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
    setDialog(false);
  }
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <img className="logo" src="https://img.freepik.com/premium-vector/instagram-social-media-icon-gradient-social-media-logo_197792-4682.jpg?w=2000" alt="image" />
          <Typography className="headerStyle" id="modal-modal-title" variant="h6" component="h2">
            Sign Up
          </Typography>
          <form>
            <div className='input'>
              <TextField
                className="textfield" id="outlined-basic" label="Username" value={username} variant="outlined" margin="normal"
                onChange={(e) => { setUserName(e.target.value) }} />
              <TextField
                className="textfield" id="outlined-basic" label="Email" value={email} variant="outlined" margin="normal"
                onChange={(e) => { setUserEmail(e.target.value) }} />
              <TextField
                className="textfield" id="outlined-basic" label="Password" value={password} variant="outlined" margin="normal"
                onChange={(e) => { setUserPassword(e.target.value) }} />
            </div>
            <div className="login">
              <Button onClick={signUp} variant="contained">Sign up</Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={() => {setDialog(false)}}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to LogOut?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={() => setDialog(false)}>No</Button>
          <Button onClick={() => {auth.signOut(); setDialog(false)}}  autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div className="app__header">
        {user ? (
          <Button className="signUp" onClick={() => { setDialog(true) }}>LogOut</Button>
        ) :
          <Button className="signUp" onClick={() => { setOpen(true) }}>Sign up</Button>
        }
        < img className="app__headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
          alt="image"
        />
      </div>
      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
        ))
      }
    </div>
  );
}
export default App;
