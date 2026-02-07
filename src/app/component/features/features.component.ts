import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports:[CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {

  featuresList = [
    {
      title: 'Premium Quality',
      icon: 'bi bi-gem',
      description: 'We source only the finest fabrics from trusted global suppliers to ensure durability and comfort.'
    },
    {
      title: 'Global Delivery',
      icon: 'bi bi-globe-americas',
      description: 'Fast and reliable worldwide shipping with real-time tracking from our warehouse to your door.'
    },
    {
      title: 'Eco-Friendly Packing',
      icon: 'bi bi-recycle',
      description: 'Our commitment to the planet means 100% biodegradable and recycled packaging materials.'
    },
    {
      title: 'Secure Checkout',
      icon: 'bi bi-shield-lock',
      description: 'Shop with peace of mind using our SSL-encrypted payment gateways and multiple payment options.'
    },
    {
      title: '24/7 Support',
      icon: 'bi bi-headset',
      description: 'Our dedicated style consultants are available around the clock to assist with sizing and orders.'
    },
    {
      title: 'Easy Returns',
      icon: 'bi bi-arrow-left-right',
      description: 'Not the perfect fit? Enjoy a hassle-free 30-day return policy with free reverse shipping.'
    }
  ];

}
