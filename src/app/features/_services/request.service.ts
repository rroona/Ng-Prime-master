import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) { }


private _attachmentType : number;
public get attachmentType() : number {
  return this._attachmentType;
}
public set attachmentType(v : number) {
  this._attachmentType = v;
}



  create(data) {
    return this.http.post<string>(environment.apiUrl+'/request/create', { data });
  }

  update(data) {
    
    return this.http.post<string>(environment.apiUrl+'/request/update', { data });
  }

  read() {
    
    return this.http.post<any>(environment.apiUrl+'/request/read',{});
  }

  delete(data) {
    
    return this.http.post<any>(environment.apiUrl+'/request/delete',{ data });
  }


  readbyfilter(data) {
    return this.http.post<any>(environment.apiUrl+'/request/readbyfilter',{data});
  }

  getByOId(data) {
    return this.http.post<any>(environment.apiUrl+'/request/getByOId',{data});
  }


  deleteFile(data) {
    return this.http.post<any>(environment.apiUrl + '/request/deleteFile', { data });
  }


  lazyLoad(first,rows,totalRecords,sortField,sortOrder,filter) {
    var data = {first:first,rows:rows,totalRecords:totalRecords , columnName:sortField,AscDesc:sortOrder,filter:filter}
    return this.http.post<any>(environment.apiUrl + '/request/lazyLoad', { data });
  }
 
}