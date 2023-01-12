import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.config";

export default function (props) {
  const { getFreeTimeState, serviceType, getLoadingState } = props;
  const [barber, setBarber] = useState("Izaberi frizera");
  const [loading, setLoading] = useState(true);
  const [freeTime, setFreeTime] = useState(null);
  const [buttonStyles, setButtonStyles] = useState({
    width: "100%",
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.594)",
    borderRadius: "10px",
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.194)",
  });

  function handleClick() {
    props.onRemoveText();
  }

  function changeColor() {
    setButtonStyles({
      ...buttonStyles,
      backgroundColor: "#ab0008",
      color: "#ffffff",
    });
  }

  const HandleChangeBarber = (e) => {
    setBarber(e.currentTarget.textContent);
  };

  // fetch data depending on service type and barber
  useEffect(() => {
    if (serviceType !== "Izaberi uslugu" && barber !== "Izaberi frizera") {
      const fetchFreeTime = async (barber) => {
        try {
          //get reference
          //console.log(barber);
          const freeTimeRef = collection(db, `barbers`);
          const q = query(freeTimeRef);
          const querySnap = await getDocs(q);
          let freeTimeArr = [];
          querySnap.forEach((doc) => {
            freeTimeArr.push(doc.data().radno_vrijeme);
            return freeTimeArr;
          });
          setFreeTime(freeTimeArr);
          getFreeTimeState(freeTime);
          getLoadingState(loading);
        } catch (error) {
          toast.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchFreeTime();
    }
  }, [serviceType, barber]);

  useEffect(() => {
    getFreeTimeState(freeTime);
  }, [freeTime]);

  useEffect(() => {
    getLoadingState(loading);
  }, [loading]);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            id="barbersButton"
            variant="contained"
            {...bindTrigger(popupState)}
            style={buttonStyles}
          >
            <p className="removeMarginP">{barber}</p>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
            >
              <p style={{ width: "200px" }}>Ante Antić</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>nedljeko_mamic</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Anamarija Marić</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Antonia Ivić</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Grgo Karlić</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Marina Horvat</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Tonia Šarić</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleChangeBarber(e);
                handleClick();
                changeColor();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Ana Lončar</p>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
