import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import HairIcon from "../assests/hair.png";
import BeardIcon from "../assests/beard.png";
import BeardAndHairIcon from "../assests/beardAndHair2.png";
import { useState } from "react";

export default function ButtonMenuService(props) {
  const [service, setService] = useState("Izaberi uslugu");

  function handleClick() {
    props.onRemoveText();
  }

  const HandleMenuClickItem = (e) => {
    setService(e.currentTarget.textContent);
  };

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
    document.getElementById("myObject").style.backgroundColor = currentColor;
    document.getElementById("myObject").style.color = "#ffffff";
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            style={stylings}
            id="myObject"
          >
            <p>{service}</p>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleMenuClickItem(e);
                changeColor();
                handleClick();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={HairIcon}
                style={{ width: "30px", marginRight: "10px" }}
              />
              <p style={{ width: "20px", marginRight: "10px" }}>Šišanje</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                HandleMenuClickItem(e);
                changeColor();
                handleClick();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
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
                HandleMenuClickItem(e);
                changeColor();
                handleClick();
                popupState.close();
              }}
              style={{ display: "flex", alignItems: "center" }}
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
  );
}
