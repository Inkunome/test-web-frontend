import { Component, OnInit, Input } from '@angular/core';

import { encode } from 'base-64';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() credential = {
    username: '',
    password: '',
  };

  constructor(public router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    const username = this.credential.username;
    const password = this.credential.password;

    const headers = new Headers();
    headers.set(
      'Authorization',
      `Basic ${encode(`${username}:${password}`)}`
    );

    const response = await fetch('http://localhost:3000/threads', {
      method: 'GET',
      headers,
      mode: 'cors'
    });

    if (response.status !== 401) {
      localStorage.setItem('credential', JSON.stringify({
        username,
        password
      }));

      this.router.navigate(['']);
    }
  }
}
