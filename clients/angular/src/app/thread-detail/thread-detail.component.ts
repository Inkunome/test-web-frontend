import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import socket from '../socket';
import { fetchWithCredential, pushWithCredential } from '../fetch';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  descriptor: string;
  messages = [];
  message = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    /*this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.descriptor = params.get('descriptor'))
    )*/

    this.descriptor = this.route.snapshot.params.descriptor;

    this.getMessages();


    socket.on(
      'new-message',
      (msg: { id: number; descriptor: string; content: string }) => {
        if (msg.descriptor === this.descriptor) {
          this.messages.push(msg);
        }
      }
    );
  }

  async getMessages() {
    const response = await fetchWithCredential(
      this.router,
      `http://localhost:3000/messages/${this.descriptor}`
    );

    this.messages = await response.json();
  }

  sendMessage() {
    pushWithCredential(
      this.router,
      `http://localhost:3000/messages/${this.descriptor}`,
      {
        content: this.message
      }
    );

    this.message = '';
  }
}
