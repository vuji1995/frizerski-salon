import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function ProfileButtonMenu() {
  const stylings = {
    padding: "10px",
    gridColumn: "2",
    gridRow: "2",
    border: "1px solid rgba(0, 0, 0, 0.194)",
    borderRadius: "10px",
    backgroundColor: " white",
    color: " black",
    fontFamily: "Rubik",
    fontWeight: " 500",
    cursor: "pointer",
  };
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
            <p>Opcije</p>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={(e) => {
                popupState.close();
              }}
            >
              <p>Izbrisi racun</p>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                popupState.close();
              }}
            >
              <p>Promjeni broj mobitela</p>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
