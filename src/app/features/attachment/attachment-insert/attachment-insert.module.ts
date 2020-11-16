import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachmentInsertRoutingModule } from './attachment-insert-routing.module';
import { AttachmentInsertComponent } from './attachment-insert.component';
import{AppCommonModule} from '@app/app.common.module';
  


@NgModule({
  declarations: [AttachmentInsertComponent],
  imports: [
    CommonModule,
    AttachmentInsertRoutingModule,
    AppCommonModule
  ]
})
export class AttachmentInsertModule { }
