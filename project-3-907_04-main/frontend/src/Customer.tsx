import { ThemeProvider } from "@emotion/react";
import { Button, Grid, Paper, Typography, createTheme } from "@mui/material";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";
import Weather from "./components/WeatherWindow";
import "./Customer.css";

import { Link } from 'react-router-dom';

const orange = "#f47b20"
const brown = "#5e4433"

const theme = createTheme({
  palette: {
    primary: {
      main: orange,
    },
    secondary: {
      main: "#FF0000",
    },
    text: {
      primary: "#FFF",
      secondary: "#FFF",
    }
  }
});

const customButtonStyle = {

  fontSize: '18px'
};

export default function Customer() {
  const paperStyle = {

    padding: "20px",
    margin: "20px",
    textAlign: "center",
    backgroundColor: brown,
  } as any;

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} style={{
        backgroundColor: "#c7a17a",
        color: orange,
      }}>
        <Grid item xs={12}>
          <Paper style={{ ...paperStyle, display: "flex" }}>
            <Weather />
            <div style={{ margin: "auto", color: orange }}>
              <Typography variant="h4" className="notranslate">Mess Waffles</Typography>
            </div>
            <Link to="/" >
              <Button style={customButtonStyle} className="button-hover-effect">
                Home
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <MenuItemsDisplay showImage={true} backgroundColor={brown} addPaddingToImage={true} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CheckoutCart backgroundColor={brown} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
