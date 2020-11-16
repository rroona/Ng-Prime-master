import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachmentRoutingModule } from './attachment-routing.module';
import { AttachmentComponent } from './attachment.component';


@NgModule({
  declarations: [AttachmentComponent],
  imports: [
    CommonModule,
    AttachmentRoutingModule
  ]
})
export class AttachmentModule { }
