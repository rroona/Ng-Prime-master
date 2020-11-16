import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentComponent } from '../attachment.component';
import { AttachmentInsertComponent } from './attachment-insert.component';


const routes: Routes = [
  {path:'', component:AttachmentInsertComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachmentInsertRoutingModule { }
