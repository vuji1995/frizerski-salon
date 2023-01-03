import CardLogo from "../assests/cardLogo.jpg.png";
import FacebookLogo from "../assests/icons8-facebook-48.png";
import InstagramLogo from "../assests/icons8-instagram-48.png";
import PhoneLogo from "../assests/icons8-phone-48.png";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const openFacebookPage = () => {
    window.open("https://www.facebook.com/barbershopritual/", "_blank");
    console.log(`opened`);
  };

  const openInstagramPage = () => {
    window.open("https://www.instagram.com/barbershopritual/?hl=hr", "_blank");
  };

  const copyPhoneNumber = () => {};

  return (
    <div className="footer">
      <div className="footerDiv">
        <div className="footerLeft">
          <img src={CardLogo} alt="logo" className="footerLogo" />
          <div className="contacts">
            <div className="phone">
              <img
                src={PhoneLogo}
                alt="phone"
                className="icon"
                onClick={copyPhoneNumber}
              />
              <p>+385 91 344 4443</p>
            </div>
            <div className="facebook" onClick={openFacebookPage}>
              <img src={FacebookLogo} alt="fbLogo" className="icon" />
              <p>Barbershop Ritual</p>
            </div>
            <div className="instagram" onClick={openInstagramPage}>
              <img src={InstagramLogo} alt="instagramLogo" className="icon" />
              <p>Barbershop Ritual</p>
            </div>
          </div>
        </div>
        <div className="footerRight">
          <p>
            Autorska prava © Ritual, zajednički obrt za frizerske usluge, vl.
            Nedjeljko Lešina i Ante Šolić. Sva prava pridržana.
          </p>
          <p>Uvjeti korištenja & Politika privatnosti</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
