import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageAddComponent } from './image-add/image-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImageListComponent
  },
  {
    path: 'add',
    component: ImageAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
