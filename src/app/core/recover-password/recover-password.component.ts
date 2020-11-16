import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { birthDateValidator } from 'src/app/core/validators/birthdate.validators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MustMatch } from '../validators/Custom-Must-Match-Validator';
import { SmsService } from '@app/features/_services/sms.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  userform: FormGroup;
  currentUser;
  version: string;

  constructor(private smsService: SmsService, private userService: AuthenticationService, private router: Router, private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit() {
    this.currentUser = this.userService.getcurrentUser;
    //console.log(this.currentUser)
    this.userform = this.fb.group({
      //'Mobile': new FormControl('', Validators.required),
      'NatioalCode': new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]))
    }
    );

    this.version = environment.version;
  }

  checkNationalCode() {
    if (this.userform.controls["NatioalCode"].value != undefined && this.userform.controls["NatioalCode"].value.length == 10) {
      if (this.userform.controls["NatioalCode"].value == '0000000000' || this.userform.controls["NatioalCode"].value == '1111111111' || this.userform.controls["NatioalCode"].value == '2222222222' || this.userform.controls["NatioalCode"].value == '3333333333' || this.userform.controls["NatioalCode"].value == '4444444444' || this.userform.controls["NatioalCode"].value == '5555555555' || this.userform.controls["NatioalCode"].value == '6666666666' || this.userform.controls["NatioalCode"].value == '7777777777' || this.userform.controls["NatioalCode"].value == '8888888888' || this.userform.controls["NatioalCode"].value == '9999999999') {
        this.userform.get('NatioalCode').setErrors({ invalidNumber: { message: 'کد ملی صحیح نمیباشد' } })
      } else {
        var c = parseInt(this.userform.controls["NatioalCode"].value.charAt(9));
        var n = parseInt(this.userform.controls["NatioalCode"].value.charAt(0)) * 10 + parseInt(this.userform.controls["NatioalCode"].value.charAt(1)) * 9 + parseInt(this.userform.controls["NatioalCode"].value.charAt(2)) * 8 + parseInt(this.userform.controls["NatioalCode"].value.charAt(3)) * 7 + parseInt(this.userform.controls["NatioalCode"].value.charAt(4)) * 6 + parseInt(this.userform.controls["NatioalCode"].value.charAt(5)) * 5 + parseInt(this.userform.controls["NatioalCode"].value.charAt(6)) * 4 + parseInt(this.userform.controls["NatioalCode"].value.charAt(7)) * 3 + parseInt(this.userform.controls["NatioalCode"].value.charAt(8)) * 2;
        var r = n - Math.floor(n / 11) * 11;// n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
          console.log('sahih ast');
          this.userform.get('NatioalCode').setErrors(null)
        }
        else {
          console.log('sahih nist');
          this.userform.get('NatioalCode').setErrors({ invalidNumber: { message: 'کد ملی صحیح نمیباشد' } })
        }
      }
    }
    else {

      //this.userform.controls["NatioalCode"].setErrors({ 'invalidNumber': true });
    }
  }



  private randomPass: string;
  onClickChangePassword() {
    this.checkNationalCode();
    if (this.userform.valid) {
      this.randomPass = (Math.floor(Math.random() * (999999 - 100000)) + 100000).toString();
      this.userService.recoverpassword(this.userform.controls["NatioalCode"].value, this.randomPass, environment.appId).subscribe(
        data => {
          if (data.msgRet == "1") {
            this.toastService.addSingle("error", "", "شما در سیستم احراز هویت نشده اید")
            this.router.navigate(['/otp']);
          }
          else if (data.msgRet == "2") {
            this.toastService.addSingle("error", "", "چنین کاربری در سیستم تعریف نشده است با مسئول سیستم تماس حاصل نمایید(4144)")
          }
          else {
            var mes = "همکار گرامی گذرواژه شما برای ورود به " + environment.appName + " " + this.randomPass;
            let d = { Mobile: data.Mobile, Message: mes }
            this.smsService.SendSms(d)

            this.toastService.addSingle("success", "", "کاربر گرامی گذرواژه به تلفن همراه ثبت شده در سیستم ارسال گردید")
            this.router.navigate(['/login']);
          }
        },
        err => { console.log(err) }
      );
    }
    // if (isRegistered) {
    //   this.router.navigate(['/login']);
    //   this.toastService.addSingle("success", "", "User registered.")
    //}
  }

  onClickGoToLogin() {
    this.router.navigate(['/main/dashboard']);
  }

  isClickCapcha:boolean=false
  showResponse(event) {
    this.isClickCapcha = true
    
}

}
