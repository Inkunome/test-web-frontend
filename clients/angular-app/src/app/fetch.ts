import { Router } from '@angular/router';

import { encode } from 'base-64';

export class CredentialError extends Error {
  constructor() {
    super('Credential error');
  }
}

export async function fetchWithCredential(router: Router, url: string): Promise<Response> {
  const credentialString = localStorage.getItem('credential');

  if (!credentialString) {
    router.navigate(['/login']);
    throw new CredentialError();
  }

  const credential = JSON.parse(credentialString);

  if (!('username' in credential && 'password' in credential)) {
    router.navigate(['/login']);
    throw new CredentialError();
  }

  const { username, password } = credential;

  const headers: Headers = new Headers();

  headers.set(
    'Authorization',
    `Basic ${encode(`${username}:${password}`)}`
  );

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (response.status === 401) {
    router.navigate(['/login']);
    throw new CredentialError();
  }

  return response;
}

export async function pushWithCredential(router: Router, url: string, body: any): Promise<Response> {
  const credentialString = localStorage.getItem('credential');

  if (!credentialString) {
    router.navigate(['/login']);
    throw new CredentialError();
  }

  const credential = JSON.parse(credentialString);

  if (!('username' in credential && 'password' in credential)) {
    router.navigate(['/login']);
    throw new CredentialError();
  }

  const { username, password } = credential;

  const headers: Headers = new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set(
    'Authorization',
    `Basic ${encode(`${username}:${password}`)}`
  );

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    router.navigate(['/login']);
    throw new CredentialError();
  }

  return response;
}
