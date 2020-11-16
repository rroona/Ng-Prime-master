import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { MobileViewComponent } from './mobile-view/mobile-view.component';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  declarations: [MobileComponent, MobileViewComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    AppCommonModule
  ]
})
export class MobileModule { }
