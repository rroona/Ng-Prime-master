import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '../gaurds/configuration';


import { User } from '../models/user.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    }


    public get getcurrentUser(): User {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        return this.currentUserSubject.value;
    }


    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    // login(username: string, password: string , appId:number) {
    //     return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password ,appId})

    // }

    login(username: string, password: string, appId: number) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password, appId })
            .pipe(map(user => {
                //console.log(user['token'])
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(user['token']));
                this.currentUserSubject.next(user);
                return user;
            }));
    }



    changPassword(username: string, password: string, newPassword: string, appId: number) {
        return this.http.post<any>(`${environment.apiUrl}/users/change-password`, { username, password, newPassword, appId })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }


    recoverpassword(natioalcode: string, password: string, appId: number) {

        return this.http.post<any>(`${environment.apiUrl}/users/recover-password`, { natioalcode, password, appId })
            .pipe(map(msg => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(msg);
                return msg;
            }));
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}