import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachmentListRoutingModule } from './attachment-list-routing.module';
import { AttachmentListComponent } from './attachment-list.component';
import{AppCommonModule} from '@app/app.common.module';


@NgModule({
  declarations: [AttachmentListComponent],
  imports: [
    CommonModule,
    AttachmentListRoutingModule,
    AppCommonModule
  ]
})
export class AttachmentListModule { }
