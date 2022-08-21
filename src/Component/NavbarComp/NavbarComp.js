import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
function NavbarComp() {
  return (
    <>
      <Navbar bg="light" className="mt-4 " sticky="top">
        <Container className="text-center d-flex justify-content-center ">
          <FontAwesomeIcon icon={faCameraRetro} />
          <Navbar.Brand
            href="/"
            className="text-center mr-0"
            style={{ fontFamily: 'Silkscreen' }}
          >
            Iemprashant
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
