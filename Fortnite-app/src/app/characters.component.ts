import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  constructor(private webService: WebService) {}

  async ngOnInit() {
    var response = await this.webService.getCharacters();
    this.characters_list = response;
  }

  characters_list: any;

}
