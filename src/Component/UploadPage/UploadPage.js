import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import NavbarComp from '../NavbarComp/NavbarComp';
import ProgressBar from 'react-bootstrap/ProgressBar';

function UploadPage() {
  const [progress, setprogress] = useState();
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
        setprogress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
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
    if (!imageData.topic) {
      alert('Topic is missing');
    } else if (!imageData.url) {
      alert('Url is missing');
    } else {
      addimage();
      alert('Image uploaded');
    }
  };
  return (
    <div>
      <NavbarComp />

      <div className="container mt-4 p-4 ">
        <ProgressBar striped variant="success" now={progress} />
        <div className="mt-4">
          <form>
            <div class="form-group my-4">
              <label>Image Topic:</label>
              <input
                type="text"
                class="form-control"
                onChange={handleInputchange('topic')}
              />
            </div>
            <div class="form-group my-4">
              <label>Image Uplaod:</label>
              <input
                type="file"
                class="form-control"
                onChange={handleFileInputchange('images')}
              />
            </div>
            <div class="form-group my-4 text-center">
              <button
                onClick={handlesubmit}
                className="btn btn-outline-success "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
