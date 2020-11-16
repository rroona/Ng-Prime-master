import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileViewComponent } from './mobile-view/mobile-view.component';


const routes: Routes = [
  {path:'', component:MobileViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
