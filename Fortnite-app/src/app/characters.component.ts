import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  constructor(public webService: WebService) {}

    ngOnInit() {
      if (sessionStorage['page']) {
        this.page = Number(sessionStorage['page']);
      }
    this.character_list = this.webService.getCharacters(this.page);
  }

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

  character_list: any = [];
  page: number = 1;

}
