import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; //import module pagination

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CharacterComponent } from './character.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.components';
import { newCharacterComponent } from './newCharacter.component';
//import { deleteRankComponent } from './deleteRank.component';
import { editCharacterComponent } from './editCharacter.component';
import { editRankComponent } from './editRank.component';
// import { testPagination } from './testPagination.component';
//import module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
//route paths
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
  },
  {
    path: 'newcharacter',
    component: newCharacterComponent
  },
  {
    path: 'editCharacter/:id',
    component: editCharacterComponent
  },
  {
    path: 'characters/:char_id/editRank/:rank_id',
    component: editRankComponent
  },
  // {
  //   path: 'characters/:id',
  //   component: testPagination 
  // }
  // {
  //   path: 'rank/:id',
  //   component: CharactersComponent
  // },
  // {
  //   path: 'characters/:char_id/rank/:rank_id',
  //   component: deleteRankComponent
  // }
];
//valid components and components tested but difficulty implementing
@NgModule({
  declarations: [
    AppComponent, 
    CharactersComponent, 
    HomeComponent, 
    CharacterComponent,
    NavComponent,
    newCharacterComponent,
    editCharacterComponent,
    editRankComponent,
    // testPagination
   // deleteRankComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
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

