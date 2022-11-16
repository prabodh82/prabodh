import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:5000/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveuser(user : {name  :String, age: number, gender : String}){
    return this.http.post(BASE_URL, user)
  }
}
