import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.api);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createUser(payload: any) {
    return this.http.post(this.api, payload);
  }
}
