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

  ngOnInit() {

    this.rankForm = this.formBuilder.group( {
      username: ['', Validators.required],
      comment: ['', Validators.required],
      rank: 5
    });

    

    this.character_list = this.webService.getCharacter(this.route.snapshot.params['id']);    
    this.ranks = this.webService.getRanks(this.route.snapshot.params['id']);
    }

    onSubmit() {
      this.webService.postRank(this.rankForm.value)
        .subscribe( ( reponse: any) => {
          this.rankForm.reset();
          this.ranks = this.webService.getRanks(this.route.snapshot.params['id']);
        })
    }

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

    deleteCharacter() {
      this.webService.deleteCharacter(this.route.snapshot.params['id'])
      .subscribe();
    }
//changing
    deleteRank(rank_id: any) {
      this.webService.deleteRank(this.route.snapshot.params['id'], rank_id)
      .subscribe();
      }


    goToPage(pageName:string){     
      this.router.navigate([`${pageName}`]);   
    }

    refreshPage(){     
      window.location.reload();   
    }

    

    



  character_list: any = [];
  ranks: any = [];
  character: any = [];
}

