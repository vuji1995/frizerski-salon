import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useState } from "react";

export default function (props) {
  const [barber, setBarber] = useState("Izaberi frizera");
  const HandleChangeBarber = (e) => {
    setBarber(e.currentTarget.textContent);
  };

  function handleClick() {
    props.onRemoveText();
  }

  const stylings = {
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.194)",
    color: "rgba(0, 0, 0, 0.594)",
    borderRadius: "10px",
  };

  let currentColor = "#ffffff";

  function changeColor() {
    if (currentColor === "#ffffff") {
      currentColor = "#ab0008";
    } else {
      currentColor = "#ffffff";
    }
    document.getElementById("barbersButton").style.backgroundColor =
      currentColor;
    document.getElementById("barbersButton").style.color = "#ffffff";
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            id="barbersButton"
            variant="contained"
            {...bindTrigger(popupState)}
            style={stylings}
          >
            <p>{barber}</p>
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
              <p>Nedjeljko Mamić</p>
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
