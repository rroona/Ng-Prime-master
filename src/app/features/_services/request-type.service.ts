import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RequestTypeService {
  constructor(private http: HttpClient) { }




  create(data) {
    console.log(data)
    // const params = new HttpParams()
    //   .set('Descr', data);
    return this.http.post<string>(environment.apiUrl+'/Request-type/create', { data });
      // .toPromise()
      // .then(res => <any>res.data)
      // .then(data => { return data; });
  }

  update(data) {
    const params = new HttpParams()
      .set('parent', data);
    return this.http.post<string>(environment.apiUrl+'/Request-type/update', { params });
  }

  read() {
    
    return this.http.post<any>(environment.apiUrl+'/Request-type/read',{});
  }


  readbyfilter(data) {
    // const params = new HttpParams()
    // .set('parent', data);
    return this.http.post<any>(environment.apiUrl+'/Request-type/readbyfilter',{data});
  }

 
}