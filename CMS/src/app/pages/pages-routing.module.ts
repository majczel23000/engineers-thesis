import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { PageAddComponent } from './page-add/page-add.component';
import { PageDetailsComponent } from './page-details/page-details.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent
  },
  {
    path: 'add',
    component: PageAddComponent
  },
  {
    path: 'page/:id',
    component: PageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
