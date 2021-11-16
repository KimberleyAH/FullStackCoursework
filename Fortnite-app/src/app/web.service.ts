import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class WebService {

    constructor(private http: HttpClient) {

    }

    getRoster(){
        return this.http.get('http://localhost:5000/api/v1.0/roster').toPromise();
    }

    getCharacter(id: any) {
        return this.http.get(
            'http://localhost:5000/api/v1.0/roster/' + id
            ).toPromise();
    }
}