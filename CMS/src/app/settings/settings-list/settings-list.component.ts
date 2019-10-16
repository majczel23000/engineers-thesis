import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, MatSort } from '@angular/material';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
