import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RosterComponent } from './roster.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CharacterComponent} from './character.component';

var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'roster',
    component: RosterComponent
  },
  {
    path: 'roster/:id',
    component: CharacterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, RosterComponent, HomeComponent, CharacterComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }

