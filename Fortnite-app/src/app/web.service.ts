import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class WebService{

  constructor(private http: HttpClient){

  }

  getCharacters() {
    return this.http.get('http://localhost:5000/api/v1.0/characters').toPromise();
  } 

  getCharacter(id: any) {
    return this.http.get(
      'http://localhost:5000/api/v1.0/characters/' + id
    ).toPromise();
  }
}




  