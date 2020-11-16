import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@app/core/login/login.component';
import { LoginRoutingModule } from '@app/core/login/login.routing';
import { AppCommonModule } from 'src/app/app.common.module';
import { HttpClient } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    AppCommonModule,

  ],
  declarations: [LoginComponent],
  exports: []
})
export class LoginModule { }