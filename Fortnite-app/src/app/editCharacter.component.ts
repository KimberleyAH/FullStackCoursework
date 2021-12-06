import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'editCharacter',
  templateUrl: './editCharacter.component.html',
  styleUrls: ['./editCharacter.component.css']
})
export class editCharacterComponent {

    editCharacterForm: any;

    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public authService: AuthService,
                private router: Router) {}
//validation required to complete form                
ngOnInit() {
    this.editCharacterForm = this.formBuilder.group( {
        name: ['', Validators.required],
        age: ['', Validators.required],
        weapon: ['', Validators.required],
        victories: ['',Validators.required]
    });

    this.character_list = this.webService.getCharacter(this.route.snapshot.params['id']);    
    this.characters = this.webService.getCharacters(this.route.snapshot.params['id'])

}
//submit function to edit character and reset form
onSubmit() {
    this.webService.putCharacter(this.editCharacterForm.value)
        .subscribe( (response: any) => {
            this.editCharacterForm.reset();
            this.characters = this.webService.getCharacters(this.route.snapshot.params['id']);
        })
    this.editCharacterForm.reset();
  }
//validation controls
isInvalid(control: any){
    return this.editCharacterForm.controls[control].invalid &&
           this.editCharacterForm.controls[control].touched;
  }

  isunTouched() {
    return this.editCharacterForm.controls.name.pristine ||
           this.editCharacterForm.controls.age.pristine ||
           this.editCharacterForm.controls.weapon.pristine ||
           this.editCharacterForm.controls.victories.pristine;
  }

  isIncomplete()  {
    return this.isInvalid('name') ||
           this.isInvalid('age') ||
           this.isInvalid('weapon') ||
           this.isInvalid('victories') ||
           this.isunTouched();
  }
//https://stackoverflow.com/questions/47010159/how-to-redirect-to-a-new-page-in-angular-4-through-button-click
//return to page selected, difficulty implementing this on new character and edit character/edit rank
  goToPage(pageName:string){     
    this.router.navigate([pageName]);   
  }

  character_list: any = [];
  characters: any = [];

}