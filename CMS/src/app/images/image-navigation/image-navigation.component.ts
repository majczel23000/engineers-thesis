import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-navigation',
  templateUrl: './image-navigation.component.html',
  styleUrls: ['./image-navigation.component.css']
})
export class ImageNavigationComponent {

  constructor(private router: Router) { }

  goToAddImage(): void {
    this.router.navigate(['/images/add']);
  }

  goToImagesList(): void {
    this.router.navigate(['/images']);
  }
}
