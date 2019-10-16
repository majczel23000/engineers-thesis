import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.css']
})
export class SettingsNavigationComponent {

  constructor(private router: Router) { }

  goToAddSettings(): void {
    this.router.navigate(['/settings/add']);
  }

  goToSettingsList(): void {
    this.router.navigate(['/settings']);
  }
}
