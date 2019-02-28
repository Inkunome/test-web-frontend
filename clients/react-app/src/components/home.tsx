import React, { useState, useEffect, Component } from "react";

import { History } from "history";

import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { fetchWithCredential } from "../lib/fetch";

const styles = (theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

interface Thread {
  descriptor: string;
}

export interface Props extends WithStyles<typeof styles> {
  history: History;
}

interface State {
  threads: any[];
}

class SimpleList extends Component<Props, State> {
  state = {
    threads: []
  };

  constructor(props: Props) {
    super(props);
  }

  getThreads = async () => {
    const response = await fetchWithCredential(
      this.props.history,
      "http://localhost:3000/threads"
    );

    let threads: Thread[] | null = await response.json();

    if (!threads) {
      threads = [];
    }

    this.setState({
      threads: threads.map((thread: Thread, i: number) => (
        <ListItem button key={i}>
          <ListItemText
            key={i}
            primary={thread.descriptor}
            onClick={() => this.goThread(thread.descriptor)}
          />
        </ListItem>
      ))
    });
  };

  goThread = (descriptor: string) => {
    this.props.history.push(`thread/${descriptor}`);
  }

  componentDidMount() {
    this.getThreads();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">{this.state.threads}</List>
      </div>
    );
  }
}

/*(SimpleList as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;*/

const Home = withStyles(styles)(SimpleList);

export { Home };
