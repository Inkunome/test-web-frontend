import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fetchWithCredential } from '../fetch';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  threads = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getThreads();
  }

  async getThreads() {
    const response = await fetchWithCredential(this.router, 'http://localhost:3000/threads');

    this.threads = await response.json();
  }

  goThread(descriptor: string) {
    this.router.navigate([`/thread/${descriptor}`]);
  }
}
