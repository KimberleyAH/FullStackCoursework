import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular'
import { Router } from '@angular/router';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {

  rankForm: any;
  editCharacterForm: any;

  constructor(private webService: WebService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public authService: AuthService,
              private router: Router) {}
//validation required to complete form
  ngOnInit() {

    this.rankForm = this.formBuilder.group( {
      username: ['', Validators.required],
      comment: ['', Validators.required],
      rank: 0
    });

    

    this.character_list = this.webService.getCharacter(this.route.snapshot.params['id']);    
    this.ranks = this.webService.getRanks(this.route.snapshot.params['id']);
    }
//submit button function
    onSubmit() {
      this.webService.postRank(this.rankForm.value)
        .subscribe( ( reponse: any) => {
          this.rankForm.reset();
          this.ranks = this.webService.getRanks(this.route.snapshot.params['id']);
        })
    }
//validation controls
    isInvalid(control: any){
      return this.rankForm.controls[control].invalid &&
             this.rankForm.controls[control].touched;
    }

    isunTouched() {
      return this.rankForm.controls.username.pristine ||
             this.rankForm.controls.comment.pristine;
    }

    isIncomplete()  {
      return this.isInvalid('username') ||
             this.isInvalid('comment') ||
             this.isunTouched();
    }
//deleting a character
    deleteCharacter() {
      this.webService.deleteCharacter(this.route.snapshot.params['id'])
      .subscribe();
    }
    //deleting a rank
    deleteRank(rank_id: any) {
      this.webService.deleteRank(this.route.snapshot.params['id'], rank_id)
      .subscribe();
      }

//https://stackoverflow.com/questions/47010159/how-to-redirect-to-a-new-page-in-angular-4-through-button-click
//return to page selected
    goToPage(pageName:string){     
      this.router.navigate([`${pageName}`]);   
    }
//reloading to land on same page
    reloadComponent() {
      let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
      }

    

    



  character_list: any = [];
  ranks: any = [];
  character: any = [];
}

