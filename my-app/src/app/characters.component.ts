import { Component } from '@angular/core';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  characters_list = [
    { "name": "Pizza Place",
    "city": "Coleraine",
    "review_count": 10 },
    { "name": "Wine Lake",
    "city": "Ballymoney",
    "review_count": 7 },
    { "name": "Beer Tavern",
    "city": "Ballymena",
    "review_count": 12 }
    ];

}
