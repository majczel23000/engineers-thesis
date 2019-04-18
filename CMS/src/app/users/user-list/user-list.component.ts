import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

const ELEMENT_DATA: User[] = [
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
  {firstName: 'Raz', lastName: 'Hydrogen', email: 'raz@raz.pl'},
];
