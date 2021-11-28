import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CharacterComponent } from './character.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.components';

//import module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'characters/:id',
    component: CharacterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, 
    CharactersComponent, 
    HomeComponent, 
    CharacterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), 
    ReactiveFormsModule, 
    AuthModule.forRoot({
      domain: 'fullstackcoursework.eu.auth0.com',
      clientId: 'OMkC4YlhY0wDhhkyPgUowu4JK8Rtawb9'
    }),
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }

