import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from '@app/core/change-password/change-password.component';
import { ChangePasswordRoutingModule } from '@app/core/change-password/change-password.routing';
import { AppCommonModule } from 'src/app/app.common.module';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    AppCommonModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }