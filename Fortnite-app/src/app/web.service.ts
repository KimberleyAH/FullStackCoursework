import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService{

  private characterID: any;

  constructor(private http: HttpClient){

  }

  character_list: any;

  getCharacters(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/characters?pn=' + page);
  }
  

  getCharacter(id: any) {
    this.characterID = id;
    return this.http.get('http://localhost:5000/api/v1.0/characters/' + id);
  }

  getRanks(id: any) {
    return this.http.get('http://localhost:5000/api/v1.0/characters/' + id + '/rank');
  }

  postRank(rank: any){
    let postData = new FormData();
    postData.append("username", rank.username);
    postData.append("comment", rank.comment);
    postData.append("rank", rank.rank);

    return this.http.post("http://localhost:5000/api/v1.0/characters/" +
                           this.characterID + '/rank', postData);
  }

  
  postNewCharacter(character: any){
    let postData = new FormData();
    postData.append("name", character.name);
    postData.append("age", character.age);
    postData.append("weapon", character.weapon);
    postData.append("victories", character.victories);

    return this.http.post("http://localhost:5000/api/v1.0/characters", postData);
  }  

  deleteCharacter(id: any){
    return this.http.delete('http://localhost:5000/api/v1.0/characters/' + id);
  }

  deleteRank(id: any){
    return this.http.delete('http://localhost:5000/api/v1.0/characters/' + this.characterID + '/rank/' + id);
  }



} 