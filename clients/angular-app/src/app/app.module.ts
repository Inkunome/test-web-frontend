import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular

import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';

import './socket';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThreadsComponent,
    ThreadDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    FormsModule,
    MarkdownModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
  providers: [
    MarkdownModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');

    translate.setTranslation('en', {
      hello: 'hello world',
      ['enter-your-message']: 'Enter your message!',
      ['send-message']: 'Send message',
    });

    translate.setTranslation('fr', {
      hello: 'Bonjour le monde',
      ['enter-your-message']: 'Entrez votre message!',
      ['send-message']: 'Envoyez le message',
    });
  }
}
