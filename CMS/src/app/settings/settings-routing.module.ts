import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsAddComponent } from './settings-add/settings-add.component';
import { SettingDetailsComponent } from './setting-details/setting-details.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent
  },
  {
    path: 'add',
    component: SettingsAddComponent
  },
  {
    path: 'setting/:id',
    component: SettingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
