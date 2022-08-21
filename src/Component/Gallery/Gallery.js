import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NavbarComp from '../NavbarComp/NavbarComp';
export const Gallery = () => {
  const [allimages, setallimages] = useState();
  const getimages = async () => {
    const snapshot = await getDocs(collection(db, 'images'));
    const images = [];
    snapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    setallimages(images);
  };
  useEffect(() => {
    getimages();
  }, []);
  const makeUi = () => {
    return allimages.map((image, index) => {
      return (
        <img key={index} src={image.url} class="img-responsive" alt="loading" />
      );
    });
  };
  return (
    <>
      <NavbarComp />
      {allimages ? (
        <div id="gallery" class="container-fluid p-4">
          {makeUi()}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default Gallery;