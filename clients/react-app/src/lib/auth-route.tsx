import React from "react";

import { Route, Redirect } from "react-router";

export const AuthRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  const isAuthenticated = (localStorage.getItem('credential') !== null);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
