import Logo from "../assests/ritualLogo.jpg";
import { Link as Link2 } from "react-router-dom";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
//MUI
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Fade Barbershop</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const setEmailAdress = (e) => {
    setEmail(e.target.value);
  };

  const isEmailValid = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const sendEmailReset = (e) => {
    let error = false;
    e.preventDefault();
    if (!isEmailValid(email)) {
      toast.error("Nevažeći email");
      error = true;
    }

    if (!error) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Email za resetiranje lozinke je poslan!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Pogrešna email adresa!");
        });
    }
  };

  return (
    <div className="forgotPasswordDiv">
      <header>
        <div className="headerDiv">
          <Link2 to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link2>

          <Link2 to="/book-now">
            <button className="buttonRezerviraj">Rezerviraj odmah</button>
          </Link2>
        </div>
      </header>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(171, 0, 8)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Resetiraj Lozinku
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Adresa"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={setEmailAdress}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "rgb(171, 0, 8)",
                  "&:hover": {
                    bgcolor: "rgb(93, 6, 11)",
                  },
                }}
                onClick={sendEmailReset}
              >
                Pošalji
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/sign-in" variant="body2" color="rgb(171, 0, 8)">
                    Ulogiraj se
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2" color="rgb(171, 0, 8)">
                    {"Nemaš račun? Registriraj se!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default ForgotPassword;
