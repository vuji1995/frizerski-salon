import SignUp from "../assests/sign-up.svg";
import LogIn from "../assests/log-in.svg";
import { Link } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PostaniClan = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  return (
    <div className="postaniClanDiv" id="korisnici-id">
      <div className="postaniClanContainer">
        <div className="signUp">
          <img src={SignUp} alt="" className="signUpImg" />
          <p className="signUpText">
            Ukoliko niste registrirani, učinite to sada.
          </p>
          <Link to="/sign-up">
            <button className="signUpButton">Registracija</button>
          </Link>
        </div>
        <div className="logIn">
          <img src={LogIn} alt="" className="logInImg" />
          <p className="logInText">
            Ako ste već registrirani korisnik, prijavite se.
          </p>
          {loggedIn ? (
            <Link to="/costumer">
              <button className="logInButton">Prijava</button>
            </Link>
          ) : (
            <Link to="/sign-in">
              <button className="logInButton">Prijava</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostaniClan;
