import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'newCharacter',
  templateUrl: './newCharacter.component.html',
  styleUrls: ['./newCharacter.component.css']
})
export class newCharacterComponent {

    newCharacterForm: any;

    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public authService: AuthService,
                private router: Router) {}
                
ngOnInit() {
    this.newCharacterForm = this.formBuilder.group( {
        name: ['', Validators.required],
        age: ['', Validators.required],
        weapon: ['', Validators.required],
        victories: ['',Validators.required]
    });

    this.character_list = this.webService.getCharacter(this.route.snapshot.params['id']);    
    this.characters = this.webService.getCharacters(this.route.snapshot.params['id'])

}

onSubmit() {
    this.webService.postNewCharacter(this.newCharacterForm.value)
        .subscribe( (response: any) => {
            this.newCharacterForm.reset();
            this.characters = this.webService.getCharacters(this.route.snapshot.params['id']);
        })
    this.newCharacterForm.reset();
  }

isInvalid(control: any){
    return this.newCharacterForm.controls[control].invalid &&
           this.newCharacterForm.controls[control].touched;
  }

  isunTouched() {
    return this.newCharacterForm.controls.name.pristine ||
           this.newCharacterForm.controls.age.pristine ||
           this.newCharacterForm.controls.weapon.pristine ||
           this.newCharacterForm.controls.victories.pristine;
  }

  isIncomplete()  {
    return this.isInvalid('name') ||
           this.isInvalid('age') ||
           this.isInvalid('weapon') ||
           this.isInvalid('victories') ||
           this.isunTouched();
  }

  goToPage(pageName:string){     
    this.router.navigate([pageName]);   
  }

  character_list: any = [];
  characters: any = [];

}