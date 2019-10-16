import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsAddComponent } from './settings-add/settings-add.component';
import { SettingsNavigationComponent } from './settings-navigation/settings-navigation.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule, MatButtonModule, MatCardModule,
  MatTableModule, MatPaginatorModule, MatPaginatorIntl,
  MatToolbarModule, MatCheckboxModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkColumnDef } from '@angular/cdk/table';
import { DialogConfirmComponent } from '../shared/components/dialog-confirm/dialog-confirm.component';


@NgModule({
  declarations: [SettingsListComponent, SettingsAddComponent, SettingsNavigationComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    SharedModule,
    MatSortModule,
  ],
  providers: [MatPaginatorIntl, CdkColumnDef],
  entryComponents: [DialogConfirmComponent]
})
export class SettingsModule { }
