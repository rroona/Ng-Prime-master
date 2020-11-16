import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentComponent } from './attachment.component';
import { AttachmentInsertComponent } from './attachment-insert/attachment-insert.component';
import { AttachmentListComponent } from './attachment-list/attachment-list.component';
import { AuthGuard } from '@app/core/gaurds/auth.guard';
import { Role } from '@app/features/_models/role';




const routes: Routes = [

  {
    path: '',
    component:AttachmentComponent
},
{
    path: 'request-insert',
    component: AttachmentInsertComponent,
    loadChildren: () => import('src/app/features/attachment/attachment-insert/attachment-insert.module').then(m => m.AttachmentInsertModule),
    canActivate:[AuthGuard],
    data: { roles: Role.Request_insert , Descr:'ایجاد درخواست' }
},
{
    path: 'request-list',
    component: AttachmentListComponent,
    loadChildren: () => import('src/app/features/attachment/attachment-list/attachment-list.module').then(m => m.AttachmentListModule),
    canActivate:[AuthGuard],
    data: { roles: Role.Request_view , Descr:'مشاهده درخواست' }
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachmentRoutingModule { }
