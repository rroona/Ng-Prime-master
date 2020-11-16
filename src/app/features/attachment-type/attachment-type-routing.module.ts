import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentTypeComponent } from './attachment-type.component';


const routes: Routes = [
  {path:'', component:AttachmentTypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachmentTypeRoutingModule { }
