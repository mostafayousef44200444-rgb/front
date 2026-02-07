import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
features = [
    { 
      icon: 'bi bi-truck', 
      title: 'Fast Shipping', 
      desc: 'Get your orders delivered within 48 hours in major cities.' 
    },
    { 
      icon: 'bi bi-shield-check', 
      title: 'Secure Payment', 
      desc: 'We use encrypted payment gateways for 100% safe transactions.' 
    },
    { 
      icon: 'bi bi-arrow-repeat', 
      title: 'Easy Returns', 
      desc: 'Not satisfied? Return your items within 14 days with no hassle.' 
    }
  ];

}

