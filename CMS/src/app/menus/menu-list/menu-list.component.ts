import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, MatSort } from '@angular/material';
import { MenuModel } from '../../shared/models/menu/Menu.model';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['code', 'name', 'status'];
  dataSource = new MatTableDataSource<MenuModel>();
  loadingData = true;
  menus: MenuModel[];

  constructor(private menuService: MenuService,
              private router: Router,
              private paginatorIntl: MatPaginatorIntl,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getMenus();
    this.paginatorIntl.itemsPerPageLabel = 'Menus per page';
  }

  getMenus(): void {
    this.menuService.getAllMenus()
      .pipe(
        finalize( () => {
          this.loadingData = false;
          this.dataSource.paginator = this.paginator;
          setTimeout( () => {
            this.dataSource.sort = this.sort;
          });
        })
      )
      .subscribe(
        res => {
          this.dataSource.data = res.data;
        },
        err => {
          this.snackBar.open(err.error.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
