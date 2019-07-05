import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-navigation',
  templateUrl: './faq-navigation.component.html',
  styleUrls: ['./faq-navigation.component.css']
})
export class FaqNavigationComponent {

  constructor(private router: Router) { }

  goToAddFaq(): void {
    this.router.navigate(['/faqs/add']);
  }

  goToFaqsList(): void {
    this.router.navigate(['/faqs']);
  }

}
