import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<User>();
  loadingData = true;
  users: User[];

  constructor(private userService: UserService,
              private router: Router,
              private paginatorIntl: MatPaginatorIntl) { }

  ngOnInit() {
    this.getUsers();
    this.paginatorIntl.itemsPerPageLabel = 'Users per page';
  }

  getUsers(): void {
    this.userService.getUsers()
    .pipe(
      finalize(() => {
        this.loadingData = false;
        this.dataSource.paginator = this.paginator;
        console.log(this.paginator);
      })
    )
    .subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
