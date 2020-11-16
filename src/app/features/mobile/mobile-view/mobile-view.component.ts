import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, Message, SelectItem, LazyLoadEvent } from 'primeng/api';
import { ConfirmService } from '@app/features/_services/confirm.service';
import { Role } from '@app/features/_models/role';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MobileViewComponent implements OnInit {


  parent: any[];
  CurrentRow: any;
  selectedRows: any[] = [];
  displayDialog: boolean = false;
  @ViewChild('dt') table: Table;
  loading: boolean = true;
  submitted = false;
  //cols: any[];
  currentUser;
  attachmentItems: any
  attachmentPath = environment.attachmentPath;
  statuses: any[];
  msgs: Message[] = [];
  totalRecords: number;


  constructor(private mobileService: ConfirmService) { }

  ngOnInit(): void {
    this.read()
  }


  read() {
    this.loading = true;
    this.mobileService.getAll().subscribe(
      res => { 
        console.log(res)
        this.parent = res;
      this.loading = false;
      },
      err => { 
        this.loading = false
      }
    );
  }

  exportExcel() {
    this.mobileService.getAll().subscribe(
      data => {
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Export");
        });
      },
      error => {
        console.log(error)
      }
    );
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


  get isAdmin() {
    return this.currentUser.role.indexOf(Role.Admin) > 0;
  }

  CanAccess(role: string) {

    if (this.currentUser && this.currentUser.UserRoles.indexOf(role) > 0) {
      return true
    }

  }

}
