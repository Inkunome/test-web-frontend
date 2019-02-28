import React, { useState, useEffect, Component } from "react";

import { History, Location } from "history";

import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { match } from "react-router";

import ReactMarkdown from "react-markdown";

import { fetchWithCredential, pushWithCredential } from "../lib/fetch";
import socket from "../socket";
import { ListItem, ListItemText } from "@material-ui/core";

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

interface Message {
  content: string;
}

interface MatchParams {
  descriptor: string;
}

export interface Props extends WithStyles<typeof styles> {
  history: History;
  location: Location;
  match: match<MatchParams>;
}

interface State {
  threads: any[];
  message: string;
  messages: any[];
}

function Thread(props: Props) {
  const { classes } = props;

  const descriptor: string = props.match.params.descriptor;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  /*socket.on(
      "new-message",
      (msg: { id: number; descriptor: string; content: string }) => {
        if (msg.descriptor === this.descriptor) {
          this.setState(({ messages, ...rest }) => {
            return {
              messages: [...messages, msg],
              ...rest
            };
          });
        }
      }
    );*/

  async function getMessages() {
    const response = await fetchWithCredential(
      props.history,
      `http://localhost:3000/messages/${descriptor}`
    );

    const messages: Message[] = await response.json();

    setMessages(
      messages.map((message: Message) => (
        <ListItem button>
          <ListItemText primary={<ReactMarkdown source={message.content} />} />
        </ListItem>
      ))
    );
  }

  function sendMessage() {
    pushWithCredential(
      props.history,
      `http://localhost:3000/messages/${descriptor}`,
      {
        content: message
      }
    );

    setMessage("");
  }

  useEffect(() => {
    getMessages();
  });

  return (
    <div className={classes.root}>
      <List component="nav">{messages}</List>
    </div>
  );
}

const ThreadDetail = withStyles(styles)(Thread);

export { ThreadDetail };
