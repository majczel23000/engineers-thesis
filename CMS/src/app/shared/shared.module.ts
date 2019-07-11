import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPathComponent } from './components/current-path/current-path.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [CurrentPathComponent, DialogConfirmComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [CurrentPathComponent, DialogConfirmComponent, MatDialogModule, ErrorPageComponent]
})
export class SharedModule { }
