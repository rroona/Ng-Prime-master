import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';

import { UserContextService } from 'src/app/core/services/user-context.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { first } from 'rxjs/operators';
import { Configuration } from 'src/app/core/gaurds/configuration';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;

  password: string;

  locale: string;

  version: string;

  msgs: any[];

  constructor(
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
  
    private userContextService: UserContextService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.userName = "";
    this.password = "";
    this.locale = this.sessionService.getItem("ng-prime-language");
    this.version = environment.version;
    this.msgs = [{ severity: 'info', detail: 'UserName: admin' }, { severity: 'info', detail: 'Password: password' }];


    const currentUser = this.authenticationService.currentUserValue;
    this.isClickCapcha = false;
  }



  onClickLogin() {
    // let user: User = this.userService.getUserByUserNameAndPassword(this.userName, this.password);
    // if (user) {
    //   this.userContextService.setUser(user);
    //   this.routeStateService.add("Dashboard", '/main/dashboard', null, true);
    //   return;
    // }
    // this.toastService.addSingle('error', '', 'Invalid user.');
    // return;




    this.authenticationService.login(this.userName, this.password , environment.appId)
    //.pipe(first())
        .subscribe(
            data => {
              //console.log(data)
              //{
               // if(data)
                //console.log("lll")
                
                this.routeStateService.add("Dashboard", '/main/dashboard', null, true);

                // else
                // {
                //   this.toastService.addSingle('error', '', 'نام کاربری یا کلمه عبور صحیح نمیباشد');
                // }
             // }                
            },
            error => {
              this.toastService.addSingle('error', '', error);
               console.log(error)
            });
  }

  

isClickCapcha:boolean=false
  showResponse(event) {
    //this.isClickCapcha = true
    
}

}
