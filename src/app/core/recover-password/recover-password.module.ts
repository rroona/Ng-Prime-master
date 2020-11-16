import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';

import { RecoverPasswordRouting } from './recover-password-routing';
import { RecoverPasswordComponent } from './recover-password.component';


@NgModule({
  declarations: [RecoverPasswordComponent],
  imports: [
    CommonModule,
    RecoverPasswordRouting,
    AppCommonModule
  ]
})
export class RecoverPasswordModule { }
