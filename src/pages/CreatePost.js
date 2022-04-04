import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import {auth, db, storage } from "../firebase-server";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {useNavigate} from "react-router-dom"

function CreatePost({isAuth}) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("")
  const [progress, setProgress]=useState(0)
  const postRef = collection(db, "posts");
  const imageRef = ref(storage, "images")
  let navigate = useNavigate()

  const handleImageChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const handleUpload = ()=> {
    uploadBytes(imageRef, image).then((snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      setProgress(progress)
      console.log('Uploaded a blob or file!');
    })
  }
  getDownloadURL(imageRef).then((url)=>{
    setUrl(url)
  })

  const createPost = async () => {
    await addDoc(postRef, {title, postText, imageUrl: url, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}, createdAt: new Date().toISOString()});
    navigate("/")
  };

useEffect(()=>{
    if (!isAuth) {
        navigate("/login")
    }
})

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Input Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Post: </label>
          <textarea
            placeholder="Write something...."
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <progress value={progress} max="100" />
          <label>Upload File:</label>
          <input type='file'  onChange={handleImageChange}/>
          <button onClick={handleUpload}>Upload File</button>
        </div>
        <button onClick={createPost}>Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
