import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';


import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RequestItemsService {
  constructor(private http: HttpClient) { }




  create(data) {

    //console.log(data)
    // const params = new HttpParams()
    //   .set('Descr', data);
    return this.http.post<string>(environment.apiUrl + '/request-items/create', { data });
    // .toPromise()
    // .then(res => <any>res.data)
    // .then(data => { return data; });
  }



  update(data) {
    const params = new HttpParams()
      .set('parent', data);
    return this.http.post<string>(environment.apiUrl + '/request-items/update', { params });
  }

  read() {

    return this.http.post<any>(environment.apiUrl + '/request-items/read', {});
  }


  readbyfilter(data) {
    // const params = new HttpParams()
    // .set('parent', data);
    return this.http.post<any>(environment.apiUrl + '/request-items/readbyfilter', { data });
  }

  getByAttachmentId(data) {
    //console.log(data)
    // const params = new HttpParams()
    // .set('parent', data);
    return this.http.post<any>(environment.apiUrl + '/request-items/getByRequestId', { data });
  }



  deleteFile(data) {
    //console.log(data)
    // const params = new HttpParams()
    // .set('parent', data);
    return this.http.post<any>(environment.apiUrl + '/request-items/deleteFile', { data });
  }





  public upload(file:File) {

const formData =new FormData();
formData.append('uploadedImage',file)
return this.http.post(environment.uploaderApi,formData,{reportProgress:true,observe:'events'})
  }






}