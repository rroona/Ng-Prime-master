import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { MobileConfirmRoutingModule } from './mobile-confirm-routing.module';
import { MobileConfirmComponent } from './mobile-confirm.component';


@NgModule({
  declarations: [MobileConfirmComponent],
  imports: [
    CommonModule,
    MobileConfirmRoutingModule,
    AppCommonModule
  ]
})
export class MobileConfirmModule { }
