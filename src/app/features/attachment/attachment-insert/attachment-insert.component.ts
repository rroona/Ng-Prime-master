import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';

import { PersonelService } from '@app/features/_services/personel.service';
import { MessageService, OverlayPanel } from 'primeng';

import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';

import { RequestTypeService } from '@app/features/_services/Request-type.service';
import { RequestService } from '@app/features/_services/Request.service';
import { ToastService } from '@app/core/services/toast.service';
import { RequestItemsService } from '@app/features/_services/Request-items.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { environment } from '@environments/environment';
import { ConfirmService } from '@app/features/_services/confirm.service';
import { Router } from '@angular/router';
import { NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest, NgxFileUploadState, NgxFileUploadStorage } from '@ngx-file-upload/core';
import { Subject } from 'rxjs';





@Component({
  selector: 'app-attachment-insert',
  templateUrl: './attachment-insert.component.html',
  styleUrls: ['./attachment-insert.component.scss']
})
export class AttachmentInsertComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload: any;

  selectedRows: any[] = [];
  parent: any[];
  loading: boolean = true;
  attachForm: FormGroup;
  attachmentTypeHelp: boolean = false;
  Descr: string = '';
  filteredPersonel: any[];
  filteredattachmentType: any[];
  FamilyPersonel: any[] = []
  personel: any
  attachmentType: any
  FamilyPersonsId: number = 0;
  selectedPersonel: any
  selectedattachmentType: any
  uploadedFiles: any[] = [];
  currentUser;
  UserRoles = new Array();
  enable: boolean = false;
  CurrentRow: any;
  attachmentItems: any
  attachmentPath = environment.attachmentPath;
  //IsClickSendBtn: boolean = false;
  //sendingMessage: string = ''
  Show_NonApprovalReason: boolean = false;
  NonApprovalReason: string
  filesize = environment.fileSize

  public constructor(private PersonelService: PersonelService,
    private messageService: MessageService,
    private http: HttpClient,
    private attachmentTypeService: RequestTypeService,
    private attachmentService: RequestService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private attachmentItemsService: RequestItemsService,
    private auth: AuthenticationService,
    private confirService: ConfirmService,
    private router: Router,
    @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory) {

      this.storage = new NgxFileUploadStorage({
        concurrentUploads: 2,
        autoStart: true,
        //removeCompleted: 5000 // remove completed after 5 seconds
      });

      this.uploadOptions = {url: environment.TestuploadApi};

     }



  ngOnInit(): void {
    this.currentUser = this.auth.getcurrentUser;
    //در هنگام ورود به این صفحه بررسی میکنیم ببینیم احراز هویت شده یا نه
    //خدمات فقط به افراد احراز هویت شده داده میشود
    this.confirService.readbyfilter(" PrsnNo = '" + this.currentUser.PrsnNo + "' and IsConfirmed = 1 ").subscribe(
      data => {
        if (!data)
          this.router.navigate(['/otp']);
        else {

          if (this.attachmentService.attachmentType == undefined)
            this.router.navigate(['/main/dashboard'])
          else {
            this.selectedattachmentType = this.attachmentService.attachmentType

            this.attachmentTypeService.readbyfilter("RequestTypeId = " + this.selectedattachmentType).subscribe(
              data => { this.attachmentType = data; },
              error => { }
            );
          }

          this.UserRoles = this.currentUser.UserRoles;
          this.read()


        }

      },
      error => { }
    );



    this.attachForm = this.fb.group({
      RequestId: 0,
      PrsnNo: '',
      Descr: '',
      RequestTypeId: 0,
      StatusId: 0,
      FamilyPersonsId: 0,
      RequestDate: Date.now()
    })

    this.storage.change()
    .subscribe(uploads => this.uploads = uploads);

  }

  ShowNonApprovalReason(data) {
    this.Show_NonApprovalReason = true;
    this.NonApprovalReason = data.NonApprovalReason
  }



  displayMaximizable: boolean;
  showMaximizableDialog() {

    this.displayMaximizable = true;
    this.getFamilyPersonel(this.currentUser.PrsnNo)
  }

  onHide() {
    this.uploadedFiles.forEach(element => {
      //console.log(element.filename)
      this.deletingFile(element.filename)
    });

    this.uploadedFiles = [];
    this.fileUpload.clear();
    this.FamilyPersonsId = undefined
  }

  getAttachmentItems(data) {
    this.attachmentItems = null;
    this.attachmentItemsService.getByAttachmentId(data).subscribe(
      data => {
        //console.log(data)
        this.attachmentItems = data;

      },
      error => { }
    );
  }

  read() {
    this.loading = true;
    //console.log(" PrsnNo = '" + this.currentUser.PrsnNo + "'")
    this.attachmentService.readbyfilter(" PrsnNo = '" + this.currentUser.PrsnNo + "'").subscribe(
      data => {
        this.parent = data;
        this.loading = false;
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );

  }




  setCurrentRow(data) {

    this.CurrentRow = data;
  }


  getFamilyPersonel(PrsnNo) {
    this.FamilyPersonel = []
    let query = PrsnNo;
    this.PersonelService.getFamilyPersonelByFilter(query).subscribe(ss => {

      ss.forEach(element => {
        ///console.log(element)
        if (element['RelationRef'] == 2)
          this.FamilyPersonel.push(element)
      })

    },
      err => { console.log(err) });
  }






  confirmmessage: string = '';
  setConfirmMessage(data) {

    this.confirmmessage = ' آیا از حذف درخواست ' + ' [ ' + data.RequestTypeTitle + ' ] ' + ' [ ' + data.FullName + ' ]' + ' اطمینان دارید؟ ';

  }


  showConfirm(data: any) {
    this.setConfirmMessage(data)
    this.CurrentRow = data;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'تاییدیه حذف ', detail: this.confirmmessage });
  }


  onReject() {
    this.read();
    this.messageService.clear('c');

  }

  onConfirm() {
    this.delete();

    this.read();
    this.messageService.clear('c');
  }


  delete() {
    this.attachmentService.delete(this.CurrentRow).subscribe(
      data => {
        this.attachmentItems = null
        this.read();
      },
      error => { }
    );
  }





  uploadResponse = { status: '', message: '', filePath: '' };
  create() {

    this.attachForm.setValue(
      {
        RequestId: 0,
        PrsnNo: this.currentUser.PrsnNo,//this.selectedPersonel.PrsnNo,
        Descr: this.Descr,
        RequestTypeId: this.attachmentService.attachmentType,
        StatusId: 0,
        FamilyPersonsId: this.FamilyPersonsId,
        RequestDate: Date.now()
      }
    )
    //==========================Start Save to tbattachment ======================
    this.attachmentService.create(this.attachForm.value).subscribe(
      data => {


        if (data['msgRet']) {
          this.toastService.addSingle('error', '', data['msgRet']);

          this.displayMaximizable = false
        }
        else

          //==========================Start Upload File ======================
          for (let file of this.uploadedFiles) {


            this.fileUpload.clear();
            //==========================Start Save to tbattachmentItems ======================
            let params = { Id: 0, RequestId: data['RequestId'], DocName: file.filename }
            this.attachmentItemsService.create(params).subscribe(
              data => {
                this.uploadedFiles = [];
                this.FamilyPersonsId = undefined;
                this.displayMaximizable = false;
                this.toastService.addSingle('success', '', 'اطلاعات با موفقیت ثبت گردید');

                this.read();

              },
              error => {
                console.log(error)
              }
            );

          }

      },
      error => {
        console.log(error)
      }
    );
  }


  onRemoveFile(event) {


    var i = 0
    this.uploadedFiles.forEach(element => {
      if (element.originalname == event.file.name) {
        this.uploadedFiles.splice(i, 1)
        this.deletingFile(element.filename)
      }
      i++;
    });
  }





  onFileSelected(event) {

    for (let file of event.files) {
      if (file.size <= environment.fileSize && (file.type == "image/jpeg" || file.type == "image/png")) {
        console.log(file)
        this.uploadingFile(file)
      }
    }
  }

  //زمانی که فایل را انتخاب میکند و بجای دکمه ذخیره ، مدال را میبندد
  //یا زمانی که فایل را انتخاب میکند و دکمه حذف کنار فایل را میزند
  //باید فایل را پاک کنیم
  deletingFile(file) {
    this.attachmentItemsService.deleteFile(file).subscribe(
      data => { },
      err => { }
    )
  }

  message: any
  enableCall: boolean;

  private _value: number
  get value(): number {
    return this._value
  }
  set value(value: number) {
    if (!isNaN(value) && value <= 100) {
      this._value = value;
      setTimeout(() => {
        this.enableCall = true
      }, 250);
    }
  }

  uploadingFile(file) {
    this.attachmentItemsService.upload(file).pipe().subscribe(event => {

      this.message = undefined;
      if (event['loaded'] && event['total']) {
        this.value = Math.round(event['loaded'] / event['total'] * 100)
        //console.log(this.value)
      }
      if (event['body']) {
        this.message = event['body'].status;
        this.uploadedFiles.push(event['body'].uploadedFile);
      }
    },
      (err) => console.log(err)
    )
  }



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


















CanAccess(role: string) {

  if (this.currentUser && this.currentUser.UserRoles.indexOf(role) > 0) {
    return true
  }

}
















































































public showDocs = false;

    public uploadStates = NgxFileUploadState;

    public uploads: NgxFileUploadRequest[] = [];
    private storage: NgxFileUploadStorage;
    private uploadOptions: NgxFileUploadOptions;

    public destroy$: Subject<boolean> = new Subject();

    public toggleDocs() {
      this.showDocs = !this.showDocs;
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$ = null;
}



public removeUpload(upload: NgxFileUploadRequest) {
    this.storage.remove(upload);
}

public startUpload(upload: NgxFileUploadRequest) {
    upload.start();
}

public onSelect(event) {
  console.log(event.addedFiles)
  const addedFiles: File[] = event.addedFiles;

  if (addedFiles.length) {
    const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
    this.storage.add(uploads);
  }
 // console.log(this.uploads)
}


public cancelUpload(upload: NgxFileUploadRequest) {
  upload.cancel();
}
 
public onRemove(upload: NgxFileUploadRequest) {
  this.storage.remove(upload);
}


}
























