import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent {

  constructor(private webService: WebService) {}

  async ngOnInit() {
    var response = await this.webService.getRoster();
    this.roster_list = response;
  }

  roster_list: any;

}
