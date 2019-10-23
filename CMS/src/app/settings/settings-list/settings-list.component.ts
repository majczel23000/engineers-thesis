import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, MatSort } from '@angular/material';
import { SettingsService } from '../services/settings.service';
import { SettingModel } from '../../shared/models/settings/Setting.model';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['code', 'name', 'status'];
  dataSource = new MatTableDataSource<SettingModel>();
  loadingData = true;
  settings: SettingModel[];

  constructor(private router: Router,
              private paginatorIntl: MatPaginatorIntl,
              private settingsService: SettingsService,
              private spinnerService: SpinnerService,
              private snackBar: MatSnackBar) {
    this.spinnerService.setSpinner(true);
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings(): void {
    this.settingsService.getAllSettings()
    .pipe(
      finalize( () => {
        this.spinnerService.setSpinner(false);
        this.loadingData = false;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        });
      })
    )
    .subscribe(
    res => {
      this.settings = res.data;
      this.dataSource.data = res.data;
    },
    err => {
      this.snackBar.open(err.error.message, 'X', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/error']);
    }
  );
  }

}
