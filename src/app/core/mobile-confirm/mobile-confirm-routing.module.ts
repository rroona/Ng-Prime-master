import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileConfirmComponent } from './mobile-confirm.component';
//import { Confirm2Component } from './confirm2/confirm2.component';


const routes: Routes = [

{
    path: '',
    component: MobileConfirmComponent,
    
},
// {
//     path: 'cotp',
//     component: Confirm2Component,
//     loadChildren: () => import('src/app/features/mobile-confirm/confirm2/confirm2.module').then(m => m.Confirm2Module)
// }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileConfirmRoutingModule { }
