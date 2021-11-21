import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService{

  constructor(private http: HttpClient){

  }

  character_list: any;

  getCharacters(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/characters?pn=' + page);
        }
  

  getCharacter(id: any) {
    return this.http.get('http://localhost:5000/api/v1.0/characters/' + id).toPromise();
  }
}



  