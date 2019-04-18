import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToRegisterUser(): void {
    console.log('Go to register user');
    this.router.navigate(['/users/add']);
  }

  goToUsersList(): void {
    console.log('Go to users list');
    this.router.navigate(['/users']);
  }

}
