import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentListComponent } from './attachment-list.component';


const routes: Routes = [
  {path:'',component:AttachmentListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachmentListRoutingModule { }
