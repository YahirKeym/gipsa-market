import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import logoGapsi from "../media/images/logo.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#636363",
  },
  title: {
    flexGrow: 1,
    color: "#636363",
  },
  appBar: {
    backgroundColor: "#fcfcfc",
  },
  logo: {
    maxWidth: 100,
    marginRight: "10px",
  },
}));
/**
 * Layout se encarga de mantener el mismo header sobre nuestra web
 */
export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <img src={logoGapsi} alt="Logo gapsi" className={classes.logo} />
            <Typography variant="h6" className={classes.title}>
              e-Commerce Gapsi
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                window.location.reload();
              }}
            >
              RESET
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
      {children}
    </div>
  );
}
