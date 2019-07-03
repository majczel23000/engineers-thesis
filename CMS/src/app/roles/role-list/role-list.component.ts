import {Component, OnInit, ViewChild} from '@angular/core';
import { RoleService } from '../services/role.service';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RoleModel } from '../../shared/models/Role.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['code', 'name'];
  dataSource = new MatTableDataSource<RoleModel>();
  loadingData = true;
  roles: RoleModel[];
  constructor(private router: Router,
              private paginatorIntl: MatPaginatorIntl,
              private roleService: RoleService) { }

  ngOnInit() {
    this.getRoles();
    this.paginatorIntl.itemsPerPageLabel = 'Roles per page';
  }

  getRoles(): void {
    this.roleService.getAllRoles()
      .pipe(
        finalize( () => {
          this.loadingData = false;
          this.dataSource.paginator = this.paginator;
        })
      )
      .subscribe(
      res => {
        this.roles = res.data;
        this.dataSource.data = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
