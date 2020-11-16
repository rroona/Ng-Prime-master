import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';
import { Role } from '@app/features/_models/role';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    currentUser;
    constructor(private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }



    get isAdmin() {
        this.currentUser = this.authenticationService.currentUserValue;
        return this.currentUser.UserRoles.indexOf(Role.Admin) > 0;
    }

    CanAccess(role: string) {
        if (this.currentUser.UserName == "Admin")
            return true
        else {
            if (this.currentUser && this.currentUser.UserRoles.indexOf(role) > 0) {
                //console.log(role)
                return true
            }
        }

    }


    getMenuList(): CustomMenuItem[] {
        return [
            // {
            //     Label: 'Home', Icon: 'fa-info', RouterLink: '/main/dashboard', Childs: null, IsChildVisible: false
            // },


            // {
            //     Label: 'اطلاعات پایه', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
            //         { Label: 'معرفی انواع درخواست', RouterLink: '/baseinfo/attachment-type', Childs: null, IsChildVisible: false },


            //     ], IsChildVisible: false
            // },
 {
                Label: 'خانه', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null, IsChildVisible: false, Visible: true
            },
            {
                Label: 'تغییر گذر واژه', Icon: 'fa-cog', RouterLink: '/changepass', Childs: null, IsChildVisible: false, Visible: true
            },
            {
                Label: 'تغییر شماره همراه در سامانه', Icon: 'fa-mobile', RouterLink: '/main/change-mobile', Childs: null, IsChildVisible: false, Visible: true
            },

            // {
            //     Label: 'درخواستهای من', Icon: 'fa-home', RouterLink: '/main/attachment/attachment-list', Childs: null, IsChildVisible: false, Visible: this.CanAccess('attachment_view')
            // },

        //   { Label: 'معرفی انواع درخواست', Icon: 'fa-info', RouterLink: '/baseinfo/attachment-type', Childs: null, IsChildVisible: false, Visible: this.CanAccess('AttachmentType_insert') },
            {
                Label: 'مشاهده درخواست ها', Icon: 'fa-home', RouterLink: '/main/request/request-list', Childs: null, IsChildVisible: false, Visible: this.CanAccess('Request_view')
            },
            {
                Label: 'مشاهده اطلاعات تماس', Icon: 'fa-mobile', RouterLink: '/main/mobile-view', Childs: null, IsChildVisible: false, Visible: this.CanAccess('MobileConfirm_view')
            },

            // {
            //     Label: 'معرفی پروژه', Icon: 'fa-exclamation', RouterLink: '/main/pd/parent', Childs: null, IsChildVisible: false
            // },
            // {
            //     Label: 'معرفی فعالیت', Icon: 'fa-sitemap', RouterLink: '/main/pd/child', Childs: null, IsChildVisible: false
            // },
            // {
            //     Label: 'Departments', Icon: 'fa-sitemap', RouterLink: '/main/departments', Childs: null, IsChildVisible: false
            // },
            // {
            //     Label: 'AboutUs', Icon: 'fa-info-circle', RouterLink: '/main/aboutus', Childs: null, IsChildVisible: false
            // },
            // {
            //     Label: 'ContactUs', Icon: 'fa-envelope', RouterLink: '/main/contactus', Childs: null, IsChildVisible: false
            // },
            // {
            //     Label: 'Error 404', Icon: 'fa-exclamation-triangle', RouterLink: '/error', Childs: null, IsChildVisible: false
            // },
            // {
            //     Label: 'Menu Level 1', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
            //         { Label: 'Menu Level 1.1', RouterLink: null, Childs: null, IsChildVisible: false },
            //         {
            //             Label: 'Menu Level 1.2', RouterLink: null, IsChildVisible: false, Childs: [
            //                 { Label: 'Menu Level 1.2.1', RouterLink: null, Childs: null, IsChildVisible: false },
            //                 { Label: 'Menu Level 1.2.2', RouterLink: null, Childs: null, IsChildVisible: false }
            //             ]
            //         }
            //     ], IsChildVisible: false
            // }
        ];
    }
}