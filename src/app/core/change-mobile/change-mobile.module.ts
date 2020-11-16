import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeMobileRoutingModule } from './change-mobile-routing.module';
import { ChangeMobileComponent } from './change-mobile.component';

import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  declarations: [ChangeMobileComponent],
  imports: [
    CommonModule,
    ChangeMobileRoutingModule,
    AppCommonModule
  ]
})
export class ChangeMobileModule { }
