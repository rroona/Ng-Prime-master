import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/core/gaurds/auth.guard';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ErrorComponent } from './shared/error/error.component';
import { Role } from '@app/features/_models/role';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('@app/core/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'recoverpass',
        loadChildren: () => import('@app/core/recover-password/recover-password.module').then(m => m.RecoverPasswordModule),
        
    },
    {
        path: 'otp',
        loadChildren: () => import('@app/core/mobile-confirm/mobile-confirm.module').then(m => m.MobileConfirmModule),
        
    },
    {
        path: 'changepass',
        loadChildren: () => import('@app/core/change-password/change-password.module').then(m => m.ChangePasswordModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [{
            path: 'dashboard',
            loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'departments',
            loadChildren: () => import('src/app/features/department/department.module').then(m => m.DepartmentModule),
            canActivate: [AuthGuard]
            //data: { roles: Role.CanViewParentProject , Descr:'دسترسی به مشاهده پروژه ها' }
        },
        {
            path: 'request',
            loadChildren: () => import('src/app/features/attachment/attachment.module').then(m => m.AttachmentModule),
            canActivate: [AuthGuard]
        },
       
        {
            path: 'change-mobile',
            loadChildren: () => import('@app/core/change-mobile/change-mobile.module').then(m => m.ChangeMobileModule),
            canActivate: [AuthGuard]
        },

        {
            path: 'mobile-view',
            loadChildren: () => import('./features/mobile/mobile.module').then(m => m.MobileModule),
            canActivate: [AuthGuard],
            data: { roles: Role.MobileConfirm_view , Descr:'دسترسی به مشاهده پروژه ها' }
        },
        
        
    ]
    },


















    {
        path: 'baseinfo',
        component: LayoutComponent,
        children: [{
            path: 'attachment-type',
            loadChildren: () => import('src/app/features/attachment-type/attachment-type.module').then(m => m.AttachmentTypeModule),
            canActivate: [AuthGuard],
            data: { roles: Role.RequestType_insert , Descr:'ایجاد انواع درخواست پروژه' }
        },
        {
            path: 'departments',
            loadChildren: () => import('src/app/features/department/department.module').then(m => m.DepartmentModule),
            canActivate: [AuthGuard]
            //data: { roles: Role.CanViewParentProject , Descr:'دسترسی به مشاهده پروژه ها' }
        },
       
    ]
    },

















    {
        path: 'error',
        component: ErrorComponent,
        //loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }