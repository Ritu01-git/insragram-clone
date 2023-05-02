import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { db, storage } from './firebase';
import firebase from 'firebase/compat/app';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './ImageUpload.css';

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleUpload = () => {
        console.log("in the finction")
        const uploadImage = storage.ref(`images/${image.name}`).put(image);
        uploadImage.on(
            "state_changed",
            (snapshot) => {
                //progress..
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }
    return (
        <div className='imageupload'>
            <progress value={progress} max="100" />
            <input type='text' placeholder='Enter Caption' onChange={event => setCaption(event.target.value)}></input>
            <input type='file' onChange={handleChange}></input>
            <Button variant="outlined" onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload