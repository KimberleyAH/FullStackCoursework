// import { Component } from '@angular/core';
// import { WebService } from './web.service';
// import { AuthService } from '@auth0/auth0-angular';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';




// @Component({
//   selector: 'deleteRank',
//   templateUrl: './deleteRank.component.html',
//   styleUrls: ['./deleteRank.component.css']
// })
// export class deleteRankComponent {

//   constructor(private webService: WebService,
//               public authService: AuthService,
//               private route: ActivatedRoute,
//               private router: Router) {}

// ngOnInit() {
    
//     this.rank = this.webService.deleteRank(this.route.snapshot.params['char_id'],this.route.snapshot.params['rank_id'])
//     }

// deleteRank() {
//     this.webService.deleteRank(this.route.snapshot.params['char_id'],this.route.snapshot.params['rank_id'])
//     .subscribe();
//     }


// goToPage(pageName:string){     
//     this.router.navigate([`${pageName}`]);   
//     }
    

// ranks: any = [];
// rank: any = [];
// }
