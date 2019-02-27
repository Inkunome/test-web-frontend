import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';

  constructor(private translate: TranslateService) {}

  useFR() {
    this.translate.use('fr');
  }

  useEN() {
    this.translate.use('en');
  }
}
