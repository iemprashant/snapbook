import Navbar from 'react-bootstrap/Navbar';
import './FooterComp.css';
function FooterComp() {
  return (
    <>
      <Navbar bg="light">
        <p class="footer-heart">
          Made with{' '}
          <g-emoji
            class="g-emoji"
            alias="heart"
            fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
          >
            <img
              class="emoji"
              alt="heart"
              height="20"
              width="20"
              src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
            />
          </g-emoji>{' '}
          by <a href="https://github.com/iemprashant">Iemprashant</a>
        </p>
      </Navbar>
    </>
  );
}

export default FooterComp;
