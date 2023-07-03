import { Link } from "react-router-dom";
import Logo from "../assests/logo2023.png";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HairIcon from "../assests/hair.png";
import BeardIcon from "../assests/beard.png";
import BeardAndHairIcon from "../assests/beardAndHair2.png";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { v4 as uuid } from "uuid";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import EventSeatSharpIcon from "@mui/icons-material/EventSeatSharp";
import ContentCutSharpIcon from "@mui/icons-material/ContentCutSharp";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import {
  getDoc,
  updateDoc,
  deleteField,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Rezerviraj = () => {
  const [obaveznoPolje, setObaveznoPolje] = useState("Obavezno polje");
  const [obaveznoPolje2, setObaveznoPolje2] = useState("Obavezno polje");
  const navigate = useNavigate();

  const { loggedIn, checkingStatus } = useAuthStatus();

  const removeObaveznoPolje = () => {
    setObaveznoPolje("");
  };

  const removeObaveznoPolje2 = () => {
    setObaveznoPolje2("");
  };

  //Button Menu service States and functions
  const [service, setService] = useState("Izaberi uslugu");
  const [buttonStylesService, setButtonStylesService] = useState({
    width: "100%",
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.594)",
    borderRadius: "10px",
    boxShadow: "none",
    border: "1px solid grey",
  });

  function changeColorService() {
    setButtonStylesService({
      ...buttonStylesService,
      backgroundColor: "#ab0008",
      color: "#ffffff",
    });
  }

  const HandleChangeService = (e) => {
    setService(e.currentTarget.textContent);
  };

  //Button Menu Barbers States and functions
  const [barber, setBarber] = useState("Izaberi frizera");
  const [buttonStylesBarber, setButtonStylesBarber] = useState({
    width: "100%",
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.594)",
    borderRadius: "10px",
    boxShadow: "none",
    border: "1px solid grey",
  });

  function changeColorBarber() {
    setButtonStylesBarber({
      ...buttonStylesBarber,
      backgroundColor: "#ab0008",
      color: "#ffffff",
    });
  }

  const HandleChangeBarber = (e) => {
    setBarber(e.currentTarget.textContent);
    setFetching(true);
  };

  //fetch data from firebase
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [waitingSchedule, setWaitingSchedule] = useState(true);

  useEffect(() => {
    if (!service || !barber) {
      return;
    }
    if (fetching) {
      const fetchData = async () => {
        try {
          const barbers_name = barber;
          const freeTimeRef = collection(db, `${barbers_name}`);
          const q = query(freeTimeRef);
          const querySnap = await getDocs(q);
          const updatedSchedule = [];
          querySnap.forEach((doc) => {
            updatedSchedule.push(doc.data().radno_vrijeme);
            return schedule;
          });
          setSchedule(updatedSchedule);
        } catch (error) {
          console.log(error);
          toast.error(error);
        } finally {
          setLoading(false);
          setWaitingSchedule(false);
          setFetching(false);
        }
      };
      fetchData();
    }
  }, [fetching, barber, schedule]);

  console.log(fetching);

  const [modalOpened, setModalOpened] = useState(false);
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [firebaseDay, setFirebaseDay] = useState("");
  const [textArea, setTextArea] = useState("");
  const [date, setDate] = useState([
    "16.01",
    "17.01",
    "18.01",
    "19.01",
    "20.01",
    "21.01",
  ]);

  const [modalBookingData, setModalBookingData] = useState({
    korisnik: "",
    datum: "",
    vrijeme: "",
    usluga: "",
    zaposlenik: "",
    napomena: "",
  });

  const openBookingModal = (e) => {
    if (service !== "Izaberi uslugu" && barber !== "Izaberi frizera") {
      setDay(e.target.dataset.value);
      setHour(e.target.innerHTML);
      setModalOpened(true);
      setFirebaseDay(e.target.dataset.day);
    } else {
      toast.error("Izaberite vrstu usluge i frizera");
    }
  };

  const closeModal = (e) => {
    setModalOpened(false);
  };

  const changeTextArea = (e) => {
    setTextArea(e.target.value);
  };

  const makeReservationInFirebase = async () => {
    const reservations_ID = uuid();
    await setDoc(doc(db, "Reservations", `${reservations_ID}`), {
      ...modalBookingData,
    });
  };

  const finishReservation = async () => {
    try {
      const freeTimeRef = collection(db, `${barber}`);
      const q = query(freeTimeRef);
      const querySnap = await getDocs(q);
      const updates = [];

      querySnap.forEach((d) => {
        const radnoVrijeme = d.data().radno_vrijeme;
        const index = radnoVrijeme[firebaseDay].indexOf(hour);
        radnoVrijeme[firebaseDay].splice(index, 1);

        updates.push(updateDoc(d.ref, { radno_vrijeme: radnoVrijeme }));
      });

      await Promise.all(updates);
      setModalOpened(false);
      makeReservationInFirebase();
      toast.success("Uspješno ste rezervirali termin");
      navigate("/costumer/reservations");
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersEmail = () => {
    const auth = getAuth();
    if (auth !== null && auth !== undefined && auth.currentUser !== null) {
      return auth.currentUser.email;
    }
  };

  const goToSignIn = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    setModalBookingData({
      user_id: getUsersEmail(),
      datum: `${day}.23`,
      vrijeme: hour,
      usluga: service,
      zaposlenik: barber,
      napomena: textArea,
    });
  }, [day, hour, service, barber, textArea, firebaseDay]);

  return (
    <div className="bookNowDiv">
      <header className="headerWidthMax">
        <div className="headerDiv">
          <Link to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <div className="buttons-rezerviraj">
            {loggedIn ? (
              <Link to="/costumer">
                <button className="buttonRezerviraj">Profil</button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <button className="buttonRezerviraj">Prijavi se</button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="naslovDiv">
        <h1 className="rezervirajNaslov">Napravi rezervaciju</h1>
      </div>

      <div className="bookContainer">
        <div className="chooseServiceDiv">
          <p className="underlined-text">Izaberi uslugu</p>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  variant="contained"
                  {...bindTrigger(popupState)}
                  style={buttonStylesService}
                  id="myObject"
                >
                  <p className="removeMarginP">{service}</p>
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      changeColorService();
                      HandleChangeService(e);
                      removeObaveznoPolje();
                      popupState.close();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    key={uuid()}
                  >
                    <img
                      src={HairIcon}
                      style={{ width: "30px", marginRight: "10px" }}
                    />
                    <p style={{ width: "20px", marginRight: "10px" }}>
                      Šišanje
                    </p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      changeColorService();
                      HandleChangeService(e);
                      removeObaveznoPolje();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <img
                      src={BeardIcon}
                      style={{ width: "30px", marginRight: "10px" }}
                    />
                    <p>Uređivanje brade</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      changeColorService();
                      HandleChangeService(e);
                      removeObaveznoPolje();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <img
                      src={BeardAndHairIcon}
                      style={{ width: "30px", marginRight: "10px" }}
                    />
                    <p>Šišanje sa uređivanjem brade</p>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <p className="smallText">{obaveznoPolje}</p>
        </div>
        <div className="chooseBarberDiv">
          <p className="underlined-text">Izaberi frizera</p>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  id="barbersButton"
                  variant="contained"
                  {...bindTrigger(popupState)}
                  style={buttonStylesBarber}
                >
                  <p className="removeMarginP">{barber}</p>
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    key={uuid()}
                  >
                    <p style={{ width: "200px" }}>Ante Antić</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Antonia Ivić</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Anamarija Marić</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Ivan Mamić</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Grgo Karlić</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Marina Horva</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Tonia Šarić</p>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleChangeBarber(e);
                      changeColorBarber();
                      removeObaveznoPolje2();
                      popupState.close();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                    key={uuid()}
                  >
                    <p>Ana Lončar</p>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <p className="smallText">{obaveznoPolje2}</p>
        </div>
        <div className="chooseDateAndTime grid-row-span">
          <p className="underlined-text">Izaberi datum i vrijeme</p>
          {loading === true ? (
            <div className="textHolder">
              <p className="smallGrey">
                Dostupni termini će biti vidljivi nakon odabira usluge
              </p>
            </div>
          ) : (
            <div className="calendar-form">
              <div className="dayInWeek">
                <div className="mon">
                  <p className="dan">Pon.</p>
                  <p className="datum">{date[0]}</p>
                </div>
                {waitingSchedule === false &&
                  typeof schedule[0] !== "undefined" &&
                  schedule[0].Mon.map((sat, indx) => {
                    if (sat === "") {
                      return <></>;
                    }
                    return (
                      <p
                        className="sat"
                        key={uuid()}
                        data-value={date[0]}
                        data-day={"Mon"}
                        onClick={openBookingModal}
                      >
                        {sat}
                      </p>
                    );
                  })}
              </div>
              <div className="dayInWeek">
                <div className="tue">
                  <p className="dan">Uto.</p>
                  <p className="datum">{date[1]}</p>
                </div>
                {waitingSchedule === false &&
                  typeof schedule[0] !== "undefined" &&
                  schedule[0].Tue.map((sat, indx) => {
                    if (sat === "") {
                      return <></>;
                    }
                    return (
                      <p
                        className="sat"
                        key={uuid()}
                        data-value={date[1]}
                        data-day={"Tue"}
                        onClick={openBookingModal}
                      >
                        {sat}
                      </p>
                    );
                  })}
              </div>
              <div className="dayInWeek">
                <div className="wen">
                  <p className="dan">Sri.</p>
                  <p className="datum">{date[2]}</p>
                </div>
                {waitingSchedule === false &&
                  typeof schedule[0] !== "undefined" &&
                  schedule[0].Wen.map((sat, indx) => {
                    if (sat === "") {
                      return <></>;
                    }
                    return (
                      <p
                        className="sat"
                        key={uuid()}
                        data-value={date[2]}
                        data-day={"Wen"}
                        onClick={openBookingModal}
                      >
                        {sat}
                      </p>
                    );
                  })}
              </div>
              <div className="dayInWeek">
                <div className="thu">
                  <p className="dan">Čet.</p>
                  <p className="datum">{date[3]}</p>
                </div>
                {waitingSchedule === false &&
                  typeof schedule[0] !== "undefined" &&
                  schedule[0].Thu.map((sat, indx) => {
                    if (sat === "") {
                      return <></>;
                    }
                    return (
                      <p
                        className="sat"
                        key={uuid()}
                        data-value={date[3]}
                        data-day={"Thu"}
                        onClick={openBookingModal}
                      >
                        {sat}
                      </p>
                    );
                  })}
              </div>
              <div className="dayInWeek">
                <div className="fri">
                  <p className="dan">Pet.</p>
                  <p className="datum">{date[4]}</p>
                </div>
                {waitingSchedule === false &&
                  typeof schedule[0] !== "undefined" &&
                  schedule[0].Fri.map((sat, indx) => {
                    if (sat === "") {
                      return <></>;
                    }
                    return (
                      <p
                        className="sat"
                        key={uuid()}
                        data-value={date[4]}
                        data-day={"Fri"}
                        onClick={openBookingModal}
                      >
                        {sat}
                      </p>
                    );
                  })}
              </div>
              <div className="dayInWeek">
                <div className="saturday">
                  <p className="dan">Sub.</p>
                  <p className="datum">{date[5]}</p>
                </div>
                {waitingSchedule === false &&
                  typeof schedule[0] !== "undefined" &&
                  schedule[0].Saturday.map((sat, indx) => {
                    if (sat === "") {
                      return <></>;
                    }
                    return (
                      <p
                        className="sat"
                        key={uuid()}
                        data-value={date[5]}
                        data-day={"Saturday"}
                        onClick={openBookingModal}
                      >
                        {sat}
                      </p>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      {modalOpened && (
        <div className="modalBackground">
          <div className="bookingModal">
            <div className="modalExitButton">
              <h2 className="bookingModalTitle">Završi rezervaciju</h2>
              <CloseSharpIcon className="exitIcon" onClick={closeModal} />
            </div>
            <div className="bookingInformation">
              <div className="infoContainer">
                <CalendarMonthOutlinedIcon />
                <div className="datumModal">
                  <label>Datum</label>
                  <p>{`${day}.2023`}</p>
                </div>
              </div>
              <div className="infoContainer">
                <AccessTimeSharpIcon />
                <div className="datumModal">
                  <label>Vrijeme</label>
                  <p>{hour}</p>
                </div>
              </div>
              <div className="infoContainer">
                <EventSeatSharpIcon />
                <div className="datumModal">
                  <label>Zaposlenik</label>
                  <p>{barber}</p>
                </div>
              </div>
              <div className="infoContainer">
                <ContentCutSharpIcon />
                <div className="datumModal">
                  <label>Usluga</label>
                  <p>{service}</p>
                </div>
              </div>
            </div>
            <div className="napomenaContainer">
              <div className="napomena">Napomena</div>
              <div className="underlined-text"></div>
              <textarea
                name="bookingArea"
                id="bookingArea"
                value={textArea}
                onChange={changeTextArea}
              ></textarea>
              <p className="nijeObavezno">Nije obavezno</p>
            </div>
            <div className="buttonBooking">
              {loggedIn ? (
                <button
                  className="buttonRezerviraj bookingModalButton"
                  onClick={finishReservation}
                >
                  Rezerviraj
                </button>
              ) : (
                <button
                  className="buttonRezerviraj bookingModalButton"
                  onClick={goToSignIn}
                >
                  <LockSharpIcon className="lockIcon" />
                  Rezerviraj (potrebna prijava)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};

export default Rezerviraj;
