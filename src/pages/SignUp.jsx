import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { toast } from "react-toastify";

import Logo from "../assests/ritualLogo.jpg";
import { Link as Link2, Navigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ritual Barbershop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, phoneNumber, password, password2 } =
    formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: firstName,
        phoneNumber: phoneNumber,
      });

      const formDataCopy = {
        ...formData,
      };
      delete formDataCopy.password;
      delete formDataCopy.password2;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("You have successfuly signed up!");
      navigate("/book-now");
    } catch (error) {
      toast.error(`Error while registering!`);
    }
  };

  //const testAuth = getAuth();
  //console.log(testAuth);

  return (
    <div>
      <header>
        <div className="headerDiv">
          <Link2 to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link2>
          <div className="buttons">
            <Link2 to="/book-now">
              <button className="buttonRezerviraj">Rezerviraj odmah</button>
            </Link2>
          </div>
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
            onSubmit={onSubmit}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(171, 0, 8)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registriraj se
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Ime"
                    autoFocus
                    onChange={onChange}
                    value={firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Prezime"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={onChange}
                    value={lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={onChange}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Broj mobitela"
                    name="phoneNumber"
                    autoComplete="email"
                    onChange={onChange}
                    value={phoneNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Lozinka"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Ponovi lozinku"
                    type="password"
                    value={password2}
                    id="password2"
                    autoComplete="new-password"
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "rgb(171, 0, 8)",
                  "&:hover": {
                    bgcolor: "rgb(93, 6, 11)",
                  },
                }}
              >
                Registriraj se
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-in" variant="body2" color="rgb(171, 0, 8)">
                    Vec imas korisnicki racun? Ulogiraj se
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SignUp;
