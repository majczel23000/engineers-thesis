import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  menuItems = [
    {
      routerLink: '/dashboard',
      text: 'Dashboard',
      icon: 'dashboard'
    },
    {
      routerLink: '/users',
      text: 'Users',
      icon: 'account_circle'
    },
    {
      routerLink: '/roles',
      text: 'Roles',
      icon: 'accessibility_new'
    },
    {
      routerLink: '/faqs',
      text: 'Faqs',
      icon: 'question_answer'
    }
  ];

  constructor(public loginService: LoginService) {
  }

  logout(): void {
    this.loginService.logout();
  }
}
