import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPathComponent } from './components/current-path/current-path.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [CurrentPathComponent, DialogConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [CurrentPathComponent, DialogConfirmComponent, MatDialogModule]
})
export class SharedModule { }
