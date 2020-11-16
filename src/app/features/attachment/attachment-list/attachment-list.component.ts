import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, Message, SelectItem, LazyLoadEvent } from 'primeng/api';
import { RequestService } from '../../_services/Request.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Role } from '@app/features/_models/role';
import { RequestItemsService } from '@app/features/_services/Request-items.service';
import { environment } from '@environments/environment';
import { SmsService } from '@app/features/_services/sms.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AttachmentListComponent implements OnInit {
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

  //selectedReason: string;
  //NonApprovalReasonItems: any[];

  constructor(private attachmentService: RequestService,
    private attachmentItemsService: RequestItemsService,
    private messageService: MessageService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private smsService: SmsService,
    private confirmationService: ConfirmationService) {
    this.statuses = [
      { label: 'تایید شده', value: '2' },
      { label: 'تایید نشده', value: '3' },
      { label: 'در حال بررسی', value: '1' },
      // {label: 'Negotiation', value: 'negotiation'},
      // {label: 'Renewal', value: 'renewal'},
      // {label: 'Proposal', value: 'proposal'}
    ]




  }

  NonApprovalReasonItems: string[] = [
    'باسلام ، لطفا با اصل کارنامه فرزند خود به اداره رفاه امور پدر مراجعه نمایید. باتشکر'
    , 'باسلام، متاسفانه معدل کارنامه فرزند شما مشمول ممتاز نمی باشد. باتشکر'
    , 'باسلام، لطفا نسبت به ارسال مجدد عکس کارنامه اقدام نمایید. باتشکر'
    , 'باسلام، لطفا نسبت به اصلاح و ارسال مجدد عکس کارنامه اقدام نمایید. باتشکر'
    , 'باسلام، کمک هزینه تحصیلی فرزندان ممتاز شامل دانشجویان نمی باشد. باتشکر'
    , 'باسلام، كارنامه فرزندان جابه جا ارسال شده لطفا به اسامي دقت فرموده دوباره ارسال فرماييد'
    , 'باسلام، لطفا با اصل کارنامه فرزند خود به اداره رفاه امور پدر مراجعه نمایید. باتشکر'
  ];

  filteredBrands: any[];
  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.NonApprovalReasonItems.length; i++) {
      let brand = this.NonApprovalReasonItems[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(brand);
      }
    }
  }


  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    //this.read();


  }

  get isAdmin() {
    return this.currentUser.role.indexOf(Role.Admin) > 0;
  }

  CanAccess(role: string) {

    if (this.currentUser && this.currentUser.UserRoles.indexOf(role) > 0) {
      return true
    }

  }

  // read() {
  //   //this.loading = true;
  //   this.attachmentService.read().subscribe(
  //     data => {
  //       this.datasource = data;
  //      // this.loading = false;
  //     },
  //     error => {
  //       console.log(error)
  //       //this.loading = false;
  //     }
  //   );

  // }

  update(data) {
    // console.log(data)
    this.attachmentService.update(data).subscribe(
      res => {
        this.UpdateLocalVariable_CurrentRow(data.StatusId)

        let d = { Mobile: this.CurrentRow.Mobile, Message: ' همکار گرامی، ' + this.CurrentRow.FullName + ' ،درخواست ' + this.CurrentRow.RequestTypeTitle + ' شما به نام  ' + this.CurrentRow.FamilyFullName + ' ' + this.CurrentRow.StatusDescr + ' است. ' + 'امور پدر شرکت ایران خودرودیزل' }
        this.smsService.SendSms(d)
        this.displayMaximizable = false;
        this.NonApprovalReason = null
      },
      error => { }
    );
  }

  confirmmessage: string = '';
  private p: any
  showAcceptConfirm(data) {

    this.CurrentRow = data;



    this.p = {
      RequestId: this.CurrentRow.RequestId,
      PrsnNo: this.CurrentRow.PrsnNo,
      Descr: this.CurrentRow.Descr,
      RequestTypeId: this.CurrentRow.RequestTypeId,
      StatusId: 2/*تایید*/,
      FamilyPersonsId: this.CurrentRow.FamilyPersonsId,
      ApproveUser: this.currentUser.PrsnNo,
      NonApprovalReason: this.CurrentRow.NonApprovalReason,
      Grade: this.CurrentRow.Grade
    }
    this.confirmmessage = ' آیا از تایید درخواست ' + ' [ ' + data.RequestTypeTitle + ' ] ' + ' برای ' + ' [ ' + data.FullName + ' ]' + ' اطمینان دارید؟ ';
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'تاییدیه  ', detail: this.confirmmessage });

  }

  IsDelete: boolean = false;
  showDeleteConfirm(data) {
    this.CurrentRow = data;
    this.IsDelete = true;
    this.confirmmessage = ' آیا از حذف درخواست ' + ' [ ' + data.RequestTypeTitle + ' ] ' + ' برای ' + ' [ ' + data.FullName + ' ]' + ' اطمینان دارید؟ ';
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'تاییدیه  ', detail: this.confirmmessage });

  }

  //====================================================================
  onConfirm() {
    if (this.IsDelete) {
      this.delete()
    }
    else {
      this.update(this.p)
    }
    this.messageService.clear('c');
  }
  //====================================================================

  onReject() {
    this.messageService.clear('c');
    this.displayMaximizable = false;
  }



  delete() {
    this.attachmentService.delete(this.CurrentRow).subscribe(
      res => {
        //حذف سطر جاری از آرایه
        this.parent.splice(this.parent.indexOf(this.CurrentRow), 1);
        this.attachmentItems = null
        this.IsDelete = false;
      },
      error => { }
    );
  }


  setCurrentRow(data) {
    this.CurrentRow = data;
  }


  UpdateLocalVariable_CurrentRow(StatusId) {
    this.CurrentRow.NonApprovalReason = this.NonApprovalReason;
    this.CurrentRow.StatusId = StatusId /* تایید نشده */;
    if (StatusId == 3)
      this.CurrentRow.StatusDescr = "تایید نشده"
    if (StatusId == 2)
      this.CurrentRow.StatusDescr = "تایید شده"
    this.CurrentRow.ApproveUser = this.currentUser.PrsnNo
  }


  NonApprovalReason: string
  //ثبت عدم تایید
  NonApproval() {
    //ست کردن پارامترها برای ارسال به متد
    this.p = {
      RequestId: this.CurrentRow.RequestId,
      PrsnNo: this.CurrentRow.PrsnNo,
      Descr: this.CurrentRow.Descr,
      RequestTypeId: this.CurrentRow.RequestTypeId,
      StatusId: 3 /* تایید نشده */,
      FamilyPersonsId: this.CurrentRow.FamilyPersonsId,
      NonApprovalReason: this.NonApprovalReason,
      ApproveUser: this.currentUser.PrsnNo,
      Grade: this.CurrentRow.Grade
    }
    this.update(this.p)
  }


  getRequestItems(data) {
    this.attachmentItems = null;
    this.attachmentItemsService.getByAttachmentId(data).subscribe(
      data => {
        this.attachmentItems = data;
      },
      error => { }
    );
  }






  exportColumns: any[];




  exportExcel() {
    this.attachmentService.read().subscribe(
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

  displayMaximizable
























  totalRecords: number;
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event.filters)

    this.attachmentService.lazyLoad(event.first, event.rows, this.totalRecords, event.sortField, event.sortOrder, event.filters).subscribe(
      res => {
        this.parent = res.rows
        this.totalRecords = res.totalRecords
        this.loading = false;

      }
    )
  }















  SetGrade(data, value) {
    //console.log(data, value)
    this.CurrentRow = data;
    this.p = {
      RequestId: data.RequestId,
      PrsnNo: data.PrsnNo,
      Descr: data.Descr,
      RequestTypeId: data.RequestTypeId,
      StatusId: data.StatusId,
      FamilyPersonsId: data.FamilyPersonsId,
      RequestDate: data.RequestDate,
      NonApprovalReason: data.NonApprovalReason,
      ApproveUser: data.ApproveUser,
      Grade: value
    }



    this.attachmentService.update(this.p).subscribe(
      res => {
        this.CurrentRow.Grade = value
      },
      error => { }
    );
  }

}








