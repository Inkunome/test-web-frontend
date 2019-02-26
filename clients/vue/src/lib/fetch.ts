import Vue from 'vue';

import base64 from 'base-64';

export class CredentialError extends Error {
  constructor() {
    super("Credential error");
  }
}

export async function fetchWithCredential(vue: Vue, url: string): Promise<Response> {
  const credentialString = localStorage.getItem("credential");

  if (!credentialString) {
    vue.$router.push({ name: 'login' });
    throw new CredentialError();
  }

  const credential = JSON.parse(credentialString);

  if (!('username' in credential && 'password' in credential)) {
    vue.$router.push({ name: 'login' });
    throw new CredentialError();
  }

  const { username, password } = credential;

  const headers: Headers = new Headers()

  headers.set(
    "Authorization",
    "Basic " + base64.encode(username + ":" + password)
  );

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (response.status === 401) {
    vue.$router.push({ name: 'login' });
    throw new CredentialError();
  }

  return response;
}

export async function pushWithCredential(vue: Vue, url: string, body: any): Promise<Response> {
  const credentialString = localStorage.getItem("credential");

  if (!credentialString) {
    vue.$router.push({ name: 'login' });
    throw new CredentialError();
  }

  const credential = JSON.parse(credentialString);

  if (!('username' in credential && 'password' in credential)) {
    vue.$router.push({ name: 'login' });
    throw new CredentialError();
  }

  const { username, password } = credential;

  const headers: Headers = new Headers();

  headers.set("Content-Type", "application/json");
  headers.set(
    "Authorization",
    "Basic " + base64.encode(username + ":" + password)
  );

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    vue.$router.push({ name: 'login' });
    throw new CredentialError();
  }

  return response;
}