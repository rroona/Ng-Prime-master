import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../_services/Request.service';
import { RequestTypeService } from '../_services/Request-type.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  barChartData: any;

  doughnutChartData: any;

  msgs: any[];
  attachmentType:any[]=[]

  constructor(private router: Router,private attachmentService:RequestService ,private attachmenttypeService : RequestTypeService) {
    this.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Rejected',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Approved',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    this.doughnutChartData = {
      labels: ['Active', 'Inactive', 'Deleted'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

    this.msgs = [];



  }

  ngOnInit() {

this.attachmenttypeService.read().subscribe(
  data=>{
    var i =1;
    data.forEach(element => {
     
      if(i==5)
      i=1
      var item = {Icon:element.Icon,Title:element.Title,Color:i,RequestTypeId:element.RequestTypeId}
      this.attachmentType.push(item)
      ++i
    });
    //this.attachmentType = data
  },
  error=>{}
);

  }



  gotoattachmentInsert(type) {
    console.log(type)
    switch (type) {
      case 1:
        this.attachmentService.attachmentType =1
       
        this.router.navigate(['/main/request/request-insert'])
        return;
      case 2:
        this.attachmentService.attachmentType =2
        //this.router.navigate(['/main/attachment/attachment-insert'])
        return
      case 3:
        this.attachmentService.attachmentType =3
        //this.router.navigate(['/main/attachment/attachment-insert'])
        return
      case 4:
        this.attachmentService.attachmentType =4
        //this.router.navigate(['/main/attachment/attachment-insert'])
        return
    }
    
  }

}
