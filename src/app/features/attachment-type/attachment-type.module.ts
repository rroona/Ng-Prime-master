import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachmentTypeRoutingModule } from './attachment-type-routing.module';
import { AttachmentTypeComponent } from './attachment-type.component';
import{AppCommonModule} from '@app/app.common.module';


@NgModule({
  declarations: [AttachmentTypeComponent],
  imports: [
    CommonModule,
    AttachmentTypeRoutingModule,
    AppCommonModule
  ]
})
export class AttachmentTypeModule { }
