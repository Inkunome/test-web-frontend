import base64 from 'base-64';

import {History} from 'history';

export class CredentialError extends Error {
  constructor() {
    super('Credential error');
  }
}

export async function fetchWithCredential(
    history: History, url: string): Promise<Response> {
  const credentialString = localStorage.getItem('credential');

  if (!credentialString) {
    history.push('/login');
    throw new CredentialError();
  }

  const credential = JSON.parse(credentialString);

  if (!('username' in credential && 'password' in credential)) {
    history.push('/login');
    throw new CredentialError();
  }

  const {username, password} = credential;

  const headers: Headers = new Headers()

  headers.set(
      'Authorization', 'Basic ' + base64.encode(username + ':' + password));

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (response.status === 401) {
    history.push('/login');
    throw new CredentialError();
  }

  return response;
}

export async function pushWithCredential(
    history: History, url: string, body: any): Promise<Response> {
  const credentialString = localStorage.getItem('credential');

  if (!credentialString) {
    history.push('/login');
    throw new CredentialError();
  }

  const credential = JSON.parse(credentialString);

  if (!('username' in credential && 'password' in credential)) {
    history.push('/login');
    throw new CredentialError();
  }

  const {username, password} = credential;

  const headers: Headers = new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set(
      'Authorization', 'Basic ' + base64.encode(username + ':' + password));

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    history.push('/login');
    throw new CredentialError();
  }

  return response;
}