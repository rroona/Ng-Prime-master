import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '@app/features/_services/confirm.service';
import { SmsService } from '../../features/_services/sms.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-change-mobile',
  templateUrl: './change-mobile.component.html',
  styleUrls: ['./change-mobile.component.css']
})
export class ChangeMobileComponent implements OnInit {


  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: any;
  userFromApi: any;
  success;

  private random: number
  counter: { min: number, sec: number }

  IsGetVerificationCode: boolean = false;

  ConfirmCode
  NewConfirmCode
  Mobile
  NationalCode
  private PrsnNo

  NewMobile
IsBtnActive:boolean=false;
  FinalTask: boolean = false


  constructor(private confirmService: ConfirmService,
    private userService: AuthenticationService,
    private smsService: SmsService,
    private router: Router,) { }

  
  startTimer() {

    var intervalId1 = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      }
      else this.counter.sec -= 1
      if (this.counter.min === 0 && this.counter.sec == 0) {
        clearInterval(intervalId1)
        //this.resendSms = 'ارسال مجدد';
        window.location.reload();
      }
    }, 1000)
  }


  ngOnInit(): void {
    this.currentUser = this.userService.getcurrentUser;
    this.counter = { min: 2, sec: 0 } // choose whatever you want
    this.random = 0;
 
  }


  //===========================================================================
  checkNationalCode(NationalCode) {
    //console.log(this.NationalCode)
    //var meli_code = event.target.value
    if (NationalCode != undefined && NationalCode.length == 10) {
      if (NationalCode == '0000000000' || NationalCode == '1111111111' || NationalCode == '2222222222' || NationalCode == '3333333333' || NationalCode == '4444444444' || NationalCode == '5555555555' || NationalCode == '6666666666' || NationalCode == '7777777777' || NationalCode == '8888888888' || NationalCode == '9999999999') {
        NationalCode.setErrors({ 'incorrect': true });
      } else {
        var c = parseInt(NationalCode.charAt(9));
        var n = parseInt(NationalCode.charAt(0)) * 10 + parseInt(NationalCode.charAt(1)) * 9 + parseInt(NationalCode.charAt(2)) * 8 + parseInt(NationalCode.charAt(3)) * 7 + parseInt(NationalCode.charAt(4)) * 6 + parseInt(NationalCode.charAt(5)) * 5 + parseInt(NationalCode.charAt(6)) * 4 + parseInt(NationalCode.charAt(7)) * 3 + parseInt(NationalCode.charAt(8)) * 2;
        var r = n - Math.floor(n / 11) * 11;// n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
          //console.log('sahih ast');
         // this.error = "";
          this.IsBtnActive = true;
        }
        else {
          this.IsBtnActive = false
         // console.log('sahih nist');
          //this.error = "کد ملی صحیح نمیباشد";
          //this.loginForm.controls['NationalCode'].setErrors({ 'incorrect': true });
        }
      }
    }
    else {
      console.log('sahih nist');
    }
  }

  getByFilter() {
    var filter = "NationalCode = '" + this.NationalCode + "' and MoBile = '" + this.Mobile + "'"
    this.confirmService.readbyfilter(filter).subscribe(
      res => {

        if (!res) {
          this.error = "اطلاعات وارد شده صحیح نمیباشد";
        }
        else {
          if (!res.IsConfirmed) {
            this.error = ("شما در سیستم احراز هویت نشده اید. ")
            setTimeout(() => {
              this.router.navigate(['/otp']);
            }, 3000);

          }
          else {
            this.startTimer();
            this.PrsnNo = res.PrsnNo
            this.random = (Math.floor(Math.random() * (999999 - 100000)) + 100000)
            var mes = this.currentUser.UserName + " عزیز " + " درخواست تغییر شماره تلفن همراه در سامانه خدمات امور پدر. کد تایید درخواست : " + this.random;
            let d = { Mobile: this.Mobile, Message: mes }
            //console.log(this.random)
            this.smsService.SendSms(d)
            this.IsGetVerificationCode = true
            this.error = "";
          }
        }
        //console.log(res)
      },
      err => { }
    );
  }





  sendConfirmCode() {

    if (this.random == this.ConfirmCode) {

      this.error = "";
      if (this.NewMobile != this.Mobile) {

        this.random = (Math.floor(Math.random() * (999999 - 100000)) + 100000)
        var mes = this.currentUser.UserName + " عزیز،" + " کد تایید تغییر تلفن همراه در سامانه خدمات غیر حضوری امور پدر " + this.random;
        let d = { Mobile: this.NewMobile, Message: mes }
        this.smsService.SendSms(d)
        this.FinalTask = true;
      }
      else {
        this.error = ("شماره جدید وارد شده نمیتواند با شماره قبلی شما یکسان باشد . ")
        this.FinalTask = false;
      }
    }
    else {
      this.error = ("کد وارد شده صحیح نمیباشد. ")
      this.FinalTask = false;
    }
  }






  //===========================================================================
  onSubmit() {
    this.submitted = true;


    //stop here if form is invalid
    if (this.random != this.NewConfirmCode) {
      this.error = "کد وارد شده صحیح نمیباشد.";
      return;
    }
    this.loading = true;
    this.error = '';

    var param = { PrsnNo: this.PrsnNo, Mobile: this.NewMobile, OldMobile: this.Mobile }
   // console.log(param)
    this.confirmService.changemobile(param)

      .pipe(first())
      .subscribe(
        data => {
  console.log(data)

          if (data != "") {
           
            this.error = data;
            this.loading = false;
          }
          else {
            //console.log(2)
            this.success = "درخواست تغییر شماره تلفن همراه با موفقیت انجام گردید. در حال انتقال ...";
            this.error = '';
            this.loading = false;
            //this.success = "با تشکر ، ثبت اطلاعات با موفقیت انجام گردید . در حال انتقال لطفا صبر کنید ...";
            var mes = this.currentUser.UserName + " عزیز،" + " تلفن همراه شما در سامانه خدمات امور پدر تغییر کرد. ";
            let d = { Mobile: this.NewMobile, Message: mes }
            this.smsService.SendSms(d)
            // this.confirmService.value = undefined;
            this.NewConfirmCode = "";
            this.ConfirmCode ="";
            this.FinalTask=false
            setTimeout(() => {
              this.router.navigate(['/main/dashboard']);
            }, 3000);
          }



        },
        error => {
          this.success = '';
          this.error = error;
          this.loading = false;
        });
  }
  //===========================================================================


  isClickCapcha:boolean=false
  showResponse(event) {
    this.isClickCapcha = true
    
}
handleExpired()
{
  this.isClickCapcha = false
}
}
