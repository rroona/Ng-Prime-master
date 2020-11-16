import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { User } from '../models/user.model';
import { Configuration } from '../gaurds/configuration';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  private _value: User;
  public get value(): User {
    return this._value;
  }
  public set value(v: User) {
    this._value = v;
  }

  getAll() {
    return this.http.get<User[]>(Configuration.ApiUrl + 'users');
  }

  getById(data) {
    return this.http.post<User>(Configuration.ApiUrl + 'users/getById', { data });
  }

  getByFilter(data) {
    const params = new HttpParams()
      .set('parent', data);
    return this.http.get<User[]>(Configuration.ApiUrl+'users/getByFilter', { params });
      // .toPromise()
      // .then(res => <any>res.data)
      // .then(data => { return data; });
  }
}