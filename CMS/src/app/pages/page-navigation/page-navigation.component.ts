import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.css']
})
export class PageNavigationComponent {

  constructor(private router: Router) { }

  goToAddPage(): void {
    this.router.navigate(['/pages/add']);
  }

  goToPagesList(): void {
    this.router.navigate(['/pages']);
  }
}
