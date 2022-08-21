import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import NavbarComp from '../NavbarComp/NavbarComp';
function UploadPage() {
  const [imageData, setimageData] = useState({
    topic: '',
    url: '',
  });
  const handleInputchange = (name) => (event) => {
    setimageData({ ...imageData, [name]: event.target.value });
  };
  const handleFileInputchange = (name) => async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `${name}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setimageData({ ...imageData, url: url });
        });
      }
    );
  };
  const addimage = async () => {
    const newimageRef = doc(collection(db, 'images'));
    await setDoc(newimageRef, imageData);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!imageData.topic || !imageData.url) {
      alert('Something is missing');
    } else {
      console.log('uploaded');
      addimage();
    }
    console.log(imageData);
  };
  return (
    <div>
      <NavbarComp />
      <form>
        <input type="text" onChange={handleInputchange('topic')} />
        <input type="file" onChange={handleFileInputchange('images')} />
        <button className="addblog-submitDetailBtn" onClick={handlesubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
