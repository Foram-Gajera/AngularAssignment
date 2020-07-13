import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationService } from '../services/operation.service';
import { NewUser } from '../shared/user';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource  } from '@angular/material/table';
import { MatSort  } from '@angular/material/sort';

declare var jquery: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};

  constructor(private operationService: OperationService, private router: Router) { }

  // public uId;
  // lstnewusers: NewUser;
  public tableWidget: any;
  // lstnewusers;


  lstnewusers: NewUser;
  dataSource = new MatTableDataSource<NewUser>();

  displayedColumns = ['name', 'email', 'password', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // private initDatatable(): void {
  //   const exampleId: any = $('#example');
  //   this.tableWidget = exampleId.DataTable({
  //     // select: true,
  //     paging: true,
  //     scrollY: 400,
  //     searching: true
  //   });
  // }



  ngOnInit(): void {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    //   // data: this.lstnewusers
    // };
    // this.initDatatable();
    this.operationService.getUser()
    .subscribe
    (
      data =>
      {
        this.lstnewusers = data;
        this.dataSource.data = data as NewUser[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }



  delete(id){
    const ans = confirm('Do you want to delete User with Id : ' + id);
    if (ans){
      if (id){
        this.operationService.deleteUser(id).subscribe();
        window.location.reload();
        alert('record deleted successfully!');
      }
      else{
        alert('error occurs in deleting');
      }
    }
    else{
      alert('your data is safe!');
    }
  }

  edit(id){
    // alert(id);
    this.router.navigateByUrl('/addUser/' + id);
  }
}

