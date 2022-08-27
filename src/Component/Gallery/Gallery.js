import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NavbarComp from '../NavbarComp/NavbarComp';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
    AOS.init({ duration: 3000 });
  }, []);
  const makeUi = () => {
    return allimages.map((image, index) => {
      return (
        <img
          key={index}
          src={image.url}
          class="img-responsive slide-up"
          alt="loading"
          data-aos="fade-up"
        />
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
