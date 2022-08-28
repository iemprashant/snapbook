import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NavbarComp from '../NavbarComp/NavbarComp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FooterComp from '../FooterComp/FooterComp';
import Modal from 'react-bootstrap/Modal';

export const Gallery = () => {
  const [allimages, setallimages] = useState();
  const [modalshow, setmodalShow] = useState(false);
  const [modalimg, setmodalimg] = useState();

  const handlemodalShow = (e, image) => {
    setmodalimg(image);
    setmodalShow(true);
  };
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
          onClick={(e) => handlemodalShow(e, image)}
        />
      );
    });
  };
  return (
    <>
      <NavbarComp />
      {allimages ? (
        <div id="gallery" class="container-fluid p-4 pb-0" data-aos="fade-in">
          {makeUi()}
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f8f9fa"
          fill-opacity="1"
          d="M0,160L80,170.7C160,181,320,203,480,186.7C640,171,800,117,960,106.7C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      {modalshow && modalimg && (
        <Modal
          show={modalshow}
          size="md"
          onHide={() => setmodalShow(false)}
          centered
        >
          <Modal.Body className="p-1" closeButton>
            <img
              src={modalimg.url}
              class="img-responsive modal-img"
              alt="loading"
            />
          </Modal.Body>
        </Modal>
      )}
      <FooterComp />
    </>
  );
};
export default Gallery;
