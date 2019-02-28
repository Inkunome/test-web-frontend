import React from "react";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { AuthRoute } from "./lib/auth-route";

import { Home } from "./components/home";
import { Login } from "./components/login";
import { ThreadDetail } from "./components/thread";

import "./socket";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export interface Props extends WithStyles<typeof styles> {}

function ButtonAppBar(props: Props) {
  const { classes } = props;
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Remit
            </Typography>
            <Typography variant="h6" color="inherit">
              <div>
                <a>FR</a> | <a>EN</a>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/thread/:descriptor" component={ThreadDetail} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(ButtonAppBar);
