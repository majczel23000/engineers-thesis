import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent {

  constructor(private router: Router) { }

  goToAddMenu(): void {
    this.router.navigate(['/menus/add']);
  }

  goToMenusList(): void {
    this.router.navigate(['/menus']);
  }

}
