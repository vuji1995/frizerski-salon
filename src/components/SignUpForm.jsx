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
        Fade Barbershop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordRepeat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submited`);
  };

  const onChange = (e) => {
    setFormData((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
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
            Registriraj se
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="passwordRepeat"
                  label="Ponovi lozinku"
                  type="password"
                  id="password"
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
  );
}
