import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';


import { User } from '@app/core/models/user.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonelService {
  constructor(private http: HttpClient) { }




  getByFilter(data) {
    const params = new HttpParams()
      .set('parent', data);
    return this.http.get<User[]>(environment.apiUrl + '/pers/getByFilter', { params });
    // .toPromise()
    // .then(res => <any>res.data)
    // .then(data => { return data; });
  }

  getFamilyPersonelByFilter(data) {
    const params = new HttpParams()
      .set('parent', data);
    return this.http.get<User[]>(environment.apiUrl + '/pers/getFamilyPersonByFilter', { params });
  }

  // upload(data) {
  //   console.log(data);
  //   const params = new HttpParams()
  //     .set('myFile', data);
  //   return this.http.post(environment.apiUrl + "/uploadfile", { data });
  // }
}