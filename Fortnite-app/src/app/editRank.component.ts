import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'editRank',
  templateUrl: './editRank.component.html',
  styleUrls: ['./editRank.component.css']
})
export class editRankComponent {

    editRankForm: any;

    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public authService: AuthService,
                private router: Router) {}
                
ngOnInit() {

  this.editRankForm = this.formBuilder.group( {
    username: ['', Validators.required],
    comment: ['', Validators.required],
    rank: 0
  });

    this.rank = this.webService.getRank(this.route.snapshot.params['rank_id']);    
    this.character = this.webService.getCharacter(this.route.snapshot.params['char_id'])

}

onSubmit() {
  this.webService.putRank(this.editRankForm.value)
    .subscribe( ( reponse: any) => {
      this.editRankForm.reset();
      this.rank = this.webService.getRank(this.route.snapshot.params['id']);
    })
}

isInvalid(control: any){
  return this.editRankForm.controls[control].invalid &&
         this.editRankForm.controls[control].touched;
}

isunTouched() {
  return this.editRankForm.controls.username.pristine ||
         this.editRankForm.controls.comment.pristine;
}

isIncomplete()  {
  return this.isInvalid('username') ||
         this.isInvalid('comment') ||
         this.isunTouched();
}

  goToPage(pageName:string){     
    this.router.navigate([pageName]);   
  }

  rank: any = [];
  character: any = [];

}