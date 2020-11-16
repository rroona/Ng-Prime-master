import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';




@Injectable({ providedIn: 'root' })
export class SmsService {
    constructor(private http: HttpClient) { }
   private UserName= "mpi_ikd";
    private Password= "ikd";


     SendSms(data) {


        const params = new HttpParams()
        
        .set('Password', this.Password)
        .set('UserName', this.UserName)
        .set('Mobile', data.Mobile)
        .set('Message', data.Message);
        
        return this.http.post(environment.Smsapi+'api/values/',{ params }).subscribe(
          a=>{console.log(a)},
          b=>{console.log(b)}
        );
      }


      SendMessageSms(data) {

    
        const params = new HttpParams()
        .set('Mobile', data.Mobile)
        .set('Password', this.Password)
        .set('Message', data.Message)
        .set('UserName', this.UserName);
        return this.http.post(environment.Smsapi+'api/values/',{ params }).subscribe(
          a=>{console.log(a)},
          b=>{console.log(b)}
        );
      }
}