import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import HairIcon from "../assests/hair.png";
import BeardIcon from "../assests/beard.png";
import BeardAndHairIcon from "../assests/beardAndHair2.png";
import { useState, useEffect } from "react";

export default function ButtonMenuService(props) {
  const [service, setService] = useState("Izaberi uslugu");
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

  const HandleMenuClickItem = (e) => {
    setService(e.currentTarget.textContent);
  };

  function changeColor() {
    setButtonStyles({
      ...buttonStyles,
      backgroundColor: "#ab0008",
      color: "#ffffff",
    });
  }

  // pass state to parent
  useEffect(() => {
    props.onServiceTypeChange(service);
  }, [service]);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            style={buttonStyles}
            id="myObject"
          >
            <p className="removeMarginP">{service}</p>
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
              style={{
                display: "flex",
                alignItems: "center",
              }}
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
