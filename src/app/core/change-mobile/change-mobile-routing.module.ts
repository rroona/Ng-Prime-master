import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeMobileComponent } from './change-mobile.component';


const routes: Routes = [
  {
    path:'',component:ChangeMobileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeMobileRoutingModule { }
