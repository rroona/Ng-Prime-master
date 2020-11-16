import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { UserService } from '../_services/user.service';

import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfirmService } from '../../features/_services/confirm.service';
import { SmsService } from '../../features/_services/sms.service';
import { PersonelService } from '../../features/_services/personel.service';

@Component({
  selector: 'app-mobile-confirm',
  templateUrl: './mobile-confirm.component.html',
  styleUrls: ['./mobile-confirm.component.scss']
})
export class MobileConfirmComponent implements OnInit {


  text: string;

  disabled: boolean = true;

  toggleDisabled() {
    this.disabled = !this.disabled;
  }









  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: any;
  userFromApi: any;
  success;

  private random: number
  counter: { min: number, sec: number }

  IsGetVerificationCode:boolean=false;

  ConfirmCode
  Mobile
  NationalCode
  PrsnNo


  constructor(private formBuilder: FormBuilder,
    private confirmService: ConfirmService,
    //private userService: UserService,
    private PersonelService: PersonelService,
    private smsService: SmsService,
    private router: Router,

  ) {
    

  }






  startTimer() {
    //this.resendSms = '';

    var intervalId1 = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 2;
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






  //===========================================================================
  checkNationalCode() {
//console.log(this.NationalCode)
    //var meli_code = event.target.value
    if (this.NationalCode!= undefined && this.NationalCode.length == 10) {
      if (this.NationalCode == '0000000000' || this.NationalCode == '1111111111' || this.NationalCode == '2222222222' || this.NationalCode == '3333333333' || this.NationalCode == '4444444444' || this.NationalCode == '5555555555' || this.NationalCode == '6666666666' || this.NationalCode == '7777777777' || this.NationalCode == '8888888888' || this.NationalCode == '9999999999') {
        this.NationalCode.setErrors({ 'incorrect': true });
      } else {
        var c = parseInt(this.NationalCode.charAt(9));
        var n = parseInt(this.NationalCode.charAt(0)) * 10 + parseInt(this.NationalCode.charAt(1)) * 9 + parseInt(this.NationalCode.charAt(2)) * 8 + parseInt(this.NationalCode.charAt(3)) * 7 + parseInt(this.NationalCode.charAt(4)) * 6 + parseInt(this.NationalCode.charAt(5)) * 5 + parseInt(this.NationalCode.charAt(6)) * 4 + parseInt(this.NationalCode.charAt(7)) * 3 + parseInt(this.NationalCode.charAt(8)) * 2;
        var r = n - Math.floor(n / 11) * 11;// n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
         // console.log('sahih ast');
        }
        else {
        //  console.log('sahih nist');
          //this.loginForm.controls['NationalCode'].setErrors({ 'incorrect': true });
        }
      }
    }
    else
    {
     // console.log('sahih nist');
    }
  } 
  
 
  //===========================================================================
  ngOnInit(): void {
    this.counter = { min: 2, sec: 0 } // choose whatever you want
    this.random =0;
  }




 
  //===========================================================================
  // convenience getter for easy access to form fields

  //===========================================================================
  create() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    //this.PersonelService.getByFilter(this.loginForm.controls['PrsnNo'].value).subscribe(
    // user => {
    //console.log(user[0])
    //if(user[0]!=null||user[0]!=undefined)
    //{
    //+++++++++++++++++++++++++++
    this.random = (Math.floor(Math.random() * (999999 - 100000)) + 100000)
    var param = {PrsnNo:this.PrsnNo,Mobile:this.Mobile,ConfirmCode:this.random,NationalCode:this.NationalCode}
    this.confirmService.create(param)
      .pipe(first())
      .subscribe(
        data => {
          //خطا
          if (data.message != "") {
            //قبلا ثبت احراز هویت شده است
            this.error = data.message + " در حال انتقال لطفا صبر کنید ... ";
            this.loading = false;
            setTimeout(() => {
              this.router.navigate(['/main/dashboard']);
            }, 5000);
          }
          else {
            this.startTimer();
            this.loading = false;
            this.confirmService.value = { FullName: data.FullName, PrsnNo: data.data.PrsnNo, Mobile: data.data.Mobile };
            var mes = data.FullName + " عزیز " + " کد تایید ثبت نام در سامانه خدمات غیر حضوری امور پدر شرکت ایران خودرودیزل : " + this.random;
            let d = { Mobile: this.Mobile, Message: mes }

            this.smsService.SendSms(d)
            this.IsGetVerificationCode = true
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }


  //===========================================================================
  onSubmit() {
    this.submitted = true;
   

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    this.loading = true;
    this.error='';
    
    var param = {PrsnNo:this.PrsnNo,ConfirmCode:this.ConfirmCode/*,Mobile:this.Mobile,OldMobile:'',ChangeDate:''*/}
    this.confirmService.update(param)

      .pipe(first())
      .subscribe(
        data => {


          if (data != "") {
            // console.log(1)
            this.error = data;
            this.loading = false;
          }
          else {
            //console.log(2)
            this.error = '';
            this.loading = false;
            this.success = "با تشکر ، ثبت اطلاعات با موفقیت انجام گردید . در حال انتقال لطفا صبر کنید ...";
            var mes = this.confirmService.value.FullName + " عزیز،" + " ضمن تشکر شماره تماس شما در سامانه خدمات غیر حضوری امور پدر شرکت ایران خودرودیزل ثبت گردید  ";
            let d = { Mobile: this.confirmService.value.Mobile, Message: mes }
            this.smsService.SendSms(d)
            this.confirmService.value = undefined;
            setTimeout(() => {
              this.router.navigate(['/main/dashboard']);
            }, 5000);
          }

        

        },
        error => {
          this.success = '';
          this.error = error;
          this.loading = false;
        });
  }
  //===========================================================================
  showResponse(event) {
    //console.log(event)
  }


  isNewsActive() {
    return true;
  }

}
