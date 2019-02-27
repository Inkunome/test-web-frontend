import React from "react";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { AuthRoute } from "./lib/auth-route";
import { Login } from "./components/login";

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
          <AuthRoute exact path="/thread/:descriptor" component={Topics} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Topics = ({ match }: { match: any }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }: { match: any }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default withStyles(styles)(ButtonAppBar);
