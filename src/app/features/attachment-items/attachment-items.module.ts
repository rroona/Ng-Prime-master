import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachmentItemsRoutingModule } from './attachment-items-routing.module';
import { AttachmentItemsComponent } from './attachment-items.component';


@NgModule({
  declarations: [AttachmentItemsComponent],
  imports: [
    CommonModule,
    AttachmentItemsRoutingModule
  ]
})
export class AttachmentItemsModule { }
