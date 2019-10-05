import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private breakpoint = 2;
  private rowHeight = '50%';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 600) ? '35%' : '50%';
    this.getStats();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 600) ? '35%' : '50%';
  }

  getStats(): void {
    
  }

}
