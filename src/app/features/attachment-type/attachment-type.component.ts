import { Component, OnInit } from '@angular/core';
import { RequestTypeService } from '../_services/Request-type.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-attachment-type',
  templateUrl: './attachment-type.component.html',
  styleUrls: ['./attachment-type.component.css']
})
export class AttachmentTypeComponent implements OnInit {

  Descr: string = '';
  Title: string = '';
  Icon: string = '';
  cols: any[];
  cars1: any;
  constructor(private service: RequestTypeService, private toastService: ToastService,) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'Descr', header: 'شرح درخواست', width: '50%' },
      { field: 'Title', header: 'عنوان درخواست', width: '50%' },
      { field: 'AttachmentTypeId', header: 'شناسه', width: '50%' }
    ];

    this.read();
  }

  create() {
    console.log(this.Icon)
    var data={Descr:this.Descr , Title:this.Title , Icon:this.Icon}
    this.service.create(data).subscribe(
      success => {
        this.toastService.addSingle('success', '', 'عنوان "' + this.Descr + '" با موفقیت ایجاد گردید ');
        this.Descr = '';
        this.Title = '';
        this.Icon = '';
        this.read();
      },
      error => {
        this.toastService.addSingle('error', '', error);
      }
    );
  }

  read()
  {
    this.service.read().subscribe(
      data=>{this.cars1 = (data)},
      error=>{console.log(error)}
    );
  }

}
