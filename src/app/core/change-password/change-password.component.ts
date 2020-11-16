import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { birthDateValidator } from 'src/app/core/validators/birthdate.validators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MustMatch } from '../validators/Custom-Must-Match-Validator';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userform: FormGroup;

  version: string;

  currentUser;

  constructor(private userService: AuthenticationService, private router: Router, private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit() {
    this.currentUser = this.userService.getcurrentUser;
    //console.log(this.currentUser)
    this.userform = this.fb.group({
      'Oldpassword': new FormControl('', Validators.required),
      'NewPassword':       new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'NerifyNewPassword': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    }, {
      validator: MustMatch('NewPassword', 'NerifyNewPassword')
  }
    );

    this.version = environment.version;
  }

  onClickChangePassword() {
     this.userService.changPassword(this.currentUser.PrsnNo,
      this.userform.controls["Oldpassword"].value,
      this.userform.controls["NewPassword"].value,
      environment.appId).subscribe(
        data=>{//console.log(data)
          if(data)
          this.toastService.addSingle("error", "", data)
          else
          {
          this.router.navigate(['/login']);
             this.toastService.addSingle("success", "", "گذرواژه با موفقیت تغییر یافت")
          }
        },
        err=>{console.log(err)}
      );
    // if (isRegistered) {
    //   this.router.navigate(['/login']);
    //   this.toastService.addSingle("success", "", "User registered.")
    //}
  }

  onClickGoToLogin() {
    this.router.navigate(['/main/dashboard']);
  }

}

