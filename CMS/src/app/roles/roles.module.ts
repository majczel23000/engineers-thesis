import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleListComponent } from './role-list/role-list.component';

@NgModule({
  declarations: [RoleDetailsComponent, RoleAddComponent, RoleListComponent],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
