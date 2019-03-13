import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [DashboardComponent, LoginComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
