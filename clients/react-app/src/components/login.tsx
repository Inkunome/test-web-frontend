import React, { Component } from "react";

import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import { encode } from "base-64";
import { History } from "history";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      display: "block",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  });

export interface Props extends WithStyles<typeof styles> {
  history: History;
}

export interface Form {
  username: string;
  password: string;
}

export interface State extends Form {}

class TextFields extends Component<Props, State> {
  state: State = {
    username: "",
    password: "",
  };

  handleChange = (name: keyof Form) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [name]: event.target.value } as Pick<Form, keyof Form>);
  };

  handleSubmit = async () => {
    const { username, password } = this.state;

    const headers = new Headers();
    headers.set("Authorization", `Basic ${encode(`${username}:${password}`)}`);

    const response = await fetch("http://localhost:3000/threads", {
      method: "GET",
      headers: headers,
      mode: "cors"
    });

    if (response.status !== 401) {
      localStorage.setItem(
        "credential",
        JSON.stringify({
          username,
          password
        })
      );

      this.props.history.push('/');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleChange("username")}
          margin="normal"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          value={this.state.password}
          onChange={this.handleChange("password")}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Sign up
        </Button>
      </form>
    );
  }
}

(TextFields as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

const Login = withStyles(styles)(TextFields);

export { Login };
