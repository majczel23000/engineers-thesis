import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPathComponent } from './components/current-path/current-path.component';

@NgModule({
  declarations: [CurrentPathComponent],
  imports: [
    CommonModule
  ],
  exports: [CurrentPathComponent]
})
export class SharedModule { }
