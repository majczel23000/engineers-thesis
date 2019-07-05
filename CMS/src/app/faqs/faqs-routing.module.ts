import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqAddComponent } from './faq-add/faq-add.component';
import { FaqDetailsComponent } from './faq-details/faq-details.component';

const routes: Routes = [
  {
    path: '',
    component: FaqListComponent
  },
  {
    path: 'add',
    component: FaqAddComponent
  },
  {
    path: 'faq/:id',
    component: FaqDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqsRoutingModule { }
