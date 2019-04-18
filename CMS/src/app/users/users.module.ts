import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatButtonModule, MatCardModule, MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [UserListComponent, UserAddComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class UsersModule { }
