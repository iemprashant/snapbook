import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div
      className=" my-5 d-flex justify-content-center align-items-center"
      style={{ height: '62.5vh' }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
