// import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import { WebService } from './web.service';
// import { AuthService } from '@auth0/auth0-angular'
// import {Observable, of} from 'rxjs';
// import { delay, map, tap } from 'rxjs/operators';

// interface IServerResponse {
//     items: string[];
//     total: number;
// }

// @Component({
//   selector: 'testPagination',
//   templateUrl: './testPagination.component.html',
//   styleUrls: ['./testPagination.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush

// })
// export class testPagination {
//     constructor(private webService: WebService,
//                 public authService: AuthService) {}

//     @Input('fortnite') character: string[] = [];
//     asynccharacter_list: Observable<string[]>;
//     p: number = 1;
//     total: number;
//     loading: boolean;

//     ngOnInit() {
//         this.getPage(1);
//     }

//     getPage(page: number) {
//         this.loading = true;
//         this.asynccharacter_list = serverCall(this.character, page).pipe(
//             tap(res => {
//                 this.total = res.total;
//                 this.p = page;
//                 this.loading = false;
//             }),
//             map(res => res.items)
//         );
//     }
// }

// /**
//  * Simulate an async HTTP call with a delayed observable.
//  */
// function serverCall(character: string[], page: number): Observable<IServerResponse> {
//     const perPage = 10;
//     const start = (page - 1) * perPage;
//     const end = start + perPage;

//     return of({
//             items: character.slice(start, end),
//             total: 100
//         }).pipe(delay(1000));
// }
// //   page: number = 1;

// //   constructor(private webService: WebService,
// //               public authService: AuthService) {}

// //     ngOnInit() {
// //       if (sessionStorage['page']) {
// //         this.page = Number(sessionStorage['page']);
// //       }
// //     this.character_list = this.webService.getCharacters(this.page);
// //   }

// //   previousPage() {
// //     if (this.page > 1) {
// //       this.page = this.page -1;
// //       sessionStorage['page'] = this.page;
// //       this.character_list = this.webService.getCharacters(this.page);
// //     }
// //   }

// //   nextPage() {
// //     this.page = this.page + 1;
// //     sessionStorage['page'] = this.page;
// //     this.character_list = this.webService.getCharacters(this.page);
// //   }

// //   lastPage() {
// //     this.page = this.page - 1;
// //     sessionStorage['page'] = this.page;
// //     this.character_list = this.webService.getCharacters(this.page);
// //   }

  

   

// //   character_list: any = [];



