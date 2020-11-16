import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { MobileConfirm } from '../_models/mobile-confirm';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private http: HttpClient) { }

  private _value: any;
  public get value(): any {
    return this._value;
  }
  public set value(v: any) {
    this._value = v;
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiUrl+`/mobile-confirm/${id}`);
}

  create(data: any) {
   // console.log(data)
    return this.http.post<any>(environment.apiUrl+'/mobile-confirm/create', { data });
  }

  update(data) {
    return this.http.post<any>(environment.apiUrl+'/mobile-confirm/update', { data });
  }

  changemobile(data) {
    return this.http.post<any>(environment.apiUrl+'/mobile-confirm/changemobile', { data });
  }

  readbyfilter(data) {
    return this.http.post<any>(environment.apiUrl+'/mobile-confirm/readbyfilter', { data });
  }

  getAll() {
    return this.http.post<any[]>(environment.apiUrl+'/mobile-confirm/read',{});
}

remove(id :number) {
  return this.http.delete(environment.apiUrl+`/mobile-confirm/${id}`);
}

}
