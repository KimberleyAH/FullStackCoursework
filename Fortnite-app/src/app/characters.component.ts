import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from '@auth0/auth0-angular'


@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  constructor(private webService: WebService,
              public authService: AuthService) {}

    ngOnInit() {
      if (sessionStorage['page']) {
        this.page = Number(sessionStorage['page']);
      }
    this.character_list = this.webService.getCharacters(this.page);
  }

  // firstPage() {
  //   if (this.page > 14) {
  //     this.page = this.page -13;
  //     sessionStorage['page'] = this.page;
  //     this.character_list = this.webService.getCharacters(this.page);
  //   }
  // }
  

  previousPage() {
    if (this.page > 1) {
      this.page = this.page -1;
      sessionStorage['page'] = this.page;
      this.character_list = this.webService.getCharacters(this.page);
    }
  }

  nextPage() {
    this.page = this.page + 1;
    sessionStorage['page'] = this.page;
    this.character_list = this.webService.getCharacters(this.page);
  }

  // lastPage() {
  //   if (this.page >= 1) {
  //     this.page = this.page +14;
  //     sessionStorage['page'] = this.page;
  //     this.character_list = this.webService.getCharacters(this.page);
  //   }
  // }
  


   

  character_list: any = [];
  page: number = 1;

}
