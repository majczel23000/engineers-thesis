import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatInputModule, MatButtonModule, MatCardModule,
  MatTableModule, MatPaginatorModule, MatPaginatorIntl,
  MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { CdkColumnDef } from '@angular/cdk/table';

@NgModule({
  declarations: [UserListComponent, UserAddComponent, UserDetailsComponent, UserNavigationComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [MatPaginatorIntl, CdkColumnDef]
})
export class UsersModule { }
