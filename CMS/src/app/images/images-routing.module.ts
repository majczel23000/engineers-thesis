import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageDetailsComponent } from './image-details/image-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImageListComponent
  },
  {
    path: 'add',
    component: ImageAddComponent
  },
  {
    path: 'image/:id',
    component: ImageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
