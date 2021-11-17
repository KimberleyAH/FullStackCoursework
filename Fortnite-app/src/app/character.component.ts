import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {

  constructor(private webService: WebService,
              private route: ActivatedRoute) {}
/*
  async ngOnInit() {
    var response = await this.webService.getCharacter(this.route.snapshot.params['id'])
    this.character = response;
  }
*/

  character: any;

}

